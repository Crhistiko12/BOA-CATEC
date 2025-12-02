# Instalación de Rasa en Windows

## Problema
Rasa 3.x no tiene soporte nativo completo para Windows. Requiere WSL2 o Docker.

## Solución Recomendada: Docker

### 1. Instalar Docker Desktop
Descarga e instala Docker Desktop para Windows desde: https://www.docker.com/products/docker-desktop

### 2. Crear Dockerfile para Rasa

Ya está creado en `rasa/Dockerfile`

### 3. Construir y ejecutar

```bash
# Desde la raíz del proyecto
cd rasa
docker build -t boa-rasa .
docker run -p 5005:5005 boa-rasa
```

## Alternativa: WSL2 (Windows Subsystem for Linux)

### 1. Instalar WSL2
```powershell
wsl --install
```

### 2. Abrir Ubuntu y ejecutar:
```bash
cd /mnt/c/Users/DESTOCK/Desktop/semana\ C\ -\ proyecto\ MVC\ BOA/BOA-CATEC/rasa
pip install rasa
rasa train
rasa run --enable-api --cors "*"
```

## Alternativa Simple: Chatbot Simulado (Ya implementado)

El proyecto ya tiene un chatbot simulado en `services/chatbotService.ts` que funciona sin Rasa.
Para usarlo, simplemente comenta la integración con Rasa y usa respuestas predefinidas.

## Opción Más Rápida: Rasa en la Nube

Usa Rasa X en la nube o despliega en Heroku/Railway.
