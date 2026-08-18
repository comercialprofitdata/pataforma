@echo off
title PataForma — Iniciar Evolution API (WhatsApp)
echo ========================================================
echo   PATAFORMA ERP - INICIALIZADOR DA EVOLUTION API
echo ========================================================
echo.
echo Verificando Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] O Docker Desktop nao foi encontrado ou nao esta aberto.
    echo.
    echo Por favor:
    echo 1. Baixe e instale o Docker Desktop em: https://www.docker.com/products/docker-desktop/
    echo 2. Abra o Docker Desktop e aguarde ele iniciar.
    echo 3. Execute este arquivo novamente!
    echo.
    pause
    exit /b 1
)

echo [OK] Docker detectado!
echo Iniciando container da Evolution API...
echo.
docker compose up -d

echo.
echo ========================================================
echo [SUCESSO] Evolution API iniciada na porta 8080!
echo.
echo Agora no PataForma:
echo 1. Va na aba "WhatsApp"
echo 2. Clique em "Conectar WhatsApp (QR Code)"
echo 3. Aponte a camera do seu celular no WhatsApp!
echo ========================================================
echo.
pause
