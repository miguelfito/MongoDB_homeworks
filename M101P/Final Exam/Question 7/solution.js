use photoshare

print("Adding index on images");
db.albums.ensureIndex({'images':1});

print("Iterating over images");
var cur = db.images.find();

var j = 0;
while (cur.hasNext()) {
	doc = cur.next();
	image_id = doc._id;
	
	b = db.albums.find({images:image_id}).count();
	
	if (b == 0) {
		// Delete it from images
		db.images.remove({_id:image_id});
		j++;
	}
}

print("Total removed was", j);
 					
db.images.find({'tags':'kittens'}).count();

