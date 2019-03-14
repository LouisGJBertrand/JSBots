
/**
 * TWUTILITY (Twitter Utility)
 * Developped by Louis Bertrand
 * Original Git: https://github.com/PYLOTT/JSBots/twitter
 * 
 * HOW TO USE:
 * COPY THE SCRIPT AND PASTE IT IN A USER JS PLUGIN
 * OPEN THE CONSOLE
 * ASK FOR A FUNCTION
 */


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

function unTweetAction() {

    setTimeout( () => {

        e = document.querySelector("li.js-actionDelete button")
        if (e != null) {
            eventFire(e, "click")
            setTimeout( () => {

                e = document.querySelector("button.delete-action")
                if (e != null) {
                    eventFire(e, "click")
                }

            }, 500)
        }

    }, 500)

}

function unTweetTimeout(max, i) {

    console.log(i)
    if (max > 0) {

        if (i < max) {

            console.log("infinite loop!")
            unTweetAction()
            i++

        } else {

            return

        }

    } else {

        console.log("infinite loop!")
        unTweetAction()

    }

}

function unTweetHandler(max) {

    if (typeof max != "undefined") {

        

    }

    var i = 0;
    var unTweetInterval = setInterval(unTweetTimeout(max, i), 2000)
    return "The Interval ID is :"+unTweetInterval

}

function unTweetStop(unTweetInterval) {

    clearInterval(unTweetInterval)

}