# base image
FROM node:10.16.3

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# env
ENV PATH /usr/src/app/node_modules:$PATH

# run commands - config linux
#RUN

# install and cache app dependencies
ADD ./package.json /usr/src/app
RUN npm install

# start app
#CMD ["npm", "start"]
