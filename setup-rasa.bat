@echo off
echo ========================================
echo BOA Rasa Chatbot - Setup con Docker
echo ========================================
echo.

echo Verificando Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker no esta instalado.
    echo Por favor instala Docker Desktop desde: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Docker encontrado!
echo.
echo Construyendo imagen de Rasa...
cd rasa
docker build -t boa-rasa .

if %errorlevel% neq 0 (
    echo ERROR: Fallo la construccion de la imagen
    pause
    exit /b 1
)

echo.
echo ========================================
echo Imagen construida exitosamente!
echo ========================================
echo.
echo Para iniciar el servidor Rasa, ejecuta:
echo   docker run -p 5005:5005 boa-rasa
echo.
echo O usa docker-compose desde la raiz:
echo   docker-compose up
echo.
pause
