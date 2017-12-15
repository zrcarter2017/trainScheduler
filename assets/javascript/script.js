
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

  // select user inputs
  var trainName = $("#trainName").val().trim();
  var trainDestination = $("#trainDestination").val().trim();
  var trainTime = moment($("#firstTime").val().trim(), "HH:mm");
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


    //subtract day so difference is not negative
    var firstTime = moment(trainTime, "HH:mm").subtract(1, "days");
    // Current Time
    var currentTime = moment();
    // Difference between first train to current time
    var currentDeltaFromStart = moment().diff(moment(firstTime), "minutes");
    // remainder
    var remainder = currentDeltaFromStart % trainFrequency;
    var minutesTilArrival = trainFrequency - remainder;
    // Next Train
    var nextTrain = moment().add(minutesTilArrival, "minutes");
    var nextTrainTime = moment(nextTrain).format("HH:mm");



    console.log("minutesTilArrival: " + minutesTilArrival);
    console.log("arrival: " + moment(nextTrain).format("HH:mm"));
    console.log("firstTrain: " + firstTime);
    console.log("current: " + moment(currentTime).format("HH:mm"));
    console.log("difference: " + currentDeltaFromStart);
    console.log("remainder: " + remainder);
    console.log("frequency: " + trainFrequency);


  // display train data
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrainTime + "</td><td>" + minutesTilArrival);
});

