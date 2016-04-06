// Homework 4_3
/*
Your assignment is to make the following blog pages fast:

The blog home page
The page that displays blog posts by tag (http://localhost:8082/tag/whatever)
The page that displays a blog entry by permalink (http://localhost:8082/post/permalink)

By fast, we mean that indexes should be in place to satisfy these queries such that we only need to scan the number of documents we are going to return.
*/


// The blog home page
// On blogPostDAO.py, in line 68, we have the following find query:
//        cursor = self.posts.find().sort('date', direction=-1).limit(num_posts)
// so, we need to optimize it creating a new index for ‘date’ key, descending:
db.posts.createIndex({ date: -1 })
// After that:
    > db.posts.getIndexes()
    [
        {
            "v" : 1,
            "key" : {
                "_id" : 1
            },
            "name" : "_id_",
            "ns" : "blog.posts"
        },
        {
            "v" : 1,
            "key" : {
                "date" : -1
            },
            "name" : "date_-1",
            "ns" : "blog.posts"
        }
    ]
    >


// The page that displays blog posts by tag (http://localhost:8082/tag/whatever)
// On blogPostDAO.py, in line 89, we have the following find query:
//        cursor = self.posts.find({'tags':tag}).sort('date', direction=-1).limit(num_posts)
// so, we need to optimize it creating a new index for ‘tags’ key and ‘date’ in reverse order:
db.posts.createIndex({ tags: 1 , date: -1})
// After that:
    > db.posts.getIndexes()
    [
        {
            "v" : 1,
            "key" : {
                "_id" : 1
            },
            "name" : "_id_",
            "ns" : "blog.posts"
        },
        {
            "v" : 1,
            "key" : {
                "date" : -1
            },
            "name" : "date_-1",
            "ns" : "blog.posts"
        },
        {
            "v" : 1,
            "key" : {
                "tags" : 1
            },
            "name" : "tags_1",
            "ns" : "blog.posts"
        }
    ]
    >
    
    
// The page that displays a blog entry by permalink (http://localhost:8082/post/permalink)
// On blogPostDAO.py, in line 110, we have the following find query:
//        post = self.posts.find_one({'permalink': permalink})
// so, we need to optimize it creating a new index for ‘permalink’ key:
db.posts.createIndex({ permalink: 1 })
// After that:
    > db.posts.getIndexes()
    [
        {
            "v" : 1,
            "key" : {
                "_id" : 1
            },
            "name" : "_id_",
            "ns" : "blog.posts"
        },
        {
            "v" : 1,
            "key" : {
                "date" : -1
            },
            "name" : "date_-1",
            "ns" : "blog.posts"
        },
        {
            "v" : 1,
            "key" : {
                "tags" : 1
            },
            "name" : "tags_1",
            "ns" : "blog.posts"
        },
        {
            "v" : 1,
            "key" : {
                "permalink" : 1
            },
            "name" : "permalink_1",
            "ns" : "blog.posts"
        }
    ]
    >
