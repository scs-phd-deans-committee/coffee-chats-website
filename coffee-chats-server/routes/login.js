var express = require('express');
var router = express.Router();
const admin = require("../firebaseAdmin");

/* GET users listing. */
router.post('/', function(req, res, next) {
  // And insert something like this instead:
  
  console.log(req.body.email);
  function getOrCreateUser(userQuery) {
    // the "sub" field means "subject", which is a unique identifier for each user
    console.log(userQuery);
    let userRef = admin.firestore.collection("users").doc(userQuery.uid);
    let user = userRef.get()
      .then(userSnapshot => {
        if (userSnapshot.exists) {
          console.log("User exists");
          return userSnapshot.data();
        }
        else {
          console.log("Creating user");
          let data = {
            uid: userQuery.uid,
            email: userQuery.email,
            name: userQuery.displayName,
            pronoun: null,
            department: null,
            year: null,
            motto: null,
          };
          let newUser = userRef.set(data).then(() => {
            return data;
          });
          return newUser;
          // let newUser = firestore.collection("users").doc(userQuery.uid).set("email", "==", userQuery.email).get()
          //   .then((profileSnapshot) => {
          //   });
          // return newUser;
        }
      });
    return user;
  }

  if (req.body.email.endsWith("@andrew.cmu.edu") || req.body.email.endsWith("@pitt.edu")) {
    let userPromise = getOrCreateUser(req.body);
    userPromise.then((user) => {
      res.send(user);
    });
  }
  else {
    res.send({});
  }
});

module.exports = router;
