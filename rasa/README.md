# Instalación y Uso de Rasa para BOA

## 📦 Instalación de Rasa

### Opción 1: Instalación con pip (Recomendado)

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows)
.\venv\Scripts\activate

# Instalar Rasa
pip install rasa

# Verificar instalación
rasa --version
```

### Opción 2: Instalación con conda

```bash
conda create -n rasa python=3.10
conda activate rasa
pip install rasa
```

## 🚀 Comandos de Entrenamiento

### 1. Entrenar el modelo
```bash
cd rasa
rasa train
```

### 2. Probar en consola
```bash
rasa shell
```

### 3. Iniciar servidor API
```bash
rasa run --enable-api --cors "*" --port 5005
```

### 4. Iniciar en modo debug
```bash
rasa run --enable-api --cors "*" --debug
```

## 📁 Estructura Creada

```
rasa/
├── config.yml          ✅ Pipeline de ML en español
├── domain.yml          ✅ Intents y respuestas BOA
└── data/
    ├── nlu.yml        ✅ Datos de entrenamiento
    ├── rules.yml      ✅ Reglas de conversación
    └── stories.yml    ✅ Flujos de diálogo
```

## 🎯 Intents Configurados

1. **saludar** - Saludos iniciales
2. **despedir** - Despedidas
3. **consultar_vuelo** - Estado de vuelos
4. **hacer_checkin** - Check-in online
5. **solicitar_reembolso** - Reembolsos
6. **politicas_equipaje** - Información de equipaje
7. **perdida_equipaje** - Equipaje perdido
8. **viajar_mascota** - Viajar con mascotas
9. **contacto_soporte** - Contactar soporte
10. **ask_suggestions** - Pedir sugerencias

## 🧪 Pruebas

### Ejemplos de conversación:

```
Usuario: Hola
Bot: ¡Hola! Soy el asistente virtual de BOA...

Usuario: ¿qué sugerencias me recomiendas?
Bot: [Lista de 8 sugerencias importantes]

Usuario: quiero hacer check-in
Bot: Puedes hacer check-in desde nuestra app...

Usuario: adiós
Bot: ¡Hasta luego! Que tengas un excelente vuelo...
```

## 🔗 Integración con Next.js

El endpoint `/api/chat` ya está configurado. Solo necesitas:

1. Iniciar Rasa: `rasa run --enable-api --cors "*"`
2. El chatbot enviará mensajes a `http://localhost:5005/webhooks/rest/webhook`
3. Rasa responderá automáticamente

## ⚠️ Notas Importantes

- **Python 3.8-3.10** requerido
- Primera ejecución de `rasa train` puede tardar 5-10 minutos
- El modelo se guarda en `models/`
- Rasa debe estar corriendo para que el chatbot funcione

## 🐛 Solución de Problemas

### Error: "rasa no se reconoce"
```bash
pip install rasa
# o
python -m pip install rasa
```

### Error de dependencias
```bash
pip install --upgrade pip
pip install rasa --no-cache-dir
```

### Puerto ocupado
```bash
rasa run --enable-api --cors "*" --port 5006
```

## 📊 Próximos Pasos

1. ✅ Archivos de configuración creados
2. ⏳ Instalar Rasa con `pip install rasa`
3. ⏳ Entrenar modelo con `rasa train`
4. ⏳ Iniciar servidor con `rasa run --enable-api --cors "*"`
5. ⏳ Probar en el chatbot de BOA

¡Listo para entrenar! 🚀
