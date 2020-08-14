const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.Locations = functions.https.onCall((data, context) => {
   const doors = {
       "Sewer": [900, 100],
       "Green Border": [292, 227], 
       "Elevator": [805, 55], 
       "Kitchen Door": [403, 300], 
       "Stairs": [368, 483], 
       "Bathroom": [336, 61]
   }
   return (Math.abs(data.x - doors[data.door][0]) < 50 && Math.abs(data.y - doors[data.door][1]) < 50);
 });
