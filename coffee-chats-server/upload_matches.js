// Links
// https://medium.com/@devesu/how-to-upload-data-to-firebase-firestore-cloud-database-63543d7b34c5
const admin = require("./firebaseAdmin");

var data = require("./upload_test_data.json");
console.log(data);
data = JSON.parse(JSON.stringify(data));
console.log(data);

const collectionKey = "matches_test";

if (data && (typeof data === "object")) {
  Object.keys(data["matches"]).forEach(i => {
    admin.firestore.collection(collectionKey).doc().set({"participants": data["matches"][i], "round": data["round"]}, { merge: true }).then((res) => {
      console.log("Matches " + i + " successfully written: ");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  });
}
