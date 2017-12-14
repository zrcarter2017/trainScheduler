
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBygY_WN5Yp8skc0KvyWGOOfOut1vE6Ulw",
    authDomain: "trainscheduler-d4093.firebaseapp.com",
    databaseURL: "https://trainscheduler-d4093.firebaseio.com",
    projectId: "trainscheduler-d4093",
    storageBucket: "trainscheduler-d4093.appspot.com",
    messagingSenderId: "873092842612"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// add on click listener to add train to database and table
$("#addTrain").on("click", function(event) {
  event.preventDefault();
console.log('hi');

  // select user inputs
  var trainName = $("#trainName").val().trim();
  var trainDestination = $("#trainDestination").val().trim();
  var trainTime = moment($("#firstTime").val().trim(), "hh:mm").format('X');
  var trainFrequency = $("#frequency").val().trim();

  // create train object
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  // push instance of data to database
  database.ref().push(newTrain);

  // Alert success
  alert("Train successfully added");

  // Clears text-boxes
  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#firstTime").val("");
  $("#frequency").val("");
});

// get data from database to display
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Store data to variables
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;


    // subtract year to be before current time
    var firstTime = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(firstTime);

    // Current Time in military time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between first train to current time
    var currentDeltaFromStart = moment().diff(moment(firstTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + currentDeltaFromStart);

    // Time apart (remainder)
    var remainder = currentDeltaFromStart % trainFrequency;
    console.log(remainder);

    var minutesTilArrival = trainFrequency - remainder;

    // Next Train
    var nextTrain = moment().add(minutesTilArrival, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainTime = moment(nextTrain).format("hh:mm");


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrainTime + "</td><td>" + minutesTilArrival);
});

