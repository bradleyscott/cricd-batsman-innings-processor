
############################################################
# Dockerfile to run cricd batsman-innings-processor API
############################################################

FROM node:4-slim
MAINTAINER Bradley Scott

RUN apt-get update && \
    apt-get install -y git

# Pull down the source from the repo and download dependencies
RUN git clone git://github.com/bradleyscott/cricd-batsman-innings-processor.git \
	&& cd cricd-batsman-innings-processor \
	&& npm install

# Define working directory.
WORKDIR /cricd-batsman-innings-processor

# Start the service
CMD npm start

# Expose ports.
EXPOSE 3000
