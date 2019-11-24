$(document).ready(function () {

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

    //variables 
    let trainName;
    let destName;
    let trainStart;
    let trainRate = 0;

    //on click function
    $("#add-train-btn").click(function () {
        event.preventDefault();
        let trainName = $("#train-name-input").val().trim();
        let destName = $("#destination-input").val().trim();
        let trainStart = $("#start-input").val().trim();
        let trainRate = $("#rate-input").val().trim();
        //push entered values to DB
        database.ref("userInput").push({

            trainName: trainName,
            destName: destName,
            trainStart: trainStart,
            trainRate: trainRate,
        });
        $("form")[0].reset();
    });

    database.ref("userInput").on("child_added", function (childSnapshot) {
        let nextArr;
        // let minAway;
        // Change year so first train comes before now
        let trainStartNew = moment(childSnapshot.val().trainStart, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrain
        let diffTime = moment().diff(moment(trainStartNew), "minutes");
        let remainder = diffTime % childSnapshot.val().trainRate;
        // Minutes until next train
        let minAway = childSnapshot.val().trainRate - remainder;
        // Next train time
        let nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#add-row").append(
            "<tr><td>" + childSnapshot.val().trainName +
            "</td><td>" + childSnapshot.val().destName +
            "</td><td>" + childSnapshot.val().trainRate +
            "</td><td>" + nextTrain +
            "</td><td>" + minAway +
            "</td></tr>");

    });
});