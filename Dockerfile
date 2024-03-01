FROM node:20.9.0
COPY . .
RUN npm install -g typescript ts-node nodemon 
RUN npm install
RUN npm rebuild bcrypt --build-from-source
CMD ["npm","run","start"]
