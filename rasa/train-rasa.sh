#!/bin/bash
echo "========================================"
echo "  Entrenando Modelo Rasa para BOA"
echo "========================================"
echo ""
echo "Este proceso puede tardar varios minutos..."
echo ""

docker run -v "$(pwd)":/app rasa/rasa:3.6.0-full train --domain domain.yml --data data --out models

echo ""
echo "========================================"
echo "  Entrenamiento Completado!"
echo "========================================"
echo ""
echo "El modelo entrenado esta en la carpeta 'models/'"
echo ""
echo "Para iniciar el servidor, ejecuta: ./start-rasa.sh"
echo ""
read -p "Presiona Enter para continuar..."
