/**
 * Aion Neural - Form Submission Apps Script
 * 
 * INSTRUCCIONES DE INSTALACIÓN:
 * 
 * 1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1TyPXGldpMJUEn-asNxnlj1fkXbdwkkhYadFXdaJ56VE/edit
 * 2. En el menú superior, ve a: Extensiones -> Apps Script.
 * 3. Borra cualquier código existente en el editor de código (por ejemplo, el bloque "myFunction").
 * 4. Pega este código completo en el editor.
 * 5. Haz clic en el icono de guardar (💾 / Guardar proyecto).
 * 6. Haz clic en "Implementar" (botón azul en la esquina superior derecha) -> "Nueva implementación".
 * 7. Selecciona el tipo de implementación haciendo clic en el engranaje ⚙️ y seleccionando "Aplicación web".
 * 8. Configura los parámetros:
 *    - Descripción: Aion Neural Form Handler
 *    - Ejecutar como: Yo (tu cuenta de Google)
 *    - Quién tiene acceso: Cualquier persona (incluso anónima)
 * 9. Haz clic en "Implementar".
 * 10. Si te lo solicita, haz clic en "Autorizar acceso", selecciona tu cuenta de Google y dale permisos (haz clic en "Configuración avanzada" e "Ir a Proyecto sin título (no seguro)" si aparece una advertencia de Google).
 * 11. Copia la URL de la "Aplicación web" (Web App URL) que se te proporciona al finalizar.
 * 12. Pega esa URL en tu archivo `app.js` en la variable `GOOGLE_SCRIPT_URL`.
 * 
 * ¡Listo! Tu formulario ahora enviará datos silenciosa y directamente a esta planilla de cálculo.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Establecer cabeceras CORS
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    var name = "";
    var email = "";
    var profile = "";
    var message = "";
    var website = "";
    
    // Detectar si la petición viene como JSON o como URL encoded (x-www-form-urlencoded)
    if (e.postData && e.postData.type === "application/json") {
      var data = JSON.parse(e.postData.contents);
      name = data.name || "";
      email = data.email || "";
      profile = data.profile || "";
      message = data.message || "";
      website = data.website || "";
    } else {
      name = e.parameter.name || "";
      email = e.parameter.email || "";
      profile = e.parameter.profile || "";
      message = e.parameter.message || "";
      website = e.parameter.website || "";
    }

    // Seguridad: Si se rellenó el honeypot (bot), ignorar y simular éxito
    if (website) {
      return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Datos registrados con éxito" }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader("Access-Control-Allow-Origin", "*");
    }
    
    // Si no es un POST vacío, agregar la fila
    if (name || email || profile || message) {
      sheet.appendRow([
        new Date(), // Marca de tiempo (Timestamp)
        name,
        email,
        profile,
        message
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Datos registrados con éxito" }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader("Access-Control-Allow-Origin", "*");
    } else {
      return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": "No se recibieron datos" }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader("Access-Control-Allow-Origin", "*");
    }
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}

// Habilitar soporte para peticiones preflight OPTIONS (necesario en peticiones CORS con JSON)
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
