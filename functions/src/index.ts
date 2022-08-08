// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// admin.initializeApp();

// // create custom user claim function
// export const createUserClaim = functions.auth.user().onCreate(async (user) => {
//   await admin.auth().setCustomUserClaims(user.uid, {
//     admin: false,
//   });
// }
// );

// // add user document when on create user
// export const addUserDocument = functions.auth.user().onCreate(async (user) => {
//   await admin.firestore().collection("users").doc(user.uid).set({
//     email: user.email,
//     name: user.displayName,
//   }).then(() => {
//     return {
//       message: "User document added successfully",

//     };
//   }).catch((err) => {
//     return {
//       message: err.message,
//     };
//   });
// });

