// PIPELINE:
// 1. First, we need to unwind by comments. 
// 2. Then, let's group by comments.author, counting every occurrence. 
// 3. Finally, let's sort descending.
db.posts.aggregate([{$unwind: "$comments"}, {$group: { "_id": "$comments.author", "Total": {$sum:1}}}, {$sort: {"Total": -1}}])
