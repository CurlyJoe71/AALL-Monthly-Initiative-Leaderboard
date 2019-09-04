// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDLtFDVb1vQFkNpZiVCggchrxbOR5_1m1E",
    authDomain: "aall-incentive-billboard.firebaseapp.com",
    databaseURL: "https://aall-incentive-billboard.firebaseio.com",
    projectId: "aall-incentive-billboard",
    storageBucket: "aall-incentive-billboard.appspot.com",
    messagingSenderId: "1070378121864",
    appId: "1:1070378121864:web:f9678aa1ce92ea6e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
var csrNames = db.collection("CSR").doc("Names");
// var namesArray = [];
const namesArray = [
    "Jaime Gonzalez",
    "James Gonzo",
    "Jamie WrongName",
    "James Michael",
    "Jimmy GG",
    "Not As Good As Jimmy",
    "Jim Mickey",
    "Jim-Jim Jur-EE",
    "Jaime Bo Baime",
    "More Testing",
    "Even More Names",
    "Getting to the Bottom",
    "Who are You?",
    "I Have No Idea!",
    "Where are we going?",
    "Probably to the Moon and Back",
    "Oh you're so sweet",
    "I know, right?"
]

function getNames() {
    csrNames.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.data());
            // namesArray = Object.values(doc.data());
            console.log(namesArray); 
            addTopNames();
            addLowNames();
            topNameAnimation();
        }
    })
}


function addTopNames() {
    for (i=0; i<=2; i++) {
        const newTopName = "<h2 class='topName'>" + (i+1) + ". " + namesArray[i] + "</h2>";
        $('#nameField').append("<div class='row'></div>");
        $('#nameField').append(newTopName);
    }
} 

function addLowNames() {
    for (i=3; i<namesArray.length; i++) {
        const newLowName = "<h3 class='lowName'>" + (i+1) + ". " + namesArray[i] + "</h3>";
        $('#lowNameField').append("<div class='row'></div>");
        $('#lowNameField').append(newLowName);
    }
}

function topNameAnimation() {
    $('.topName').addClass('topNameAnimation');   
}

$(document).ready(function () {
    getNames();
})