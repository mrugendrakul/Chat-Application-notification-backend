const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const serviceAccount = require('./lockntalk-firebase-adminsdk-bsz1u-098b5e841e.json')
// const { getFirestore, connectFirestoreEmulator } =require( "firebase/firestore");
// const sendNotificationToDevice = require('./sendNotification.js');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function sendNotificationsToDevices(fcmToken, title, body,chatId) {
    // if (!Array.isArray(fcmTokens) || fcmTokens.length === 0) {
    //     console.error('Error: tokens must be a non-empty array');
    //     return;
    // }

    // const messages = fcmTokens.map(token => ({
    //     notification: {
    //         title: title,
    //         body: body
    //     },
    //     token: token
    // }));

    const message = {
        data: {
            title: title,
            body: body,
            chatId:chatId
        },
        token: fcmToken
    };
    admin.messaging().send(message)
        .then((response) => {
            console.log('Notification sent:', response);
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
            // throw error
        });
}

var encryptedMessage = "ca15glcrwpggYvH9LSLlEMVzaYgG4RpllMvCwmaXtbQ="

sendNotificationsToDevices(
    fcmToken = "fljXWH90THWSqqTYI9XKSG:APA91bH1HO01_7rrGYe6DYJLlkQfQNQ-ih_NCEmicDbYG7r_GiPPpzU1YHPq7HgS8bRAs0wRE4ZOmLAyc4OrZtze8rDgtMBc-JNbXjgODIPXkCRZIKWQp8I",
    title="Testing notification",
    body=encryptedMessage,
    chatId = "1912700085"
)

var messageJson = {
    "fcmToken":"fljXWH90THWSqqTYI9XKSG:APA91bH1HO01_7rrGYe6DYJLlkQfQNQ-ih_NCEmicDbYG7r_GiPPpzU1YHPq7HgS8bRAs0wRE4ZOmLAyc4OrZtze8rDgtMBc-JNbXjgODIPXkCRZIKWQp8I",
    "title":"Testing Last and final time for our sake",
    "body":"ca15glcrwpggYvH9LSLlEMVzaYgG4RpllMvCwmaXtbQ=",
    "chatId":"1912700085"
  }

// export default sendNotificationsToDevices
module.exports = {sendNotificationsToDevices}