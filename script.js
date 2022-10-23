(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let end = "AM"

            if (h > 12){
                h -= 12;
                end = "PM";
            }
            else if (h === 0){
                h = 12;
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s +" "+ end;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0.00 &euro;";
    let hind

    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let smart = document.getElementById("smart");
        let pdp = document.getElementById("pdp");
        let omniva = document.getElementById("omniva");
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname")

        hind = 0

        if (eesnimi.value.trim() === "") {
            
            alert("Palun sisestage eesnimi");
            eesnimi.focus();
            
            return;
            
            
        } if (hasNumbers(eesnimi.value.trim())) {
            
            alert("Eesnimi ei tohi sisaldada numbreid");
            eesnimi.focus();
            
            return;
            
            
        } if (hasNumbers(perenimi.value.trim())) {
            
            alert("Perenimi ei tohi sisaldada numbreid");
            perenimi.focus();
            
            return;
            
            
        } if (perenimi.value.trim() === "") {
            
            alert("Palun sisestage perekonnanimi");
            perenimi.focus();
            
            return;
            
            
        } if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus(); // kui see rida kustutada ei tehta "Valige linn" dropdown-menüüd aktiivseks
                          // peale "Palun valige linn nimekirjast" teadet.
            
            return;
            
            
        } if (!smart.checked && !pdp.checked && !omniva.checked) {
            
            alert("Palun valige pakiautomaat nimekirjast");
            
            return;
            
            
        } else {
            if (document.getElementById("v1").checked === true){
                hind += 5;
            }

            if (document.getElementById("v2").checked === true){
                hind += 1;
            }

            if (document.getElementById("linn").value === "trt" || document.getElementById("linn").value === "nrv"){
                hind += 2.5;
            }

            else if (document.getElementById("linn").value === "prn"){
                hind += 3;
            }

           hind = parseFloat(hind).toFixed(2);
            
            e.innerHTML = hind + " &euro;";

        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();


// Antud funktsioon on saadud järgnevast allikast (Esimene vastus):
// https://stackoverflow.com/questions/22100243/how-to-check-if-a-string-contains-a-number-in-javascript

function hasNumbers(t)
{
var regex = /\d/g;
return regex.test(t);
} 

// map

let mapAPIKey = "Ai694UEXGGYmB8KhQJJBHYhKXWKlpoK3CenFh3kfU7CWMxH62RUTADLqLbNNCRzR";

let map, infobox;

function GetMap() {
    "use strict";

    let uusKeskpunkt = new Microsoft.Maps.Location( //Paide
        58.88148,
        25.54902
    );

    let teinePunkt = new Microsoft.Maps.Location(
        59.43737,
        24.74531
    );

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    map = new Microsoft.Maps.Map("#map", {
                credentials: mapAPIKey,
                center: uusKeskpunkt,
                zoom: 7,
                mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
                disablePanning: true,
                backgroundColor: Microsoft.Maps.Color.fromHex('#42f560')
            });


    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    let pin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT',
            color: Microsoft.Maps.Color.fromHex('#a1029e')
        });

    let pin2 = new Microsoft.Maps.Pushpin(teinePunkt, {
        title: "Raekoja Plats",
        subTitle: "Vana koht",
        text: "RP",
        color: Microsoft.Maps.Color.fromHex('#fca503')
    })

    // Tekst võetud Vikipeediast: https://et.wikipedia.org/wiki/Tartu_%C3%9Clikool
    pin.metadata = {
        title: 'Tartu Ülikool',
        description: "Tartu Ülikool on vanim ja suurim Eestis tegutsev ülikool ning ühtlasi Baltimaade ainus ülikool, mis kuulub 1,2% maailma parimate sekka."
    };

    // Tekst võetud Vikipeediast: https://et.wikipedia.org/wiki/Raekoja_plats_(Tallinn)
    pin2.metadata = {
        title: 'Raekoja plats',
        description: "Raekoja plats on väljak Tallinna vanalinna südames, kus asub Tallinna raekoda. Raekoja plats on Tallinna vana keskpunkt, kus liituvad paljud tänavad."
    };

    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pin2, 'click', pushpinClicked);

    map.entities.push(pin);
    map.entities.push(pin2);
}

// Kood kuidas lisada infobox'se võetud siit: https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/infoboxes/infobox-when-pushpin-clicked

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

