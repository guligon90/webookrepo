FROM node:alpine
LABEL MAINTAINER="guligon90@gmail.com"
WORKDIR /webookrepo/auth

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --frozen-lockfile
COPY . .

CMD ["yarn", "dev"]
