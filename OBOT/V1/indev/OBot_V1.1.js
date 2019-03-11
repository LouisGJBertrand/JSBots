
/*
 *  Ogame Bot
 *  Name: Obot
 *  Version: 1.1
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
    var darkmatter    = parseInt(document.querySelector("#resources_darkmatter").innerHTML.replace('.', ''))
    var energy        = parseInt(document.querySelector("#resources_energy").innerHTML.replace('.', ''))

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

function upgradeResourcesAction(whatToUpgrade, actualPage, actualAction){

    if (actualPage != "resources" && actualAction != "updating") {

        window.location = UrlBase+"/game/index.php?page=resources"

    } else {

        buttonIds = ["#button1", "#button2", "#button3", "#button4"]

        // console.log(buttonIds[whatToUpgrade]+" a.fastBuild")
        updateAvailable = document.querySelector(buttonIds[whatToUpgrade]+" a.fastBuild")
        if (updateAvailable != null) {

            eventFire(updateAvailable, 'click')

        } else {

            dbug("You can't update this type of resource")
            dbug("We will wait a bit ...")
            pageRedirectorTimer(10000, "overview", "waiting")

        }

    }

}

// Function by Louis Bertrand
//
// USAGE: upgradeResourcesDetermine((ARRAY) resources, actualPage)
function upgradeResourcesDetermine(resources, maxresource, actualPage) {

    if(resources[0] == maxresource[0]){

        console.log("updating metal container")
        pageRedirector("station", "update", "OBotUpdate", "metal")

    } else {
        if(resources[1] == maxresource[1]){

            console.log("updating crystal container")
            pageRedirector("station", "update", "OBotUpdate", "crystal")

        } else {
            if(resources[2] == maxresource[2]){

                console.log("updating deuterium container")
                pageRedirector("station", "update", "OBotUpdate", "deuterium")

            }
        }
    }

    if (resources[3] <= 10) {

        pageRedirector("resources", "update", "OBotUpdate", "energy")

    } else {

        if (Math.min(resources[0], resources[1], resources[2]) == resources[0]) {

            console.log("updating metal")
            pageRedirector("resources", "update", "OBotUpdate", "metal")

        } else {

            if (Math.min(resources[0], resources[1], resources[2]) == resources[1]) {
    
                console.log("updating crystal")
                pageRedirector("resources", "update", "OBotUpdate", "crystal")

    
            } else {

                if (Math.min(resources[0], resources[1], resources[2]) == resources[2]) {
    
                    console.log("updating deuterium")
                    pageRedirector("resources", "update", "OBotUpdate", "deuterium")

                } else {

                    console.log("updating energy")
                    pageRedirector("resources", "update", "OBotUpdate", "energy")

                }
    
            }

        }
    }

}

// Function By Louis Bertrand
//
// Usage: previousLinkAnalyser()
function previousLinkAnalyser() {

    if (document.referrer.includes(UrlBase)) {

        if (document.referrer.includes("OBotAction")) {

            var $_previousget = $_GET(document.referrer)
            return $_previousget

        } else {

            return { "noAction" : true }

        }

    } else {

        return { "noAction" : true }

    }

}


// Function by Louis Bertrand
//
// USAGE: pageRedirector(pageTo, action, paramKey, paramValue)
function pageRedirector(pageTo, action, paramKey, paramValue){

    if (typeof paramKey != "undefined") {
        params = "&"+paramKey+"="+paramValue
    } else {
        params = ""
    }

    url = UrlBase+"/game/index.php?page="+pageTo+"&OBotAction="+action+params
    redirect = setInterval(() => {
        window.location.href = url
        clearInterval(redirect)
    }, 1000);

}

// Function by Louis Bertrand
//
// USAGE: pageRedirector(pageTo, action, paramKey, paramValue)
function pageRedirectorTimer(timer, pageTo, action, paramKey, paramValue){

    if (typeof paramKey != "undefined") {
        params = "&"+paramKey+"="+paramValue
    } else {
        params = ""
    }

    url = UrlBase+"/game/index.php?page="+pageTo+"&OBotAction="+action+params
    redirect = setInterval(() => {
        window.location.href = url
        clearInterval(redirect)
    }, timer);

}


// Function by Louis Bertrand
//
// USAGE: actionDecider(actualPage, actualAction, AvailableResources, ResourcesLimit)
function actionDecider(actualPage, actualAction, AvailableResources, ResourcesLimit) {

    var previousLink = previousLinkAnalyser()

    if(previousLink["noAction"] == true){

        pageRedirector("overview", "waiting")

    } else {

        if (actualAction == "none" || typeof actualAction == "undefined") {

            // redirect to the correct action
            if(previousLink["OBotAction"] == "update"){

                pageRedirector(actualPage, "updating")

            } else {

                if(previousLink["OBotAction"] == "updating"){

                    pageRedirector(actualPage, "waiting")

                } else {

                        pageRedirector("overview", "waiting")

                }

            }

        } else {

            console.log("action executor on ...")
            // execute the action
            if (actualAction == "waiting") {

                if (actualPage != "overview") {

                    console.log("redirecting")
                    pageRedirector("overview", "waiting")

                } else {

                    console.log("starting updation")
                    upgradeResourcesDetermine(AvailableResources, ResourcesLimit, actualPage)

                }

            } else {

                if (actualAction == "update") {

                    updations = { "metal" : 0 , "crystal" : 1, "deuterium" : 2, "energy" : 3}

                    var $_GETvalues = $_GET();
                    var toUpdate = $_GETvalues["OBotUpdate"]
                    upgradeResourcesAction(updations[toUpdate], actualPage, actualAction)

                }

            }


        }

    }

}

globalTimer = setTimeout(() => {

    var $_GETvalues = $_GET();
    actualPage = $_GETvalues["page"]
    actualAction = $_GETvalues["OBotAction"]

    if (typeof actualAction == undefined) {
        actualAction = "none"
    }

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

    actionDecider(actualPage, actualAction, AvailableResources, ResourcesLimit)

}, 1000)

