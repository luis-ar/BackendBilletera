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

# Establece las variables de entorno (puedes añadir todas las que necesites)
ENV DATABASE_URL="mysql://lhjmhdmy_luchito:Luchito123456%23@50.87.253.245:3306/lhjmhdmy_billetera"
ENV JWT_SECRET="s3cR3tK3y!2025"
ENV PORT=3001


# Expone el puerto 3000
EXPOSE 3001

# Comando para ejecutar la app
CMD ["npm", "start"]
