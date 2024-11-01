const express = require('express')
require('dotenv').config()
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const { configDotenv } = require('dotenv');
// const sendNotificationsToDevices = require('./sendNoti')
// const {sendNotificationsToDevices} = require('./sendNoti')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const serviceAccount = require('./lockntalk-firebase-adminsdk-bsz1u-098b5e841e.json')

// const { getFirestore, connectFirestoreEmulator } =require( "firebase/firestore");
// const sendNotificationToDevice = require('./sendNotification.js');

try{admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    })
});
console.log("Initialized");

}
catch(e){
    console.error("error initializing : ",e)
}

app.post('/sendnotfi', (req, res) => {
    console.log("Successfully get request");
    let fcmToken = req.body.fcmToken
    let title = req.body.title
    let body = req.body.body
    let chatId = req.body.chatId

    const message = {
        data: {
            title: title,
            body: body,
            chatId: chatId
        },
        token: fcmToken
    };
    admin.messaging().send(message)
        .then((response) => {
            console.log('Notification sent:', response);
            console.log("Success to send notification")
            console.log(fcmToken)
            console.log(title)
            res.json({
                fcmToken: fcmToken,
                title: title,
                body: body,
                chatId: chatId
            })
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
            res.status(500).json(
                { message: "Unable to send notifictaion:" + error }
            )
            // throw error
        });



})

app.listen(7000, () => {
    console.log("Server started on port : 7000");
    console.log(`Project id : ${serviceAccount.project_id}`)
})  