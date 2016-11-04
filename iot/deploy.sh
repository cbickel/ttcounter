#!/bin/sh
actions=( "publish" )

wsk package update iot
for action in "${actions[@]}"
do
    cd $action
    npm install
    zip -r action.zip *
    wsk action update iot/$action --kind nodejs:6 action.zip
    cd ..
done
