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
let csrNames = db.collection("Survivors");
let mainObject = [];
// const namesArray = [
//     "Jaime Gonzalez",
//     "James Gonzo",
//     "Jamie WrongName",
//     "James Michael",
//     "Jimmy GG",
//     "Not As Good As Jimmy",
//     "Jim Mickey",
//     "Jim-Jim Jur-EE",
//     "Jaime Bo Baime",
//     "More Testing",
//     "Even More Names",
//     "Getting to the Bottom",
//     "Who are You?",
//     "I Have No Idea!",
//     "Where are we going?",
//     "Probably to the Moon and Back",
//     "Oh you're so sweet",
//     "I know, right?",
//     "Boom Chikaboom"
// ]

/* 
mainObject should look like:
{Name: "Jaime Gonzalez",
Tribe: "CORP"},
{Name: "Jimmy Gonzo",
Tribe: "ACHG"}
*/

function getNames() {
    csrNames.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.data().CSR);
            // piece together a new object with whatever details we'll need displayed.
            // e.g. Name, Tribe, else?

            // change line below to make the mainObject contain the newly constructed object.
            // mainObject = Object.keys(doc.data());
            let tempObject = new Object();
            tempObject['Name'] = doc.data().Name;
            tempObject['Tribe'] = doc.data().Tribe;
            // console.log(tempObject);
            mainObject.push(tempObject);
            // console.log(mainObject);
        })

            // addTopNames();

            addNames();
            // topNameAnimation();
    })
    .catch(err => {
        console.log(`Error getting documents. ${err}`)
    })
}

// function addTopNames() {
//     for (i=0; i<=2; i++) {
//         const newTopName = "<h2 class='topName'>" + namesArray[i] + "</h2>";
//         $('#nameField').append("<div class='row'></div>");
//         $('#nameField').append(newTopName);
//     }
// } 

function addNames() {
    mainObject.forEach(doc => {
        console.log(doc)
        const newLowName = "<h3 class='lowName'>" + doc["Name"] + " (" + doc["Tribe"] + ")" + "</h3>";
        $('#lowNameField').append("<div class='row'></div>");
        $('#lowNameField').append(newLowName);
    })
}

function topNameAnimation() {
    $('.topName').addClass('topNameAnimation');   
}

$(document).ready(function () {
    getNames();
})