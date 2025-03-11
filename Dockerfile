# Usar una imagen base de Node.js
FROM node:20-alpine

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (si existe) al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY src .

# Compilar el código TypeScript (puedes usar `tsc` si está configurado)
RUN npm run build

# Exponer el puerto que la aplicación va a usar (ajústalo según sea necesario)
EXPOSE 8000

# Definir el comando para ejecutar tu aplicación (ajustar si es necesario)
CMD ["npm", "run", "start"]
