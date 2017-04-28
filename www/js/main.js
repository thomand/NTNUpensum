/**
 * Created by thomasandersen on 02.11.2016.
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
        var cardImage = document.createElement("div"); cardImage.className = "card-image waves-effect waves-block waves-light activator";
            /*Make the five columns for subject information*/
            var cols2 = "col s2 activator"; var cols3 = "col s3 activator"; var cols6 = "col s6 activator";
            var first = document.createElement("div"); first.className = cols2;
            var second = document.createElement("div"); second.className = cols6;
            /*var third = document.createElement("div"); third.className = cols3;*/
            var forth = document.createElement("div"); forth.className = cols2;
            var fifth = document.createElement("div"); fifth.className = cols2;
            /*Make the five H5 containers that hold the subject information*/
            var h5Class = "text_h2 activator";
            var h5_1 = document.createElement("h5"), h5_2 = document.createElement("h5"), /* h5_3 = document.createElement("h5"), */h5_4 = document.createElement("h5"), h5_5 = document.createElement("h5");
            h5_1.className = h5Class; h5_2.className = h5Class; /*h5_3.className = h5Class;*/ h5_4.className = h5Class; h5_5.className = h5Class;
            h5_1.textContent = data.code;
            h5_2.textContent = data.name;
            /*h5_3.textContent = data.lecturer;*/
            h5_4.textContent = data.location;
            h5_5.textContent = "Tekniske fag";
            /*Connect all elements*/
            first.appendChild(h5_1);
            second.appendChild(h5_2);
            /*third.appendChild(h5_3);*/
            forth.appendChild(h5_4);
            fifth.appendChild(h5_5);
            cardImage.appendChild(first); cardImage.appendChild(second); /*cardImage.appendChild(third); */cardImage.appendChild(forth); cardImage.appendChild(fifth);
            /*Add the card-image to the card*/
            card.appendChild(cardImage);
            card.addEventListener("click", function(){
                makeSubjectInfo(card, data);

            });
            /*Add the index of the data to a hidden div to the card*/
            var index_ = document.createElement("div");
            index_.className = "index";
            index_.textContent = index;
            index_.style.display = "none";
            card.appendChild(index_);
            card.id = "card_" + index;
            card.style.display = "none";
            /*Add the card to the cardContainer*/
            document.getElementById("cardContainer").appendChild(card);

}

function makeSubjectInfo(card, data) {
    /*Make the card-reveal -> The information about the subject*/
    var cardReveal = document.createElement("div"); cardReveal.className = "card-reveal";
    /*Header information and navigation similar for all subjects*/
    var span = document.createElement("span");
    span.className = "card-title grey-text text-darken-4";
    span.textContent = data.code + " " + data.name;
    var i = document.createElement("i"); i.className = "mdi-navigation-close right";
    span.appendChild(i);
    /*Generate and add Lecturer */
    var lecturer = document.createElement("h6"); lecturer.textContent = "Foreleser: " + data.lecturer;
    lecturer.style.color = "#222";

    /*Book information -> Should be a loop of all books*/
    bookTitle = document.createElement("h6"); bookTitle.textContent = "Adams og Essexs: Calculus, eighth edition.";
    bookInfo = document.createElement("p"); bookInfo.textContent = "Boken kan kjøpes i en spesiell tobinds paperbackutgave (ISBN ADAMS Custom 9781783650989) på akademika. Det spiller ingen rolle om dere kjøper spesialutgaven eller den originale utgaven. (Den eneste forskjellen er at spesialutgaven er delt i to bind)."
    /*Add everything to the book information div -> cardReveal*/
    cardReveal.appendChild(span);
    cardReveal.appendChild(lecturer);
    cardReveal.appendChild(bookTitle);
    cardReveal.appendChild(bookInfo);
    /*Add the card-reveal to the card*/
    card.appendChild(cardReveal);
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
    gid("navWrap").style.display = "block";
    var o_edit = gid("search");
    var str_needle = o_edit.value;
    str_needle = str_needle.toUpperCase();
    var searchStrings = str_needle.split(/\W/);
    count = 0;
    for (var i = 0, len = searchStrings.length; i < len; i++) {
        var currentSearch = searchStrings[i].toUpperCase();
        if (currentSearch !== "") {
            nameDivs = document.getElementsByClassName("card");
            for (var j = 0, divsLen = nameDivs.length; j < divsLen; j++) {
                if (nameDivs[j].textContent.toUpperCase().indexOf(currentSearch) !== -1) {
                    nameDivs[j].style.display = "block";
                    count ++;
                }
            }
        }
    }
    gid("searchHeader").textContent = "Søkeresultater (" + count + ")";
}


