#!/usr/bin/env bash

function deployDirectory() {
    CHANNEL=$1
    DIRECTORY=$2

    rsync -rq --delete -e 'ssh -p 4220' --rsync-path="rm -rf bicbacboe/$CHANNEL/$DIRECTORY && mkdir -p bicbacboe/$CHANNEL/$DIRECTORY && rsync" $TRAVIS_BUILD_DIR/$DIRECTORY/build/ travis@ssh.bicbacboe.com:bicbacboe/$CHANNEL/$DIRECTORY
    ssh -p 4220 travis@ssh.bicbacboe.com "tree -h bicbacboe/$CHANNEL/$DIRECTORY"
}

if [ $# = 0 ] || ([ $1 != "staging" ] && [ $1 != "stable" ]); then
    echo "You must supply a valid branch to deploy to"
    exit 1
fi

echo "Building"
yarn run build
echo "Completed build"

deployDirectory $1 client
deployDirectory $1 server

echo "Deployed"