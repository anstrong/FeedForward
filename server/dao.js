const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:admin@feedforwarddb.d3pydak.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db_name = "feedforwarddb";

module.exports.call = async function call(operation, params, callback) {
    const db = client.db(db_name);

    switch (operation.toLowerCase()) {

        case 'authenticate':
            try{
                const collection = db.collection("users")
                const username = params.body.username;
                const password = params.body.password;
                const user = await collection.findOne({ username: username });
               
                if (user && user.password === password) {
                    callback({ body: { username }, status: 200 })
                } else {
                    callback({ body: "Invalid credentials", status: 401 });
                }
                
            } catch (e) {
                console.log(e);
                callback({ body: false, status: 404});
            } finally {
                break;
            }
        
        case 'get_user':
            try{
                const collection = db.collection("users")
                const username = params.body.username;
                const user = await collection.findOne({ username: username });
                callback({ body: { user }, status: 200 })
            } catch (e) {
                console.log(e);
                callback({ body: false, status: 404});
            } finally {
                break;
            }
            
        case 'get_entries':
            try{
                const collection = db.collection("entries")
                const username = params.body.username;
                const entries = await collection.find({ recipient: username });
                callback({ body: { entries }, status: 200 })
            } catch (e) {
                console.log(e);
                callback({ body: false, status: 404});
            } finally {
                break;
            }
        
               
        default:
            callback({ status: "requested data not found", body: params });
            break;
    };

    console.log('call complete: ' + operation);
    // client.close();
    return 'call complete';
};
