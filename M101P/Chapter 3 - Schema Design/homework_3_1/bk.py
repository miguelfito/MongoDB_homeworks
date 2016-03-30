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
    db=connection.school
    students = db.students
    
    print "Searching for students homework data and removing lowest scores: "
    try: 
    
        # To ensure we have only students that have done some homeworks
        alumns = students.find_one({'scores.type':'homework'})
        
        # For each alumn, let's get his scores
        for alumn in [alumns]:
            #print "Analizamos al alumno " + str(alumn['_id'])
            print "ALUMNO: "
            print alumn
            new_alumn = alumn
            
            scores = alumn['scores']
            
            print scores
            
            homework_stored_score = 0
            final_scores = []
            
            for score in scores:
                #array_scores = {}
                print "Puntuacion: "
                print score
                # If the previous stored score for a homework is lower, then update in array_scores
                if  (score['type'] == 'homework'): 
                    if (score['score'] > homework_stored_score):
                        homework_stored_score = score['score']
                        array_scores = score

                # In some other case
                else: 
                    array_scores = score
                    final_scores.append(array_scores)
                
            final_scores.append(array_scores)
            
            # Update the scores for this alumn
            new_alumn['scores'] = final_scores

            # Try to use replace_one
            #query= "'" + str(alumn['_id']) + "'"
            #ant = students.find({'_id': query})
            #result = students.replace_one(ant, new_alumn)
            #print result
            students.save(alumn)


    except Exception as e:
        print "Exception: ", type(e), e
        
        
remove_lowest_student_homework_score()
