/**
 * Created by thomasandersen on 25.04.2017.
 */
window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    //document.getElementById('here').innerHTML = data.name;
    initFirebase(data.index);
    //console.log("button nr: " + data.index + " was pressed");
};

function initFirebase(input) {

// Initialize Firebase
    var config = {
        apiKey: "AIzaSyD2CdhwM_8S-Qsqu_tm1LosivupKuCBJa0",
        authDomain: "pensum-5a0a9.firebaseapp.com",
        databaseURL: "https://pensum-5a0a9.firebaseio.com",
        storageBucket: "pensum-5a0a9.appspot.com",
        messagingSenderId: "278673024289"
    };
    firebase.initializeApp(config);

    // Get a database reference to our posts
    var db = firebase.database();
    var ref = db.ref("/" + input);

// Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        var t0 = performance.now();
        fillForm(data);
        var t1 = performance.now();
        console.log("Call to generate subjects took " + (t1 - t0) + " milliseconds.");
        //console.log(data);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function fillForm(data) {
    document.getElementById("subj-code").value = data.code;
    document.getElementById("subj-name").value = data.name;
    document.getElementById("subj-location").value = data.location;
}