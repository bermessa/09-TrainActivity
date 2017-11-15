/* global firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQhTI5eSew7NONR2TwcAAHElC-GYXnNNw",
    authDomain: "train-exercise.firebaseapp.com",
    databaseURL: "https://train-exercise.firebaseio.com",
    projectId: "train-exercise",
    storageBucket: "train-exercise.appspot.com",
    messagingSenderId: "689801443754"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submitButton").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var trainTime = $("#train-time").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        trainTime: trainTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#train-time").val("");

});


database.ref().on("child_added", function(snapshot) {

    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var trainTime = snapshot.val().trainTime;

    // var frequencyFormatted = moment.unix(frequency).format("mm");
    var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minAway = frequency - tRemainder;
    var nextArrival = moment().add(minAway, "minutes").format("hh:mm");


    $("#trainList").append(
        "<tr><td>" + trainName + "</td>" +
        "<td>" + destination + "</td>" +
        "<td>" + frequency + "</td>" +
        "<td>" + nextArrival + "</td>" +
        "<td>" + minAway + "</td></tr>"
    );

});
