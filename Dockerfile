
############################################################
# Dockerfile to run cricd batsman innings API
############################################################

FROM node:4-slim
MAINTAINER Bradley Scott

RUN apt-get update && \
    apt-get install -y git

# Copy local code to container
COPY . /app

# Pull down the source from the repo and download dependencies
#RUN git clone git://github.com/bradleyscott/cricd-entities.git \
#	&& cd cricd-entities \
#	&& npm install

# Define working directory.
WORKDIR /app

# Start the service
CMD npm start

# Expose ports.
EXPOSE 3000
