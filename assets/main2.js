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

//getting date of last Friday, formatting to match the string in Firebase records
const t = new Date().getDate() + (6 - new Date().getDay() -1) -7;
console.log("t: ", t);
const lastFridayObject = new Date();
lastFridayObject.setDate(t);
let lastWeek = lastFridayObject.getFullYear() + "" + (lastFridayObject.getMonth() + 1) + "" + (lastFridayObject.getDate());
if (new Date().getDay() == 5) {
    let date = new Date();
    lastWeek = date.getFullYear() + "" + (date.getMonth() + 1) + "" + (date.getDate());
} 

console.log(lastWeek);
let tempObject = new Object();
// let query = csrNames.where('dateCreated', '==', `${lastWeek}`)
//     .get()
//     .then(snapshot => {
//         snapshot.forEach(doc => {
//             console.log(doc.data().CSR);
           
//                 tempObject['Name'] = doc.data().Name;
//                 tempObject['Tribe'] = doc.data().Tribe;
//                 tempObject['Streak'] = doc.data().Streak;
//                 // console.log(tempObject);
//                 mainObject.push(tempObject);
//                 // console.log(mainObject);
//                 addSingleName(tempObject);
            
//         }
//         )
//     })

function getNames() {
    csrNames.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.data().CSR);
            if(doc.data().dateCreated == `${lastWeek}`) {
                tempObject['Name'] = doc.data().Name;
                tempObject['Tribe'] = doc.data().Tribe;
                tempObject['Streak'] = doc.data().Streak;
                // console.log(tempObject);
                mainObject.push(tempObject);
                // console.log(mainObject);
                addSingleName(tempObject);
            }
        })
            // addTopNames();
            //addNames();
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

function addSingleName(obj) {
    //console.log(obj);
    let newLowName = "";
    let emoji7 = "<i class='em em---1' aria-role='presentation' aria-label='thumbs up'></i>"
    let emoji14 = "<i class='em em-hugging_face' aria-role='presentation' aria-label='hugging face'></i>";
    let emoji21 = "<i class='em em-muscle' aria-role='presentation' aria-label='muscle'></i>";
    let emoji28 = "<i class='em em-kissing_cat' aria-role='presentation' aria-label='kissing cat'></i>";
    let emoji35 = "<i class='em em-fire' aria-role='presentation' aria-label='fire'></i>";
    let emoji42 = "<i class='em em-heart_eyes' aria-role='presentation' aria-label='heart eyes'></i>";    

    if (obj["Streak"] == 7) {
        emoji14 = "";
        emoji21 = "";
        emoji28 = "";
        emoji35 = "";
        emoji42 = "";
    }
    else if (obj["Streak"] ==14) {
        emoji21 = "";
        emoji28 = "";
        emoji35 = "";
        emoji42 = "";
    }
    else if (obj["Streak"] == 21) {
        emoji28 = "";
        emoji35 = "";
        emoji42 = "";
    }
    else if (obj["Streak"] == 28) {
        emoji35 = "";
        emoji42 = "";
    }
    else if (obj["Streak"] == 35) {
        emoji42 = "";
    }

    newLowName = "<h3 class='lowName'>" + obj["Name"] + " <span class='tribe'>(" + 
        obj["Tribe"] + ")</span> <span class='streak'>" + obj["Streak"] + " days<span> " + emoji7 + " " + emoji14 + " " + emoji21 + " " + emoji28 + " " + emoji35 + "</h3>";
    $('#lowNameField').append("<div class='row'></div>");
    $('#lowNameField').append(newLowName);
    // $('#lowNameField').append(emoji);
}

function addNames() {
    mainObject.forEach(doc => {
        console.log(doc)
        const newLowName = "<h3 class='lowName'>" + doc["Name"] + " <span class='tribe'>(" + doc["Tribe"] + ")</span> " + doc["Streak"] + " days" + "</h3>";
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