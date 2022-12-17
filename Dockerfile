# ビルド環境
FROM node:lts-alpine as build-stage
WORKDIR /specialty
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn generate

# 本番環境
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /specialty/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]