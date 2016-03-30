#!/usr/bin/env python
# coding: utf-8

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
    db=connection.school
    students = db.students
    
    print "Searching for students homework data and removing lowest scores: "
    try: 
        # To ensure we have only students that have done some homeworks
        alumns = students.find({'scores.type':'homework'})
        
        # For each alumn, let's get his scores
        for alumn in alumns:
            
            scores = alumn['scores']
            
            homework_stored_score = -1
            array_scores = []
            
            for score in scores:
                # If the previous stored score for a homework is lower, then update in array_scores
                if (score['type'] == 'homework'): 
                    if (score['score'] > homework_stored_score):
                        homework_stored_score = score['score']
                # In any other case, insert
                else:
                    array_scores.append(score)
            
            # If we have some homework data, we keep the max score
            if (homework_stored_score != -1):
                array_scores.append({'score': homework_stored_score, 'type': 'homework'})
            
            # Update the scores for this alumn
            alumn['scores'] = array_scores

            # Try to use replace_one
            result = students.replace_one({"_id": alumn['_id']}, alumn)
            print "Matched: " + str(result.matched_count)
            print "Replaced: " + str(result.modified_count)

    except Exception as e:
        print "Exception: ", type(e), e

remove_lowest_student_homework_score()
