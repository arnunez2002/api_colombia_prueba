# Usa una imagen base de Node.js
FROM node:18 AS build

# Configura el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y yarn.lock
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install

# Copia el resto de la aplicación al contenedor
COPY . .

# Construye la aplicación
RUN yarn run build

# Usa Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos al contenedor Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
