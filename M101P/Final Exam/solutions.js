// Question 1
db.messages.find({"headers.From": "andrew.fastow@enron.com", "headers.To": "jeff.skilling@enron.com"}).count() 
db.messages.find({"headers.From": "andrew.fastow@enron.com", $or: [{"headers.To": "jeff.skilling@enron.com"}, {"headers.Bcc":"jeff.skilling@enron.com"}, {"headers.Cc":"jeff.skilling@enron.com"}]}).count()
// or using lists:
db.messages.find({"headers.From": { $in: ["andrew.fastow@enron.com"]}, "headers.To": "jeff.skilling@enron.com"}).count()
db.messages.find({"headers.From": { $in: ["andrew.fastow@enron.com"]}, $or: [{"headers.To": "jeff.skilling@enron.com"}, {"headers.Bcc":"jeff.skilling@enron.com"}, {"headers.Cc":"jeff.skilling@enron.com"}]}).count()



// Question 2
db.messages.aggregate([
	{ '$unwind': '$headers.To'},
	{ '$group':
	  {
	    _id: { '_id': '$_id',
	    	   From: '$headers.From' },
	    To: { $addToSet: '$headers.To' }
	  }
	},
	{ '$unwind': '$To' },
	{ '$group': 
	  {
	    _id: { 'From': '$_id.From',
		   'To': '$To'},
	    count: { '$sum': 1 }
	  }
	},
	{ '$sort': {'count': -1 } },
	{ '$limit': 10 }
	])

// Question 3
db.messages.update({ 'headers.Message-ID': '<8147308.1075851042335.JavaMail.evans@thyme>' }, { '$push': { 'headers.To': 'mrpotatohead@mongodb.com' }})

