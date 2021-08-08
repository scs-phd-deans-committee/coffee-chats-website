const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
      to: ['hlzhou@andrew.cmu.edu', 'rveerapa@andrew.cmu.edu', 'shahula@andrew.cmu.edu'], // Change to your recipient
      from: 'grad-coffee-chats@andrew.cmu.edu', // Change to your verified sender
      subject: 'React Hooks are #ezmoney',
      text: 'hello',
      html: '<strong>hello</strong>',
}
sgMail
  .send(msg)
  .then(() => {
          console.log('Email sent')
        })
  .catch((error) => {
          console.error(error)
        })

