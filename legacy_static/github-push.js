/**
 * Aion Neural - GitHub Direct API Pusher
 * 
 * Este script inicializa tu repositorio y sube los archivos directamente 
 * a GitHub a través de la API, sin requerir el cliente de Git instalado.
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const https = require('https');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const FILES_TO_PUSH = ['index.html', 'styles.css', 'app.js', 'apps-script.js', 'google23bff977a13867bb.html'];
const REPO_NAME = 'aion-neural';

console.log("=========================================");
console.log("  AION NEURAL - GITHUB API DEPLOYER  ");
console.log("=========================================");
console.log("Este script creará el repositorio y subirá los archivos directamente.");
console.log("Necesitas un Token de Acceso Personal (PAT) de GitHub.");
console.log("Créalo aquí: https://github.com/settings/tokens (selecciona permisos 'repo')");
console.log("=========================================\n");

rl.question('Ingresa tu Token de Acceso Personal (PAT) de GitHub: ', (token) => {
  token = token.trim();
  if (!token) {
    console.error('❌ El token es requerido.');
    rl.close();
    return;
  }
  
  rl.question('Ingresa tu nombre de usuario de GitHub: ', (username) => {
    username = username.trim();
    if (!username) {
      console.error('❌ El usuario es requerido.');
      rl.close();
      return;
    }
    
    createRepoAndUpload(token, username);
  });
});

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        let json = {};
        try { json = JSON.parse(body); } catch(e) {}
        resolve({ statusCode: res.statusCode, body: json });
      });
    });
    
    req.on('error', (err) => reject(err));
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function createRepoAndUpload(token, username) {
  const authHeader = `token ${token}`;
  
  // 1. Crear repositorio
  console.log(`\nCreando repositorio '${REPO_NAME}' en tu GitHub...`);
  try {
    const createRes = await request({
      hostname: 'api.github.com',
      path: '/user/repos',
      method: 'POST',
      headers: {
        'User-Agent': 'Aion-Neural-Pusher',
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    }, {
      name: REPO_NAME,
      description: 'Aion Neural Landing Page',
      private: false
    });
    
    if (createRes.statusCode === 201) {
      console.log('✓ Repositorio creado con éxito.');
    } else if (createRes.statusCode === 422) {
      console.log('⚠ El repositorio ya existe. Subiendo archivos sobre el repositorio existente...');
    } else {
      console.error(`❌ Error al crear repositorio: ${createRes.statusCode}`, createRes.body);
      rl.close();
      return;
    }
    
    // 2. Subir archivos
    for (const filename of FILES_TO_PUSH) {
      if (!fs.existsSync(filename)) continue;
      
      console.log(`Subiendo ${filename}...`);
      const content = fs.readFileSync(filename, 'utf8');
      const base64Content = Buffer.from(content).toString('base64');
      
      // Obtener el SHA del archivo si ya existe para poder actualizarlo
      let sha = null;
      try {
        const fileInfo = await request({
          hostname: 'api.github.com',
          path: `/repos/${username}/${REPO_NAME}/contents/${filename}`,
          method: 'GET',
          headers: {
            'User-Agent': 'Aion-Neural-Pusher',
            'Authorization': authHeader
          }
        });
        if (fileInfo.statusCode === 200) {
          sha = fileInfo.body.sha;
        }
      } catch (e) {}
      
      const uploadPayload = {
        message: `Upload ${filename} via API`,
        content: base64Content
      };
      if (sha) {
        uploadPayload.sha = sha;
      }
      
      const uploadRes = await request({
        hostname: 'api.github.com',
        path: `/repos/${username}/${REPO_NAME}/contents/${filename}`,
        method: 'PUT',
        headers: {
          'User-Agent': 'Aion-Neural-Pusher',
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        }
      }, uploadPayload);
      
      if (uploadRes.statusCode === 200 || uploadRes.statusCode === 201) {
        console.log(`✓ ${filename} subido.`);
      } else {
        console.error(`❌ Error al subir ${filename}: ${uploadRes.statusCode}`, uploadRes.body);
      }
    }
    
    console.log(`\n=========================================`);
    console.log(`🎉 ¡Proceso finalizado con éxito!`);
    console.log(`Ver en GitHub: https://github.com/${username}/${REPO_NAME}`);
    console.log(`=========================================`);
    
  } catch (err) {
    console.error('❌ Error en el proceso:', err);
  }
  
  rl.close();
}
