 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAMGcPbgY1latfeaFjjXiDH_IrUubwJl1g",
    authDomain: "train-schedule-ec94f.firebaseapp.com",
    databaseURL: "https://train-schedule-ec94f.firebaseio.com",
    projectId: "train-schedule-ec94f",
    storageBucket: "train-schedule-ec94f.appspot.com",
    messagingSenderId: "436806820135",
    appId: "1:436806820135:web:ac898e4f8e93d883184902"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $(document).ready(function() {
  $("#submit-train").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    
    var destination = $("#dest").val().trim();

    var timeTrain = $("#time-train").val().trim();

    var frecuencyTrain =  $("#frequency-train").val().trim();
    
    database.ref().push({
      trainName: trainName,
      destination: destination,
      timeTrain: timeTrain,
      frecuencyTrain: frecuencyTrain
    });

    alert("Train Succefully Added");
    $("#train-name").val("");
    $("#dest").val("");
    $("#time-train").val("");
    $("#frequency-train").val("");

 
  });



 
  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    // Console.loging the last user's data
    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.timeTrain);
    console.log(sv.frecuencyTrain);

 

   //var frecuency = sv.frecuency;
   var firstTime = sv.timeTrain;

   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

   console.log(firstTimeConverted);

   var currentTime = moment();

   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % sv.frecuencyTrain;

    console.log(tRemainder);


    var tMinutesTillTrain = sv.frecuencyTrain - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var displayTrain = $("<tr>");

    displayTrain.append("<th scope='col'>" + sv.trainName +"</th>");

    displayTrain.append("<th scope='col'>" + sv.destination +"</th>");

    displayTrain.append("<th scope='col'>" + sv.frecuencyTrain +"</th>");

    displayTrain.append("<th scope='col'>" + moment(nextTrain).format("hh:mm")+"</th>");

    displayTrain.append("<th scope='col'>" + tMinutesTillTrain +"</th>");

    $("#display-train").append(displayTrain);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


})
