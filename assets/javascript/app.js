// Initialize Firebase
  var config = {
    apiKey: "AIzaSyADWG5OhU1WOSjS2gONyNJ442ntIgxxLNI",
    authDomain: "train-schedule-7bb7b.firebaseapp.com",
    databaseURL: "https://train-schedule-7bb7b.firebaseio.com",
    projectId: "train-schedule-7bb7b",
    storageBucket: "train-schedule-7bb7b.appspot.com",
    messagingSenderId: "623013463036"
  };
  firebase.initializeApp(config);

  var trainDatabase = firebase.database();

  $("#addNewTrain").on("click", function(){

  	var newTrainName = $("#newTrainName").val().trim();
  	var destination = $("#destination").val().trim();
	var unixTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequency").val().trim();  
	

	var newTrain = {
		name: newTrainName,
		destination: destination,
		firstTrainTime: unixTrainTime,
		frequency: frequency
	}

	trainDatabase.ref().push(newTrain);

	$("#newTrainForm").trigger("reset");

  });

  trainDatabase.ref().on("child_added", function(snapshot){

  	var trainName = snapshot.val().name;
  	var trainDestination = snapshot.val().destination;
  	var trainFrequency = snapshot.val().frequency;
  	var timeFirstTrain = snapshot.val().firstTrainTime;

  	var differenceTimes = moment().diff(moment.unix(timeFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(timeFirstTrain), "minutes") % trainFrequency ;
	var tMinutes = trainFrequency - tRemainder;

	var trainArrival = moment().add(tMinutes, "m").format("hh:mm A"); 


	$("#trains > tbody").append("<tr id='trainRow'><td>"+trainName+"</td><td>"+trainDestination+"</td><td>"+trainFrequency+"</td><td>"+trainArrival+"</td><td>"+tMinutes+"</td><td><button id='deleteButton'>x</button></td></tr>");


  });

 	$(document.body).on("click", "#deleteButton", function(){
 		$(this).closest('tr').remove();
 		

 	});
