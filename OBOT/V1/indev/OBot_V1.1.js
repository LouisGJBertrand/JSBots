
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
    UrlBase             = currentProtocol+"//"+currentServerName

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
// Adapted by Louis Bertrand
//
// Usage:   var $_GET = $_GET(<link>),
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
function getResourceAvailable() {

    var metal         = resourceTickerMetal["available"]
    var crystal       = resourceTickerCrystal["available"]
    var deuterium     = resourceTickerDeuterium["available"]
    var darkmatter    = darkmatter
    var energy        = energy

    var output = [metal, crystal, deuterium, energy, darkmatter]
    return output

}

// Function by Louis Bertrand
//
// USAGE: resources = getResource()
function getResourceLimit() {

    var metal         = resourceTickerMetal["limit"]
    var crystal       = resourceTickerCrystal["limit"]
    var deuterium     = resourceTickerDeuterium["limit"]

    var output = [metal, crystal, deuterium]
    return output

}

function upgradeResourcesAction(whatToUpgrade, actualPage){

    if (actualPage != "resources") {

        window.location = UrlBase+"/game/index.php?page=resources"

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
                window.location.href = UrlBase+"/game/index.php?page=resources&OBOTACTION=waiting"
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
AvailableResources = getResourceAvailable()
ResourcesLimit = getResourceLimit()

metal = AvailableResources[0]
crystal = AvailableResources[1]
deuterium = AvailableResources[2]
energy = AvailableResources[3]
darkmatter = AvailableResources[4]

metalLimit = ResourcesLimit[0]
crystalLimit = ResourcesLimit[1]
deuteriumLimit = ResourcesLimit[2]
// End of Resource Acquisition


console.log("metal resources: "+metal)
console.log("max metal: "+metalLimit)
console.log("crystal resources: "+crystal)
console.log("crystal metal: "+crystalLimit)
console.log("deuterium resources: "+deuterium)
console.log("deuterium metal: "+deuteriumLimit)
console.log("darkmatter resources: "+darkmatter)
console.log("energy resources: "+energy)



// How to redirect:

// redirect = setInterval(() => {
//     window.location.href = UrlBase+"/game/index.php?page=resources&OBotAction=updating"
//     clearInterval(redirect)
// }, 1000);

// OBOT Url encoding:
// <UrlBase>/game/index.php?page=<page>&OBotAction=<action>+params

function actionDecider(actualPage, AvailableResources, ResourcesLimit) {
    
}
