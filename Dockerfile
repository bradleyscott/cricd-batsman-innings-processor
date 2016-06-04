
############################################################
# Dockerfile to run cricd batsman-innings-processor API
############################################################

FROM node:4-slim
MAINTAINER Bradley Scott

# Copy code to container
RUN mkdir cricd-batsman-innings-processor
COPY . /cricd-batsman-innings-processor

# Get dependencies
RUN cd cricd-batsman-innings-processor \
	&& npm install

# Define working directory.
WORKDIR /cricd-batsman-innings-processor

# Start the service
CMD npm start

# Expose ports.
EXPOSE 3000
