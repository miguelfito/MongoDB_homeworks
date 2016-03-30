#!/usr/bin/env python

# Miguel Angel Melon
# MongoDB, Inc. 
# M101P - Copyright 2015, All Rights Reserved

import pymongo
import datetime
import sys

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://localhost")

# Let's remove lowest homework score data for each student
def remove_lowest_student_homework_score():

	# get a handle to the school database
	db=connection.students
	grades = db.grades
	
	print "Searching for students homework data and removing lowest scores: "
	try: 
		docs = grades.find({'type':'homework'})
		docs = docs.sort([('student_id',pymongo.ASCENDING), ('score',pymongo.ASCENDING)])
		prev = -1
		
		for doc in docs:
			if (doc['student_id'] != prev):
				prev = doc['student_id']
				grades.remove({'_id': doc['_id']})
				print str(doc['_id']) + " removed"

	except Exception as e:
		print "Exception: ", type(e), e
		
		
remove_lowest_student_homework_score()
