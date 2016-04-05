// Solution to homework_3_3:
//

// Create an index on the products collection for the field, "for":
db.products.createIndex({for: 1})

// Q1: How many products match this query?
db.products.find({for: "ac3"}).count()

// Q2: Run the same query, but this time do an explain(). How many documents were examined?:
db.products.find({for: "ac3"}).explain("executionStats")
// (Take a look on “totalDocsExamined” field)

// Q3: Does the explain() output indicate that an index was used?
// (Take a look on “indexName” field)
