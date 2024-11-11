FROM node:20.13.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --force --loglevel verbose

RUN npm install -g @angular/cli

COPY . ./

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build app/dist/medical-management-system-kickstart/browser /usr/share/nginx/html

EXPOSE 80