# BOA Rasa Chatbot

Este es el chatbot de atención al cliente de Boliviana de Aviación (BOA) construido con Rasa Open Source.

## Instalación

1. Instalar Rasa:
```bash
pip install rasa
```

2. Entrenar el modelo:
```bash
cd rasa
rasa train
```

## Uso

### Modo Interactivo (Pruebas)
```bash
rasa shell
```

### Servidor API (Producción)
```bash
rasa run --enable-api --cors "*"
```

El servidor estará disponible en `http://localhost:5005`

## Capacidades del Bot

El chatbot puede ayudar con:

- ✈️ **Estado de vuelos**: Consultar si un vuelo está a tiempo
- 🧳 **Equipaje**: Información sobre límites de peso y dimensiones
- 💰 **Reembolsos**: Proceso para solicitar devoluciones
- 🎫 **Reservas**: Ayuda para comprar boletos
- 📋 **Check-in**: Instrucciones para check-in online
- 🐕 **Mascotas**: Política de viaje con animales
- 🌎 **Destinos**: Rutas disponibles
- 📞 **Contacto**: Información de atención al cliente

## Estructura

- `domain.yml`: Define intents, entities, slots y respuestas
- `data/nlu.yml`: Ejemplos de entrenamiento para NLU
- `data/stories.yml`: Flujos de conversación
- `data/rules.yml`: Reglas fijas de respuesta
- `config.yml`: Configuración del pipeline y políticas

## Mejoras Futuras

- Integración con base de datos para consultas en tiempo real
- Custom actions para verificar estado de vuelos reales
- Soporte multiidioma (inglés, portugués)
- Integración con sistema de tickets
