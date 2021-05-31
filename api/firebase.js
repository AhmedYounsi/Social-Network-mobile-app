import firebase from "firebase";
 
const firebaseConfig = {
    databaseURL: "https://insta-memes-react-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyA9YMYxYZYvTIVc9-gL8cYfycF6h9KFWw4",
    authDomain: "insta-memes-react.web.app",
    projectId: "insta-memes-react",
    storageBucket: "insta-memes-react.appspot.com",
    messagingSenderId: "192208211435",
    appId: "1:192208211435:web:25750aba908087e5ba9dae",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();
 const messageRef =  database.ref("messages")

export { database , messageRef };