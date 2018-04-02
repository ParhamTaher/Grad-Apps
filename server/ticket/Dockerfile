FROM node:7.7.2-alpine
RUN mkdir -p /ticket-app
WORKDIR /ticket-app
COPY package*.json /ticket-app/
RUN npm install --quiet
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
