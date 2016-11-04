#!/bin/sh
actions=( "afterSetHandling" )

wsk package update ttcounter
for action in "${actions[@]}"
do
    cd $action
    npm install
    zip -r action.zip *
    wsk action update ttcounter/$action --kind nodejs:6 action.zip
    cd ..
done

wsk action update ttcounter/allKeys allKeys.js
wsk action update ttcounter/refreshScore --sequence ttcounter/allKeys,myRedis/mget,myIot/publish
wsk action update ttcounter/point --sequence myRedis/incr,ttcounter/refreshScore,ttcounter/afterSetHandling,myRedis/rpush,myRedis/expire
wsk action update ttcounter/resetKeysAndValues resetKeysAndValues.js
wsk action update ttcounter/reset --sequence ttcounter/resetKeysAndValues,myRedis/mset,ttcounter/refreshScore
# wsk action update ttcounter/back --sequence myRedis/rpop,
