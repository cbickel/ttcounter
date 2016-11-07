#!/bin/sh

#backup / back
wsk action update backupToScore backupToScore.js
wsk action update scoreToBackup scoreToBackup.js
wsk action update backup --sequence scoreToBackup,myRedis/rpush
wsk trigger update back -p payload "{\"backup\":null}"
wsk action update backSequence --sequence myRedis/rpop,myRedis/rpop,backupToScore,myRedis/mset,myIot/publish,backup
wsk rule update backRule back backSequence

#point
wsk action update afterSetHandling afterSetHandling.js
wsk action update allKeys allKeys.js
wsk trigger update point
wsk action update pointSequence --sequence myRedis/incr,myIot/publish,allKeys,myRedis/mget,afterSetHandling,myRedis/mset,backup
wsk rule update pointRule point pointSequence

#refreshScore
wsk trigger update refreshScore -P allKeys.json
wsk action update refreshSequence --sequence myRedis/mget,myIot/publish
wsk rule update refreshScoreRule refreshScore refreshSequence

#reset
wsk trigger update reset -P reset.json
wsk action update resetSequence --sequence myRedis/mset,myIot/publish,backup
wsk rule update resetRule reset resetSequence
