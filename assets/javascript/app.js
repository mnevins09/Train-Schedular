
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC2RMmlzU2iHeIPZKXoNbl_p7KRqiUaZMo",
    authDomain: "train-schedular-14817.firebaseapp.com",
    databaseURL: "https://train-schedular-14817.firebaseio.com",
    projectId: "train-schedular-14817",
    storageBucket: "",
    messagingSenderId: "1004965763236"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// on click submit button
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = moment($("#train-time").val().trim(), "HH:mm").format("MMMM Do YYYY, h:mm:ss a");
    var trainFrequency = $("#frequency").val().trim();

    // object to hold train data that will be sent to database
    var newTrain = {
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: trainFrequency
    };

    // pushes train data to the database
    dataRef.ref().push(newTrain);

    // console log
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // resets html form
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
});
// add train to database and html
dataRef.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    // variables to store values
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(trainFrequency);
    
    // 
    var trainStart = moment(trainTime, "hh:mm").subtract(1, "years");;
    console.log(trainStart);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var difference = moment().diff(moment(trainStart), "minutes");
    console.log("Difference" + difference);


    // Time apart (timeRemaining)
    var timeRemaining = difference % trainFrequency;
    console.log(timeRemaining);

    // Minute Until Train
    var minutesAway = trainFrequency - timeRemaining;
    console.log("Minutes until next train" + minutesAway);

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("Arriving Time: " + moment(nextTrain).format("hh:mm"));
    
    // Add each train's data into the table
    $("tbody").append("<tr><td>" + trainName +
        "</td><td>" + destination +
        "</td><td>" + trainFrequency +
        "</td><td>" + moment(nextTrain).format("hh:mm") +
        "</td><td>" + minutesAway + "</td><td>");
});
