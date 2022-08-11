# ビルド環境
FROM node:lts-alpine as build-stage
WORKDIR /taiki-specialty
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run generate

# 本番環境
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /taiki-specialty/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]