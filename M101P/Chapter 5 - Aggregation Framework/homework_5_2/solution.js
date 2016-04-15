// This is a little bit weird because of using MongoDB 3.0...
// In this version, $avg is an aggregation operator ONLY in $group phase. Newer versions
// allow to use $avg in $project phases, so it's easy...
// PIPELINE
// 1. First, we need to get all cities in California and New York with population over 25000.
// 2. Then, we dump it into a new collection with $out:
db.zips.aggregate([ { $match: { $or: [{ state: "CA" }, { state: "NY" }], pop: {$gte: 25000}} } , { $out: "intermedia"} ])

// Well, let's do some cheats... :D 
db.intermedia.update({}, {$set: {pw: 1}}, {multi: 1})

// Once we have it in an isolated collection, we could get the Average with $avg:
db.intermedia.aggregate({$group:{"_id": "$pw", "PopulationAvg": {$avg: "$pop"}}})




// ANOTHER VIEW
db.zips.aggregate([ 
	{ $match: // Get those cities in CA $or NY with more than 25000 people
		{ 
			$or: [{ state: "CA" }, { state: "NY" }], 
			pop: {$gte: 25000}
		} 
	} , 
	{$group: // Then, $group by a non-existing key (gets all)...
		{ 
			"_id": "$noKeyNeeded", 
			PopulationAvg: { $avg: "$pop"} // And get the average
		} 
	} 
])
