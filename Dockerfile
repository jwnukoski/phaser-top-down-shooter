FROM node:20.8.0
COPY ./ /usr/src/app
WORKDIR /usr/src/app
RUN npm i
RUN npm run build
CMD ["npm", "run", "serve"]