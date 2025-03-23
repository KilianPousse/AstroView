#!/bin/bash
(cd ./front && ng serve &) 
(cd ./back && node server.js &) 
wait