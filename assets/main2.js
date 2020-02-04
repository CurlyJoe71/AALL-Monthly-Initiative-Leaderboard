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
// let csrNames = db.collection("Survivors");
// let endoNames = db.collection("Endos");
let taxesNames = db.collection ("Taxes");
let mainObject = [];
let endoObject = [];

//getting date of last Friday, formatting to match the string in Firebase records
// const t = new Date().getDate() + (6 - new Date().getDay() -1) -7;
// console.log("t: ", t);
// const lastFridayObject = new Date();
// lastFridayObject.setDate(t);
// let lastWeek = lastFridayObject.getFullYear() + "" + (lastFridayObject.getMonth() + 1) + "" + (lastFridayObject.getDate());
// if (new Date().getDay() == 5) {
//     let date = new Date();
//     lastWeek = date.getFullYear() + "" + (date.getMonth() + 1) + "" + (date.getDate());
// } 

// console.log(lastWeek);
let tempObject = new Object();
let tempEndoObject = new Object();

$("<tr>").tooltip({
    position: {
        my: "center bottom-20",
        at: "center top",
        using: (position, feedback) => {
            $(this).css(position);
            $("<div>")
                .addClass("arrow")
                .addClass(feedback.vertical)
                .addClass(feedback.horizontal)
                .appendTo(this);
        }
    }
});

addTaxesRow = obj => {
    let newTaxRow = "";
    newTaxRow = 
        "<tr>" + 
            "<td class='names'>" + obj["Name"] + "<br/>" + "<span class='tribe'>(" + obj["office"] + ")</span>" + "</td>" + 
            "<td title='" + obj["AppointmentsSet"] + " appointments set out of " + obj["TotalOpps"] + " opportunities'" + ">" + obj["appSet"] + "%" + "</td>" +
            "<td title='" + obj["TaxesFiled"] + " customers filed out of" + obj["AppointmentsSet"] + " appointments scheduled'" + ">" + obj["conversion"] + "%" + "</td>" + 
            "<td>" + obj["Bonus"] + "</td>" + 
            // "<td>" + obj["manager"] + "</td>" +
            "<td>" + obj["officePercentage"] + "%" + "</td>" +
        "</tr>";
                console.log('newTaxRow', newTaxRow);
    $('#taxRow').before(newTaxRow);
    
}

getTaxes = () => {
    taxesNames.orderBy('Bonus', 'desc').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            tempObject['Name'] = doc.data().Name;
            tempObject['office'] = doc.data().office;
            tempObject['AppointmentsSet'] = doc.data().AppointmentsSet;
            tempObject['TotalOpps'] = doc.data().TotalOpportunities;
            tempObject['appSet'] = doc.data().appSet;
            tempObject['TaxesFiled'] = doc.data().TaxesFiled;
            tempObject['conversion'] = doc.data().conversion;
            tempObject['Bonus'] = doc.data().Bonus;
            // tempObject['manager'] = doc.data().manager;
            // tempObject['teamApp'] = doc.data().teamApp;
            tempObject['officePercentage'] = doc.data().officePercentage;
            addTaxesRow(tempObject);
        })
    })
}

getOfficeLeader = () => {
    let leadingNumber;
    let leadingOffice;
    let officeLeader = `<h4>The office with the best Conversion Rate:</h4>`;
    taxesNames.orderBy('ConversionOffice', 'desc').limit(1).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            leadingNumber = doc.data().officePercentage;
            leadingOffice = doc.data().office;
            console.log('getOfficeLader top ranking office: ', doc.data().office, doc.data().officePercentage);
            officeLeader += `<div title='${doc.data().TaxesFiledOffice} customers filed out of ${doc.data().officeApptSet} appointments scheduled'><span>${doc.data().office}</span> at ${doc.data().ConversionOffice}%!</h4></div>`
            $('#officeLeader').append(officeLeader);
        })
    })
    .then(()=>{
        taxesNames.orderBy('office', 'asc').where('officePercentage', '==', leadingNumber).where('office', '>', leadingOffice).limit(1).get()
        .then(snapshot2 => {
            snapshot2.forEach(doc => {
                console.log('snapshot2 doc.data: ', doc.data());
            })
        })
    })
}

getOfficeLeader2 = () => {
    let officeLeader = `<h4>The office with the most Appointments Set:</h4>`;
    taxesNames.orderBy('officePercentage', 'desc').limit(1).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            officeLeader += `<div title='${doc.data().officeApptSet} appointments made out of ${doc.data().officeTotalOpp} total opportunities'><span>${doc.data().office}</span> at ${doc.data().officePercentage}%!</h4></div>`
            $('#officeLeader2').append(officeLeader);
        })
    })
}

