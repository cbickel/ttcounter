#!/bin/sh
actions=( "point" )

wsk package update ttcounter
for action in "${actions[@]}"
do
    cd $action
    npm install
    zip -r action.zip *
    wsk action update ttcounter/$action --kind nodejs:6 action.zip
    cd ..
done
