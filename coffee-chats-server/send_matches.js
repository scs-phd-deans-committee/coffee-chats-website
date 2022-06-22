const sgMail = require('@sendgrid/mail');
const admin = require("./firebaseAdmin");

const fs = require('fs');

let matchesRef = admin.firestore.collection("responses").where("round", "==", 0);

matchesRef.get().then((snapshot) => {
  let data = snapshot.docs.map(doc => doc.data());

  let jsonifiedData = JSON.stringify(data, null, 2);
  console.log(JSON.stringify(data));
  fs.writeFile("form_responses.txt", jsonifiedData, function(err) { if (err) { console.log(err); } });
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
      to: ['hlzhou@andrew.cmu.edu', 'rveerapa@andrew.cmu.edu', 'shahula@andrew.cmu.edu'], // Change to your recipient
      from: 'grad-coffee-chats@andrew.cmu.edu', // Change to your verified sender
      subject: 'React Hooks are #ezmoney',
      text: 'hello',
      html: '<strong>hello</strong>',
}

sgMail.send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
