FROM node:22-slim
ENV TZ=America/Santiago
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
