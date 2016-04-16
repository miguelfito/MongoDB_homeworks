#!/usr/bin/env bash
mongod --dbpath 1 --fork --logpath 1/mongod.log --storageEngine mmapv1 --port 27001 --replSet 'M102-5' --smallfiles
mongod --dbpath 2 --fork --logpath 2/mongod.log --storageEngine mmapv1 --port 27002 --replSet 'M102-5' --smallfiles
mongod --dbpath 3 --fork --logpath 3/mongod.log --storageEngine mmapv1 --port 27003 --replSet 'M102-5' --smallfiles

