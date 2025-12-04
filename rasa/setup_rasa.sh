#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando configuración de Rasa para BOA...${NC}"

# 1. Buscar ejecutable de Python 3.10
PYTHON_CMD=""

if command -v python3.10 &> /dev/null; then
    PYTHON_CMD="python3.10"
elif command -v py &> /dev/null; then
    if py -3.10 --version &> /dev/null; then
        PYTHON_CMD="py -3.10"
    fi
fi

if [ -z "$PYTHON_CMD" ]; then
    if command -v python &> /dev/null; then
        VER=$(python -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
        if [[ "$VER" == "3.10" ]]; then
            PYTHON_CMD="python"
        fi
    fi
fi

if [ -z "$PYTHON_CMD" ]; then
    echo -e "${RED}❌ Error: No se encontró Python 3.10.${NC}"
    echo -e "Por favor instala Python 3.10 y agrégalo al PATH."
    exit 1
fi

# Verificar arquitectura 64-bit
ARCH=$($PYTHON_CMD -c "import struct; print(struct.calcsize('P') * 8)")
if [ "$ARCH" != "64" ]; then
    echo -e "${RED}❌ Error: Tu Python 3.10 es de 32 bits ($ARCH-bit).${NC}"
    echo -e "${RED}Rasa requiere Python de 64 bits.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Usando Python: $($PYTHON_CMD --version) ($ARCH-bit)${NC}"

# 2. Crear entorno virtual limpio
if [ -d "venv" ]; then
    echo -e "${BLUE}🧹 Limpiando entorno anterior...${NC}"
    rm -rf venv
fi

echo -e "${BLUE}📦 Creando entorno virtual nuevo...${NC}"
$PYTHON_CMD -m venv venv

# 3. Activar entorno
echo -e "${BLUE}🔌 Activando entorno virtual...${NC}"
source venv/Scripts/activate || source venv/bin/activate

# 4. Actualizar herramientas críticas
echo -e "${BLUE}⬇️  Actualizando pip y setuptools...${NC}"
python -m pip install --upgrade pip setuptools wheel

# 5. Instalar Rasa (Versión específica estable)
echo -e "${BLUE}⬇️  Instalando Rasa 3.6.20...${NC}"
pip install rasa==3.6.20

# 6. Entrenar modelo
if command -v rasa &> /dev/null; then
    echo -e "${BLUE}🧠 Entrenando modelo...${NC}"
    rasa train
    echo -e "${GREEN}✅ ¡Entrenamiento completado!${NC}"
    echo -e "${BLUE}👉 Para probar el chat, ejecuta: ${GREEN}rasa shell${NC}"
    echo -e "${BLUE}👉 Para iniciar el servidor, ejecuta: ${GREEN}rasa run --enable-api --cors '*'${NC}"
else
    echo -e "${RED}❌ Error: La instalación de Rasa falló.${NC}"
    exit 1
fi
