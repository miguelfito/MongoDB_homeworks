#!/usr/bin/env bash

# Create two mongod shard servers
mongod --shardsvr --dbpath 1 --fork --logpath 1/mongod.log --storageEngine wiredTiger --port 27001 --smallfiles
mongod --shardsvr --dbpath 2 --fork --logpath 2/mongod.log --storageEngine wiredTiger --port 27002 --smallfiles
# Create mongos process 
mongos --configdb localhost:27000 --fork --logpath mongos/mongos.log
# Create mongod config server
mongod --configsvr --dbpath config --fork --logpath config/mongod.log --storageEngine wiredTiger --port 27000 --smallfiles 

