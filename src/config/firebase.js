import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCRPYZ4JRuaa_CurTfYZsr90MczAjxTOr8",
    authDomain: "tanahairku-experimental-cl.firebaseapp.com",
    databaseURL: "https://tanahairku-experimental-cl.firebaseio.com",
    projectId: "tanahairku-experimental-cl",
    storageBucket: "tanahairku-experimental-cl.appspot.com",
    messagingSenderId: "175388049848",
    appId: "1:175388049848:web:38e04226b44deddd944f4d",
    measurementId: "G-NZ3H1SV2F6"
  };

const fire = firebase.initializeApp(config);
export default fire;