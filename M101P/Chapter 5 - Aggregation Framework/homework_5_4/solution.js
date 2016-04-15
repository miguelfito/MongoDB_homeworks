// PIPELINE
db.zips.aggregate([
			{$project: 
				{ 
				first_char: {$substr : ["$city",0,1]}, // Project city's name first char...
				city: "$city", // Project also $city name...
				population: "$pop", // City's $population...
				groupKey: 1 // ... And a groupKey standard value to group later... ;) 
				}
			}, 
			{$match: 
				{
				first_char: {$lt: "A"} // Get only cities starting with a digit 
				}
			}, 
			{$group: 

				{
				"_id": "$groupKey", // Then, group by $groupKey (unnecessary). We can group by another key that doesn't exist
				Total: {$sum: "$population"} //.. and get the $population $sum
				}
			}
])

