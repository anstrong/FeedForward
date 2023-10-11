/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('data');
/*
// Insert a few documents into the sales collection.
db.getCollection('users').insertMany([
{ 'username': 'user1', 'password': 'password1', 'is_manager': false, 'direct_reports': [] },
{ 'username': 'user2', 'password': 'password1', 'is_manager': false, 'direct_reports': [] },
{ 'username': 'user3', 'password': 'password1', 'is_manager': true, 'direct_reports': ['user1', 'user2'] },
{ 'username': 'user4', 'password': 'password1', 'is_manager': false, 'direct_reports': [] },
{ 'username': 'user5', 'password': 'password1', 'is_manager': true, 'direct_reports': ['user4'] },
]);*/

db.getCollection('entries').insertMany([
    { 'body': 'this job sucks', 'sender': 'user1', 'recipient': 'user3', 'valence': 0 }]);

