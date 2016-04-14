// PIPELINE
// PIPELINE
// 1. First, we need to unwind data by $scores
// 2. Then, we $match only those $ne to quiz
// 3. Next, we $group it by $class_id and calculate its $avg over $scores.score
// 4. Finally, we $sort it in reverse order to get the max score 
db.grades.aggregate([{$unwind: "$scores"}, {$match: {"scores.type": {$ne: "quiz"}} }, {$group: {"_id": "$class_id", "ScoreAvg": {$avg: "$scores.score"} } }, {$sort: {"ScoreAvg": -1}} ])
