#!/bin/sh

#afterSetHandling
wsk trigger update afterSet -P allKeys.json
wsk action update afterSetHandling afterSetHandling.js
wsk action update afterSetSequence --sequence myRedis/mget,afterSetHandling,myRedis/mset
wsk rule update afterSetRule afterSet afterSetSequence

#point
wsk trigger update point
cd triggerAfterSet
npm install
zip -r action.zip *
wsk action update triggerAfterSet --kind nodejs:6 action.zip
cd ..
wsk action update pointSequence --sequence myRedis/incr,myIot/publish,triggerAfterSet
wsk rule update pointRule point pointSequence

#refreshScore
wsk trigger update refreshScore -P allKeys.json
wsk action update refreshSequence --sequence myRedis/mget,myIot/publish
wsk rule update refreshScoreRule refreshScore refreshSequence

#reset
wsk trigger update reset -P reset.json
wsk action update resetSequence --sequence myRedis/mset,myIot/publish
wsk rule update resetRule reset resetSequence
