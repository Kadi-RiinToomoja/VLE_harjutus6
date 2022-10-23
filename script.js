(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus(); // kui see rida kustutada ei tehta "Valige linn" dropdown-menüüd aktiivseks
                          // peale "Palun valige linn nimekirjast" teadet.
            
            return;
            
            
        } else {
            
            e.innerHTML = "x,xx &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AtdR_ZOiE1ssipGM0pr_9N2IXztfiTZDQrUt4swXVHNbie7LhUUsi4-gl0YsEixP";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
        disablePanning: true,
        backgroundColor: Microsoft.Maps.Color.fromHex('#42f560'),
        
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT',
            color: Microsoft.Maps.Color.fromHex('#a1029e'),
        });

    map.entities.push(pushpin);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

