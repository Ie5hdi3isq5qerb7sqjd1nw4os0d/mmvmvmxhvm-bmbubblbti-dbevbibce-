FROM node:latest

WORKDIR /root/AlphaXmd
COPY package.json .
RUN npm install supervisor -g
RUN npm install
COPY . .
CMD ["npm", "start"]

# mmvmvmxhvm-bmbubblbti-dbevbibce-