FROM node:20
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "start"]