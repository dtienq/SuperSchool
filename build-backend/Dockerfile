FROM node:14

MAINTAINER Hoa Nguyen aka Rico 19424023@student.hcmus.edu.vn
WORKDIR /opt/
COPY ./backend ./backend/
WORKDIR /opt/backend/
RUN npm install
RUN npm -i -g nodemon
EXPOSE 3000
CMD["cmd","start"]