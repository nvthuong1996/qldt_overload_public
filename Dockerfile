FROM node:11-slim

ENV TZ 'Asia/Ho_Chi_Minh'
WORKDIR /usr/src/app
USER root
RUN chmod 0777 /usr/src/app
COPY ./ ./
RUN yarn;
EXPOSE 3000
CMD ["npm","start"]