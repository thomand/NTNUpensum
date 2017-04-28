/**
 * Created by thomasandersen on 25.04.2017.
 */
$(document).ready(function () {
    var data = init();
});

function init() {

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
    var ref = db.ref("/");

// Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        var t0 = performance.now();
        insert(data);
        var t1 = performance.now();
        console.log("Call to generate subjects took " + (t1 - t0) + " milliseconds.");
        //console.log(data);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function insert(data) {
    for (var element in data) {
        var entry = data[element];
        makeSubjectCard(entry, element);
    }

}

function makeSubjectCard(data, index) {
    /*Make the overall card everything is put inside*/
    var card = document.createElement("div"); card.className = "card";
    /*Make the card-image*/
    var cardImage = document.createElement("div"); cardImage.className = "card-image waves-effect waves-block waves-light";
    /*Make the five columns for subject information*/
    var cols2 = "col s2"; var cols3 = "col s3"; var cols6 = "col s6"; var cols1 = "col s1";
    var first = document.createElement("div"); first.className = cols2;
    var second = document.createElement("div"); second.className = cols6;
    var forth = document.createElement("div"); forth.className = cols3;
    var fifth = document.createElement("div"); fifth.className = cols1 + "fixed-action-btn";
    /*Make the five H5 containers that hold the subject information*/
    var h5Class = "text_h2";
    var h5_1 = document.createElement("h5"), h5_2 = document.createElement("h5"), h5_4 = document.createElement("h5");
    h5_1.className = h5Class; h5_2.className = h5Class; h5_4.className = h5Class;
    h5_1.textContent = data.code;
    h5_2.textContent = data.name;
    /*h5_3.textContent = data.lecturer;*/
    h5_4.textContent = data.location;
    /*Generate edit button*/
    a = document.createElement("a"); a.className = "btn-floating btn-large red";
    a.style.position = "relative"; a.style.top = "50%"; a.style.transform = "translateY(25%)";
    i = document.createElement("i"); i.className = "large material-icons"; i.textContent = "mode_edit";
    a.appendChild(i);
    /*Connect all elements*/
    first.appendChild(h5_1);
    second.appendChild(h5_2);
    /*third.appendChild(h5_3);*/
    forth.appendChild(h5_4);
    fifth.appendChild(a);
    /*Add eventListener to edit button*/
    fifth.addEventListener("click", function(){
        console.log("button nr: " + index + " clicked");
        document.location.href = "staffEdit.html?index=" + encodeURIComponent(index);
    });
    cardImage.appendChild(first); cardImage.appendChild(second); /*cardImage.appendChild(third); */cardImage.appendChild(forth); cardImage.appendChild(fifth);
    /*Add the card-image to the card*/
    card.appendChild(cardImage);
    /*Add the index of the data to a hidden div to the card*/
    var index_ = document.createElement("div");
    index_.className = "index";
    index_.textContent = index;
    index_.style.display = "none";
    card.appendChild(index_);
    card.style.display = "none";
    card.id = "card_" + index;
    /*Add the card to the cardContainer*/
    document.getElementById("cardContainer").appendChild(card);


}

function gid(a_id) {
    return document.getElementById(a_id);
}

function close_all() {

    for (i = 0; i <= 999; i++) {
        var o = gid("card_" + i);
        if (o) {
            o.style.display = "none";
        }
    }

}

function find_my_div() {
    close_all();
    var o_edit = gid("search");
    var str_needle = o_edit.value;
    str_needle = str_needle.toUpperCase();
    var searchStrings = str_needle.split(/\W/);
    count = 0;
    for (var i = 0, len = searchStrings.length; i < len; i++) {
        var currentSearch = searchStrings[i].toUpperCase();
        if (currentSearch !== "") {
            gid("navWrap").style.display = "block";
            nameDivs = document.getElementsByClassName("card");
            for (var j = 0, divsLen = nameDivs.length; j < divsLen; j++) {
                if (nameDivs[j].textContent.toUpperCase().indexOf(currentSearch) !== -1) {
                    nameDivs[j].style.display = "block";
                    count ++;
                }
            }
        }
        else {
            gid("navWrap").style.display = "none";
        }
    }
    gid("searchHeader").textContent = "Søkeresultater (" + count + ")";
}

$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});
