#!/bin/bash

NAME="urban_api"
TMP_DIR="./tmp/urban"

rm -rf $TMP_DIR

# Git clone & credentials
#git config --global credential.helper 'cache --timeout=3600'
#git clone --branch master https://github.com/kleon919/urban-assignment.git $TMP_DIR


# Remove container if exists
CONT=$(docker ps -a -q  --filter "name=$NAME")

if [ "$CONT" != "" ]
then
    docker rm -f $CONT
fi

# Copy .env file in case of cloning from git
#cp ./.env $TMP_DIR/
#cd $TMP_DIR

docker build -t $NAME .
docker run --name $NAME -p 5000:5000 -d $NAME

docker rmi $(docker images -f "dangling=true" -q)
#IMAGE=$(docker images $NAME --format "{{.ID}}")