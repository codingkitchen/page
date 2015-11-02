#!/bin/bash
docker run -v /volumes/codingkitchen:/data --name codingkitchen-redis -d redis redis-server --appendonly yes
