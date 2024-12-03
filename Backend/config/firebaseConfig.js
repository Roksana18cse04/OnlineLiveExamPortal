const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onlineexam-88dc0-default-rtdb.firebaseio.com/",

    storageBucket: "onlineexam-88dc0.appspot.com",
  });
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

const db = admin.firestore();
const auth = admin.auth();


const bucket = admin.storage().bucket();


(async () => {
  try {
    console.log(`Testing Firebase Storage Configuration...`);
    console.log(`Bucket name: ${bucket.name}`); // If correctly configured, the bucket name will be logged
  } catch (error) {
    console.error("Storage configuration error:", error);
  }
})();
module.exports = { db, auth,bucket };
