import {MongoClient} from 'mongodb'

const uri = "mongodb+srv://dbzo:dbzopass@carcluster.nhm6r.mongodb.net/EightAngelsTransportation?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const destination = 'destination2';
const query = { destination: 'destination' };
const doc ={pickUpDate:'12:12:10',pickUpTime:'02:03:04',destination: 'destination', firstName:'A', lastName:'Z', email:'az@email', phone:'555-555-5555' };
 
/**
 *  Insert a reservation based on destination, find it, and delete it
 */
async function run() {
  try {
    await client.connect();

    const database = client.db('EightAngelsTransportation');

    const reservationCollection = await database.collection('Reservations');
	
    //Insert reservation
	let result = await reservationCollection.insertOne(doc);
	console.log(`One document was inserted with the _id: ${result.insertedId}`);

    // Query for a reservation by destination 
   /* 
    const reservation = await reservationCollection.findOne(query);

    console.log(`A reservation found for ${destination}: `, reservation);

    // Delete reservation by destination 
    result = await reservationCollection.deleteOne(query);

    console.log(`A reservation deleted for ${destination}: ${result.deletedCount}`);
*/
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
