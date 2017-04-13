(function() {
    "use strict";

    App.Tests.TimerTests = function(Timer) {
        var params = {
            /* in miliseconds */
            duration: 15000,

            /* in miliseconds */
            step: 1000
        };

        var timer = new Timer(params);

        /* on(eventName, listener) - assigns listener to given eventName ("start", "pause", "tick", "end") */

        /* triggered when timer is started */
        timer.on("start", function(currentStep) {
            console.log("started at: " + currentStep);
        });

        /* triggered when timer finishes or has been stopped */
        timer.on("end", function(currentStep) {
            console.log("ended at: " + currentStep);
        });

        /* triggered when timer is paused */
        timer.on("pause", function(currentStep) {
            console.log("paused at: " + currentStep);
        });

        /* triggers every step seconds */
        timer.on("tick", function(currentStep) {
            console.log("current time: " + currentStep);
        });

        /* start() - starts timer */
        timer.start();

        /* pause() - pauses timer */
        setTimeout(function() {
            timer.pause();
        }, 5000);

        /* resumes timer */
        setTimeout(function() {
            timer.start();
        }, 8000);

        /* stop() - stops timer */
        setTimeout(function() {
            timer.stop();
        }, 10000);

        /* start again from currentStep == 0 */
        setTimeout(function() {
            timer.start();
        }, 13000);
    };
})();
