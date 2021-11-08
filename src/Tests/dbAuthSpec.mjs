import {MongoClient} from 'mongodb'
import Realm from "realm";

const uri = "mongodb+srv://dbzo:dbzopass@carcluster.nhm6r.mongodb.net/EightAngelsTransportation?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const destination = 'destination2';
const query = { destination: 'destination' };
const doc ={pickUpDate:'12:12:10',pickUpTime:'02:03:04',destination: 'destination', firstName:'A', lastName:'Z', email:'az@email', phone:'555-555-5555' };
const email = "a@kbcfu.com";
const password = "pass1234";

export const APP_ID = "application-0-iyetn";

/**
 *  Insert a reservation based on destination, find it, and delete it
 */
async function run() {
  try {
    const app = new Realm.App(APP_ID);
   // Log out the currently active user
    await app.emailPasswordAuth.registerUser(email, password);
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    const usr =  await app.logIn(Realm.Credentials.emailPassword(email, password));

    console.log(' registered user::', usr);
    //const tst = await usr.functions.InsertReservation(doc);
  //   console.log("insert results:",tst);
    usr.functions.AddUserData({firstname:'me', lastname:'common', userid:usr.id}).

return true;
   /*   const database = client.db('EightAngelsTransportation');

    const reservationCollection = await database.collection('Reservations');
	
    //Insert reservation
	let result = await reservationCollection.insertOne(doc);
	console.log(`One document was inserted with the _id: ${result.insertedId}`);

    // Query for a reservation by destination 
  
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
