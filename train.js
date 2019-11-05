//Firebase Config- created new DB for hw called trainSchedule
var firebaseConfig = {
    apiKey: "AIzaSyCD734eENmcJMGWhMGqtb45ZEOuibM2faA",
    authDomain: "trainschedule-dd8fd.firebaseapp.com",
    databaseURL: "https://trainschedule-dd8fd.firebaseio.com",
    projectId: "trainschedule-dd8fd",
    storageBucket: "trainschedule-dd8fd.appspot.com",
    messagingSenderId: "894412906653",
    appId: "1:894412906653:web:fe10d7a2fa427412007474"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Global database variable
const database = firebase.database();

$("#add-train-btn").click(function () {
    event.preventDefault();
    let trainName = $("#train-name-input").val().trim();
    let destName = $("#destination-input").val().trim();
    let trainStart = $("#start-input").val().trim();
    let trainRate = $("#rate-input").val().trim();
    //create object for each employee 
    const newTrain = {
        name: trainName,
        destination: destName,
        start: trainStart,
        rate: trainRate,

    };
    database.ref("/userInput").push(newTrain)

    //Clearing the inputs
    $("#trainNameForm").val("");
    $("#destinationForm").val("");
    $("#trainTimeForm").val("");
    $("#frequencyForm").val("");
});
let currentTime = moment().format();

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    let trainName = childSnapshot.val().train;
    let trainDestination = childSnapshot.val().destination;
    let trainTime = childSnapshot.val().first;
    let trainFrequency = childSnapshot.val().frequency;

    //Variable to figure out the converted train time
    let trainTimeConverted = moment(trainTime, "HH:mm");

    //Declaring a time difference variable
    const timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    console.log(timeDifference);

    const frequencyMinutes = childSnapshot.val().frequency;
    console.log("Frequency Minutes: " + frequencyMinutes);

    const minutesAway = Math.abs(timeDifference % frequencyMinutes);
    console.log("Minutes Away: " + minutesAway);

    const nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
    console.log("Next Arrival: " + nextArrival);

    //Adding into the table
    $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
//Next steps
//gobally on value - 
//pull the DB values into the HTML tables 
//for each or object.key loop into the html table