#!/bin/sh
actions=( "mget" "incr" "mset" )
package="redis"

wsk package update $package
for action in "${actions[@]}"
do
    cd $action
    npm install
    zip -r action.zip *
    wsk action update $package/$action --kind nodejs:6 action.zip
    cd ..
done
