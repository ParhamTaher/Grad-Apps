FROM node:latest
RUN mkdir -p /ticket-app
WORKDIR /ticket-app
COPY package*.json /ticket-app/
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]
