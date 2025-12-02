FROM rasa/rasa:3.6.0-full

# Copiar archivos de configuración
WORKDIR /app
COPY . /app

# Entrenar el modelo
RUN rasa train

# Exponer puerto
EXPOSE 5005

# Comando para ejecutar
CMD ["run", "--enable-api", "--cors", "*", "--debug"]
