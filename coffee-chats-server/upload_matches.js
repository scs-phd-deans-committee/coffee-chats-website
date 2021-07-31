// Links
// https://medium.com/@devesu/how-to-upload-data-to-firebase-firestore-cloud-database-63543d7b34c5
const admin = require("./firebaseAdmin");

var data = require("./upload_test_data.json");
console.log(data);
data = JSON.parse(JSON.stringify(data));
console.log(data);

const collectionKey = "uploaded_test_matches"; //name of the collection


if (data && (typeof data === "object")) {
  console.log(Object.keys(data));

  // const docKey = data["round"];
  // console.log(docKey);
  // admin.firestore.collection(collectionKey).doc(docKey).set(data).then((res) => {
  //   console.log("Document " + docKey + " successfully written!");
  // }).catch((error) => {
  //   console.error("Error writing document: ", error);
  // });

  const docKey = data["round"];
  console.log(docKey);
  admin.firestore.collection(collectionKey).doc(docKey).set({round: data["round"]}).then((res) => {
    console.log("Created doc!");
    Object.keys(data["matches"]).forEach(i => {
      // const item = {[i]: data["matches"][i]};
      // console.log(i, data["matches"][i], item);
      admin.firestore.collection(collectionKey).doc(docKey).set({[i]: data["matches"][i]}, { merge: true }).then((res) => {
        console.log("Matches " + i + " successfully written: ");
      }).catch((error) => {
        console.error("Error writing document: ", error);
      });
    });
  }).catch((error) => {
    console.error("Error creating document: ", error);
  });

  // Object.keys(data["matches"]).forEach(i => {
  //   // const item = {[i]: data["matches"][i]};
  //   // console.log(i, data["matches"][i], item);
  //   admin.firestore.collection(collectionKey).doc(docKey).set({[i]: data["matches"][i]}, { merge: true }).then((res) => {
  //     console.log("Matches " + i + " successfully written: ");
  //   }).catch((error) => {
  //     console.error("Error writing document: ", error);
  //   });
  // });
  
  // Object.keys(data).forEach(docKey => {
  //   admin.firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
  //       console.log("Document " + docKey + " successfully written!");
  //   }).catch((error) => {
  //     console.error("Error writing document: ", error);
  //   });
  // });
}

