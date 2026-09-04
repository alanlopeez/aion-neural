@echo off
echo ========================================================
echo   TECD - Aion Neural: Despliegue Automatizado a Vercel
echo ========================================================
echo.

echo [1/3] Verificando dependencias y Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo al generar Prisma Client.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Verificando compilacion Next.js...
call npx next build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo en la compilacion de Next.js.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] Desplegando en Vercel (Produccion)...
call npx vercel --prod
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo en el despliegue de Vercel.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo   Despliegue completado con exito en Vercel!
echo ========================================================
pause
