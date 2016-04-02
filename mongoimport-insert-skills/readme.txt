Import skills stored in a csv file into the MongoDB on a local development machine

1) Run the Meteor app as usual:
meteor run

2) Check the location of the integrated MongoDB (which is up only when the Meteor app is up):
meteor mongo -U
This should return something like:
mongodb://127.0.0.1:3001/meteor

3) Check that you can access the MongoDB using the mongo client (instead of using meteor mongo):
mongo mongodb://127.0.0.1:3001/meteor

4) Use the mongoimport tool to import the csv file into MongoDB
mongoimport --host=127.0.0.1 --port=3001 --db=meteor --collection=skills --type=csv --file=03months.csv --headerline
