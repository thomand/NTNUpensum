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
    var ref = db.ref("/testing/");

// Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        insert(data);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function insert(data) {
    for (var element in data) {
        var entry = data[element];
        makeSubjectCard(entry);
    }

}

function makeSubjectCard(data) {
    var div = document.createElement("div");
    div.className = "col s12 m4 l4";
        var card = document.createElement("div");
        card.className = "card";
            var cardImage = document.createElement("div");
            cardImage.className = "card-image waves-effect waves-block waves-light activator";
                var code = document.createElement("h2");
                code.style.textAlign = "center";
                code.textContent = data.code;
                code.style.textTransform = "uppercase";
                var title = document.createElement("h4");
                title.style.textAlign = "center";
                title.textContent = data.name;
            var cardContent = document.createElement("div");
            cardContent.className = "card-content";
                var span = document.createElement("span");
                span.className = "card-title activator grey-text text-darken-4";
                span.textContent = 'Vis pensum';
                    var i1 = document.createElement("i");
                    i1.className = "mdi-navigation-more-vert right";
                    span.appendChild(i1);
                var p = document.createElement("p");
                var a = document.createElement("a");
                a.href = "#";
                a.textContent = "Emneside";
            var cardReveal = document.createElement("div");
            cardReveal.className = "card-reveal";
                var span2 = document.createElement("span");
                span2.className = "card-title grey-text text-darken-4";
                span2.textContent = 'Pensum';
                    var i2 = document.createElement("i");
                    i2.className = "mdi-navigation-close right";
                    span2.appendChild(i2);
                var bookTitle = document.createElement("h5");
                bookTitle.textContent = data.books.title;
                var bookDesc = document.createElement("p");
                bookDesc.textContent = data.books.desc;
            cardReveal.appendChild(span2);
            cardReveal.appendChild(bookTitle);
            cardReveal.appendChild(bookDesc);
            p.appendChild(a);
            cardContent.appendChild(span);
            cardContent.appendChild(p);
            cardImage.appendChild(code);
            cardImage.appendChild(title);
        card.appendChild(cardImage);
        card.appendChild(cardContent);
        card.appendChild(cardReveal);
    div.appendChild(card);
    document.getElementById("card-container-row").appendChild(div);
}

