# cricd-batsman-innings-processor
This HTTP API is a micro-service that produced statistics of a batsman's innings during a match. Including: runs scored, balls faced, strike rate, method and details of dismissal and other details.
It is intended to provide a component to assist the [cricd](https://github.com/ryankscott/cricd) project which is an open platform for cricket scoring

## Running the service in Docker
This API is dependent on a connection to an EventStore instance containing cricd match events. The host, port, authentication credentials and Eventstore stream name are all configured using the following environment variables: `EVENTSTORE_HOST`, `EVENTSTORE_PORT`, `EVENTSTORE_USER`, `EVENTSTORE_PASSWORD`, `EVENTSTORE_STREAM`

You can specify these environment variables when running the docker container. For example `docker run -d -p 3000:3000 -e EVENTSTORE_HOST=172.18.0.2 bradleyscott/cricd-batsman-innings-processor`
If your EventStore instance is running in a Docker container as well then network connectivity will need to be established between these instances. This is explained in the [Docker networking documentation](https://docs.docker.com/engine/userguide/networking/dockernetworks/) but the steps at a high level are:
1. Create a user defined network using a command like `docker network create --driver bridge cricd-network`
1. Start your EventStore container using the --network parameter `docker run --net=cricd-network`
1. Find the IP address of the EventStore container using the command `docker network inspect cricd-network`
1. Start this Docker container using the `--net=cricd-network` parameter and using the `EVENTSTORE_HOST` variable set to the IP address you just found

Alternatively, you can clone the [code repository for this service](https://github.com/bradleyscott/cricd-batsman-innings-processor) and use Docker-Compose to spin up a environment containing both EventStore and this service which removes the need to perform these steps

## Accessing the service
This service exposes a single endpoint at port 3000 by default which responds to GET requests. The service takes 2 parameters: match (Id of the match), batsman (Id of the batsman you are interested in)
For example: `http://localhost:3000?match=10&batsman=2`
