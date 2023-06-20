#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null
then
    echo "Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Check if the Docker Compose file exists
if [ ! -f docker-compose.yml ]
then
    echo "docker-compose.yml file not found. Please make sure the file exists and try again."
    exit 1
fi

# Remove any existing containers
docker rm -f $(docker ps -qa)

# Build and start the containers
docker-compose up --build -d