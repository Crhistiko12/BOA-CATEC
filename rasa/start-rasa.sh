#!/bin/bash
echo "========================================"
echo "  Iniciando Servidor Rasa con Docker"
echo "========================================"
echo ""
echo "Puerto: 5005"
echo "API: http://localhost:5005/webhooks/rest/webhook"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo "========================================"
echo ""

docker run -p 5005:5005 -v "$(pwd)":/app rasa/rasa:3.6.0-full run --enable-api --cors "*" --debug
