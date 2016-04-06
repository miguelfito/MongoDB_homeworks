// Homework 4_4
/*
Now query the profile data, looking for all queries to the students collection in the database school2, sorted in order of decreasing latency. What is the latency of the longest running operation to the collection, in milliseconds?
*/

db.profile.find({op: "query", ns: "school2.students"}).sort({millis: -1}).limit(1).pretty()
// And take a look on “millis” data…
