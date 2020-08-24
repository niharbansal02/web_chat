var firebaseConfig = {
    apiKey: "AIzaSyAatX1uOiLCLvp8OAwy90JDcMbnaWUJRko",
    authDomain: "basic-chat-57c54.firebaseapp.com",
    databaseURL: "https://basic-chat-57c54.firebaseio.com",
    projectId: "basic-chat-57c54",
    storageBucket: "basic-chat-57c54.appspot.com",
    messagingSenderId: "1004346491057",
    appId: "1:1004346491057:web:a0eda3090d479add46a290",
    measurementId: "G-RG00DXZE69"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

const chatCollection = firestore.collection("Chats/");

let userName = "NULL";
const mainBody = document.querySelector("main");
const footerBody = document.querySelector("footer");
const headerBody = document.querySelector("header");
// console.log(Date.now());

document.querySelector(".submitUserName").addEventListener("click", () => {
    userName = document.querySelector(".userName").value.trim();
    if(userName.length != document.querySelector(".userName").value.length){
        document.querySelector(".userName").value = "";
    }

    if(userName.length > 0){
        console.log(`Welcome ${userName}`);
        mainBody.style.visibility = "visible";
        footerBody.style.visibility = "visible";
        headerBody.style.visibility = "hidden";
    } else{
        console.log("User didn't enter anything");
    }
})

const sendButton = document.querySelector(".sendButton");
let msgArea = document.querySelector(".msg");
sendButton.addEventListener("click", () => {   
    let timeStamp = Date.now();
    let docRef = firestore.doc("Chats/" + timeStamp);
    let msg = msgArea.value.trim()

    if(msg.length > 0){
        docRef.set({
            "message": msg,
            "from": userName
        }).then(() => {
            console.log("Message sent succesfully");
        }).catch(error => {
            console.log(`${error} error occured while sending the msg`);
        });

        console.log(`${userName} sent ${msgArea.value}`);
        msgArea.value = "";
    }else{
        msgArea.value = "";
    }
})

const displayMsg = async () =>{
    mainBody.innerHTML = "";

    const snapshot = await chatCollection.get();

    snapshot.docs.map(doc => {
        let currObj = doc.data();
        let sentBy = currObj["from"];
        let msg = currObj["message"];

        console.log(`${sentBy} sent ${msg}`);
    })


}

// setInterval(displayMsg, 50);
// displayMsg();

