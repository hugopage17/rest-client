const  firebase = require('firebase')

var firebaseConfig = {
    apiKey: "AIzaSyDcRzXOvAQ5reO5xryOgSwiVcpnvHuJY14",
    authDomain: "request-app-2a1fe.firebaseapp.com",
    databaseURL: "https://request-app-2a1fe.firebaseio.com",
    projectId: "request-app-2a1fe",
    storageBucket: "request-app-2a1fe.appspot.com",
    messagingSenderId: "28796771959",
    appId: "1:28796771959:web:f84bb2d5f717c999e77072",
    measurementId: "G-Z0VHSDSZG9"
  };

const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics()
export default fire
