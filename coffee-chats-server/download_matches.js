const admin = require("./firebaseAdmin");
const fs = require('fs');

let matchesRef = admin.firestore.collection("responses").where("round", "==", 0);

matchesRef.get().then((snapshot) => {
  let data = snapshot.docs.map(doc => doc.data());

  let jsonifiedData = JSON.stringify(data, null, 2);
  console.log(JSON.stringify(data));
  fs.writeFile("form_responses.txt", jsonifiedData, function(err) { if (err) { console.log(err); } });
});
