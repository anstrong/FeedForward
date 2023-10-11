const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:admin@feedforwarddb.d3pydak.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db_name = "feedforwarddb";

module.exports.call = async function call(operation, params, callback) {
    const db = client.db(db_name);

    switch (operation.toLowerCase()) {

        default:
            callback({ status: "requested data not found", body: params });
            break;
    };

    console.log('call complete: ' + operation);
    // client.close();
    return 'call complete';
};
