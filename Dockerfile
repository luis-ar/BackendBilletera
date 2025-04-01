# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias primero
COPY package*.json ./

# Instala las dependencias
RUN npm install --omit=dev

# Copia el resto del código
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "start"]