function getNames() {
    csrNames.orderBy('Streak', 'desc').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            // console.log(doc.data().Streak);
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

function getEndoNames() {
    endoNames.orderBy('Streak', 'desc').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            //${lastWeek}
            // console.log('end doc.data', doc.data().dateCreated);
            if(doc.data().dateCreated == `20191226`) {
                tempEndoObject['Name'] = doc.data().Name;
                tempEndoObject['Tribe'] = doc.data().Tribe;
                tempEndoObject['Streak'] = doc.data().Streak;
                mainObject.push(tempEndoObject);
                addSingleEndoName(tempEndoObject)
            }
        })
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

function addSingleEndoName(obj) {
    let newEndoName = "";
    let emoji7 = "<span aria-role='image' aria-label='thumbs up'>👍</span>";
    newEndoName = "<h3 class='lowName'>" + obj["Name"] + " <span class='tribe'>(" + 
    obj["Tribe"] + ")</span> <span class='streak'>" + obj["Streak"] + " days<span></h3>";
    $('#endNameField').append("<div class='row'></div>");
    $('#endNameField').append(newEndoName);

}

function addSingleName(obj) {
    //console.log(obj);
    let newLowName = "";
    // let emoji7 = "<i class='em em---1' aria-role='presentation' aria-label='thumbs up'></i>"
    let emoji7 = "<span aria-role='image' aria-label='thumbs up'>👍</span>"
    let emoji14 = "<span aria-role='image' aria-label='blowing kiss face'>😘</span>";
    let emoji21 = "<span aria-role='image' aria-label='muscle'>💪</span>";
    let emoji28 = "<span aria-role='image' aria-label='bullseye'>🎯</span>";
    let emoji35 = "<span aria-role='image' aria-label='fire'>🔥</span>";
    let emoji42 = "<span aria-role='image' aria-label='riasing hands'>🙌</span>";   
    let emoji49 = "<span aria-role='image' aria-label='star'>🌟</span>";
    let emoji56 = "<span aria-role='image' aria-label='star'>😍</span>";
    let emoji63 = "<span aria-role='image' aria-label='panda'>🐼</span>";

    if (obj["Streak"] == 7) {
        emoji14 = "";
        emoji21 = "";
        emoji28 = "";
        emoji35 = "";
        emoji42 = "";
        emoji49 = "";
        emoji56 = "";
        emoji63 = "";
    }
    else if (obj["Streak"] ==14) {
        emoji21 = "";
        emoji28 = "";
        emoji35 = "";
        emoji42 = "";
        emoji49 = "";
        emoji56 = "";
        emoji63 = "";
    }
    else if (obj["Streak"] == 21) {
        emoji28 = "";
        emoji35 = "";
        emoji42 = "";
        emoji49 = "";
        emoji56 = "";
        emoji63 = "";
    }
    else if (obj["Streak"] == 28) {
        emoji35 = "";
        emoji42 = "";
        emoji49 = "";
        emoji56 = "";
        emoji63 = "";
    }
    else if (obj["Streak"] == 35) {
        emoji42 = "";
        emoji49 = "";
        emoji56 = "";
        emoji63 = "";
    }
    else if (obj["Streak"] == 42) {
        emoji49 = "";
        emoji56 = "";
        emoji63 = "";
    }
    else if (obj["Streak"] == 49) {
        emoji56 = "";
        emoji63 = "";
    }
    else if (obj["Streak"] == 56) {
        emoji63 = "";
    }

    newLowName = "<h3 class='lowName'>" + obj["Name"] + " <span class='tribe'>(" + 
        obj["Tribe"] + ")</span> <span class='streak'>" + obj["Streak"] + " days<span></h3>";
    $('#lowNameField').append("<div class='row'></div>");
    $('#lowNameField').append(newLowName);
    // $('#lowNameField').append(emoji);
}

// function addNames() {
//     mainObject.forEach(doc => {
//         console.log(doc)
//         const newLowName = "<h3 class='lowName'>" + doc["Name"] + " <span class='tribe'>(" + doc["Tribe"] + ")</span> " + doc["Streak"] + " days" + "</h3>";
//         $('#lowNameField').append("<div class='row'></div>");
//         $('#lowNameField').append(newLowName);
//     })
// }

// function topNameAnimation() {
//     $('.topName').addClass('topNameAnimation');   
// }

$(document).ready(function () {
    // getNames();
    // getEndoNames();
    getTaxes();
    getOfficeLeader();
    getOfficeLeader2();
})
