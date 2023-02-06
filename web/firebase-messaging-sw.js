importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyD745L9yOIygXdkvT_QZl765I6f1rFkOFA",
    authDomain: "foodietanzania-40be3.firebaseapp.com",
    projectId: "foodietanzania-40be3",
    storageBucket: "foodietanzania-40be3.appspot.com",
    messagingSenderId: "891465571233",
    appId: "1:891465571233:web:3a0c100042567895b749e0",
    measurementId: "G-5GS5DR9GP0",
    databaseURL: "...",
  });
  

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});