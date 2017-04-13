(function() {
    "use strict";

    function getEventsRunner(events, eventContext, eventArgs) {
        return function() {
            var ctx = eventContext || this,
                args = eventArgs || [];

            for (var key in events) {
                events[key].apply(ctx, args);
            }
        };
    }

    App.Models.Timer = function(parameters) {
        this.params = {
            duration: parameters.duration || 10000,
            step: parameters.step || 2000
        };

        this.events = {
            'start': [],
            'end': [],
            'pause': [],
            'tick': []
        };

        this.timeIds = {
            'end': undefined,
            'tick': undefined
        };

        this.currentStep = 0;
    };

    App.Models.Timer.prototype.start = function() {
        var self = this;

        function start() {
            getEventsRunner(
                self.events.start, self, [self.currentStep])();
        }

        function tick() {
            self.currentStep += self.params.step;

            getEventsRunner(
                self.events.tick, self, [self.currentStep])();
        }

        function end() {
            clearTimeout(self.timeIds.tick);

            getEventsRunner(
                self.events.end, self, [self.currentStep])();

            self.currentStep = 0;
        }

        start();

        self.timeIds.tick = setInterval(
            tick, self.params.step);

        self.timeIds.end = setTimeout(
            end, self.params.duration);
    };

    App.Models.Timer.prototype.stop = function() {
        clearInterval(this.timeIds.tick);
        clearTimeout(this.timeIds.end);

        getEventsRunner(
            this.events.end, this, [this.currentStep])();

        this.currentStep = 0;
    };

    App.Models.Timer.prototype.pause = function() {
        clearInterval(this.timeIds.tick);
        clearTimeout(this.timeIds.end);

        getEventsRunner(
            this.events.pause, this, [this.currentStep])();
    };

    App.Models.Timer.prototype.on = function(event, callback) {
        if (this.events.hasOwnProperty(event)) {
            this.events[event].push(callback);
        } else {
            throw new ReferenceError('Event doesn\'t exist.', 'Timer.js', event);
        }
    };
})();
