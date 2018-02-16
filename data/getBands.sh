#!/bin/bash

curl --request POST \
  --url https://api.graphcms.com/simple/v1/cjdilrzin1bnk01297heuc8ys \
  --header 'Cache-Control: no-cache' \
  --header 'Content-Type: application/json' \
  --data '{
"query": "{allBands{name}}"
}' | jq .data.allBands > bands.json