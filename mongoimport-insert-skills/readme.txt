Import skills stored in a csv file into the MongoDB on a local development machine

1) Run the Meteor app as usual:
meteor run

2) Check the location of the integrated MongoDB (which is up only when the Meteor app is up):
meteor mongo -U
This should return something like:
mongodb://127.0.0.1:3001/meteor

3) Check that you can access the MongoDB using the mongo client (instead of using meteor mongo):
mongo mongodb://127.0.0.1:3001/meteor

4) Remove skills in the MongoDB accordingly. Example, if replacing 3 months skills, remove those skills directly in the MongoDB.

5) Use the mongoimport tool to import the various csv files into the MongoDB:
mongoimport --host=127.0.0.1 --port=3001 --db=meteor --collection=skills --type=csv --file=03months.csv --headerline
mongoimport --host=127.0.0.1 --port=3001 --db=meteor --collection=skills --type=csv --file=04months.csv --headerline
... for each month of skills

6) mongoimport only imports fields as strings. Use the following commands inside the MongoDB shell to replace boolean fields accordingly:
db.skills.update({requiresToyString: 'TRUE'}, {$set: {requiresToy: true}}, {multi:true})
db.skills.update({requiresToyString: 'FALSE'}, {$set: {requiresToy: false}}, {multi:true})
db.skills.update({}, {$unset: {requiresToyString: ''}}, {multi:true})
