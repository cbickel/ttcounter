#!/bin/sh
actions=( "get" "incr" "del" )

wsk package update redis
for action in "${actions[@]}"
do
    cd $action
    npm install
    zip -r action.zip *
    wsk action update redis/$action --kind nodejs:6 action.zip
    cd ..
done
