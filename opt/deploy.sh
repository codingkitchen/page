#!/bin/bash
docker stop codingkitchen;
docker rm codingkitchen;
docker run -p 8080:8080 --name codingkitchen --link codingkitchen-redis:redis -d kordano/codingkitchen
