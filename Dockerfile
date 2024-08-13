FROM node:20.5.1-slim

WORKDIR /home/app

RUN apt-get update

RUN apt-get install -y git

RUN git config --global --add safe.directory /home/app

CMD ["docker", "run", "-it", "-v", "$(pwd)/.git:/app/.git", "teddy-app"]