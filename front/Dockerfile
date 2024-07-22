# 1. 빌드 스테이지
FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

# 2. 프로덕션 스테이지
FROM nginx:alpine

# 빌드된 애플리케이션 파일을 NGINX 컨테이너의 기본 웹 루트로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 포트 노출
EXPOSE 3000

# NGINX 실행
CMD ["nginx", "-g", "daemon off;"]
