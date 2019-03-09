
/*
 *  Ogame Bot
 *  Name: Obot
 *  Version: 1.0
 *  Author: Louis Bertrand
 *  Email: adressepro111@pylott.yt
 *  website: pylott.yt
 *
 *  Notice: DO NOT SHARE THE SCRIPT WITHOUT COMMENTS AND CREDITS
 */



var currentProtocol     = window.location.protocol,
    currentServerName   = window.location.hostname

// Function by developer.mozilla.org
// on https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
//
// USAGE: getRandomInt(max)
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Function by Louis Bertrand
//
// USAGE: dbug(value)
function dbug(value) {

    console.log(value)

}

// Function by Geoffrey Crofte
// on https://www.creativejuiz.fr/blog/javascript/recuperer-parametres-get-url-javascript
//
// Usage:   var $_GET = $_GET(),
//              name = $_GET['name'],
//              age = $_GET['age'];
function $_GET(link, param) {

    if (!link) {
        var vars = {};
        window.location.href.replace( location.hash, '' ).replace( 
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );
    
        if ( param ) {
            return vars[param] ? vars[param] : null;	
        }
        return vars;
    } else {

        var vars = {};
        link.replace( location.hash, '' ).replace( 
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );
    
        if ( param ) {
            return vars[param] ? vars[param] : null;	
        }
        return vars;

    }
}

// Function by KooiInc
// on https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
//
// USAGE: eventFire(element, 'click');
function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

// Function by Louis Bertrand
//
// USAGE: resources = getResource()
function getResource() {

    var metal         = parseInt(document.getElementById("resources_metal").innerHTML.replace(".", ""))
    var crystal       = parseInt(document.getElementById("resources_crystal").innerHTML.replace(".", ""))
    var deuterium     = parseInt(document.getElementById("resources_deuterium").innerHTML.replace(".", ""))
    var darkmatter    = parseInt(document.getElementById("resources_darkmatter").innerHTML.replace(".", ""))
    var energy        = parseInt(document.getElementById("resources_energy").innerHTML.replace(".", ""))

    var output = [metal, crystal, deuterium, energy, darkmatter]
    return output

}

function upgradeResourcesAction(whatToUpgrade, actualPage){

    if (actualPage != "resources") {

        window.location = currentProtocol+"//"+currentServerName+"/game/index.php?page=resources"

    } else {

        buttonIds = ["#button1", "#button2", "#button3", "#button4"]

        // console.log(buttonIds[whatToUpgrade]+" a.fastBuild")
        updateAvailable = document.querySelector(buttonIds[whatToUpgrade]+" a.fastBuild")
        if (updateAvailable != null) {

            eventFire(updateAvailable, 'click')

        } else {

            dbug("You can't update this type of ressource")
            dbug("We will wait a bit")



            redirect = setInterval(() => {
                window.location.href = currentProtocol+"//"+currentServerName+"/game/index.php?page=resources&OBOTACTION=waiting"
                clearInterval(redirect)
            }, 10000);

        }

    }

}

// Function by Louis Bertrand
//
// USAGE: upgradeResourcesDetermine((ARRAY) resources, actualPage)
function upgradeResourcesDetermine(resources, actualPage) {

    console.log(metal)

    if (resources[3] <= 10) {

        upgradeResourcesAction(3, actualPage)

    } else {

        if (Math.min(resources[0], resources[1], resources[2]) == metal) {

            console.log("updating metal")
            upgradeResourcesAction(0, actualPage)

        } else {

            if (Math.min(resources[0], resources[1], resources[2]) == crystal) {
    
                console.log("updating crystal")
                upgradeResourcesAction(1, actualPage)
    
            } else {

                if (Math.min(resources[0], resources[1], resources[2]) == deuterium) {
    
                    console.log("updating deuterium")
                    upgradeResourcesAction(2, actualPage)

                } else {

                    console.log("updating energy")
                    upgradeResourcesAction(3, actualPage)

                }
    
            }

        }
    }

}

var $_GETvalues = $_GET();
actualPage = $_GETvalues["page"]
actualAction = $_GETvalues["OBOTACTION"]

console.log("Actual Page: "+actualPage)

// Resource Acquisition
resources = getResource()

metal = resources[0]
crystal = resources[1]
deuterium = resources[2]
energy = resources[3]
darkmatter = resources[4]
// End of Resource Acquisition


console.log("metal resources: "+metal)
console.log("crystal resources: "+crystal)
console.log("deuterium resources: "+deuterium)
console.log("darkmatter resources: "+darkmatter)
console.log("energy resources: "+energy)

if(actualPage == "resources"){

    console.log("starting Ressource Upgrade ...")

    if (typeof actualAction == 'undefined') {

        console.log(document.referrer)

        if (document.referrer.includes("OBOTACTION")) {

            var $_previousget = $_GET(document.referrer)
            var previousAction = $_previousget["OBOTACTION"]

            dbug(previousAction)

            if (previousAction == "waiting") {

                redirect = setInterval(() => {
                    window.location.href = currentProtocol+"//"+currentServerName+"/game/index.php?page=resources&OBOTACTION=updating"
                    clearInterval(redirect)
                }, 1000);

            }

            if (previousAction == "updating") {

                redirect = setInterval(() => {
                    window.location.href = currentProtocol+"//"+currentServerName+"/game/index.php?page=resources&OBOTACTION=waiting"
                    clearInterval(redirect)
                }, 1000);

            }

        } else {

            redirect = setInterval(() => {
                window.location.href = currentProtocol+"//"+currentServerName+"/game/index.php?page=resources&OBOTACTION=waiting"
                clearInterval(redirect)
            }, 1000);

        }

    }

    if (actualAction == "waiting") {

        upgradeResourcesDetermine(resources, actualPage)

    }

}
