FROM node:18-alpine AS BUILD_IMAGE

WORKDIR /app/weather-app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS PRUDUCTION_IMAGE

WORKDIR /app/weather-app

COPY --from=BUILD_IMAGE /app/weather-app/dist/ /app/weather-app/dist/

EXPOSE 8080

COPY package.json .

COPY vite.config.js .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "preview"]