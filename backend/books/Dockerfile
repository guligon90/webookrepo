FROM node:alpine
LABEL MAINTAINER="guligon90@gmail.com"
WORKDIR /webookrepo/books

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --frozen-lockfile
COPY . .

CMD ["yarn", "start"]
