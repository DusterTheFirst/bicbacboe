#!/usr/bin/env bash

function deployDirectory() {
    CHANNEL=$1
    DIRECTORY=$2

    rsync -rq --delete -e 'ssh -p 4220' --rsync-path="rm -rf bicbacboe/$CHANNEL/$DIRECTORY && mkdir -p bicbacboe/$CHANNEL/$DIRECTORY && rsync" $TRAVIS_BUILD_DIR/$DIRECTORY/build/ travis@ssh.bicbacboe.com:bicbacboe/$CHANNEL/$DIRECTORY
    ssh -p 4220 pi@ssh.bicbacboe.com "tree -h bicbacboe/$CHANNEL/$DIRECTORY"
}

if [ $# -eq 0 ]; then
    echo "You must supply a folder to deploy"
    exit 1
fi

if [ "$TRAVIS_BRANCH" = "master" ]; then
    echo "Deploying $1 to the STABLE branch"
    deployDirectory stable $1
else
    echo "Deploying $1 to the STAGING branch"
    deployDirectory staging $1
fi

echo "Deployed"