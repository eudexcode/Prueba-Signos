# Imagen base de Node con Alpine
FROM node:20-alpine

# Definir el directorio de trabajo
WORKDIR /app

# Variables de entorno para SQL Server
ENV SA_PASSWORD=Str0ng_P4ssw0rd!
ENV ACCEPT_EULA=Y

# Instalar dos2unix para convertir archivos CRLF a LF
RUN apk add --no-cache dos2unix

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar archivos importantes
COPY server.js .
COPY routes.js .
COPY graphql/ ./graphql
COPY init.sql .

# Copiar scripts y convertirlos a formato Unix
COPY wait-for-sqlserver.sh .
COPY entrypoint.sh .

# Convertir saltos de línea CRLF -> LF y dar permisos de ejecución
RUN dos2unix wait-for-sqlserver.sh entrypoint.sh init.sql && \
    chmod +x wait-for-sqlserver.sh entrypoint.sh

# Exponer el puerto de la API
EXPOSE 3000

# Ejecutar el script de inicio
ENTRYPOINT ["sh", "./entrypoint.sh"]
CMD ["node", "server.js"]