/*
    This file contains local helpers for casper testing. The `helpers` global
    included in all UI test files is the result of merging this file onto the
    global helpers which are in marketplace-gulp/tests/casper-helpers.js.
*/

module.exports = {
    triggerEvent: function(selector, eventName) {
        casper.evaluate(function(selector, eventName) {
            (function () {
                function CustomEvent(event, params) {
                    params = params || {bubbles: false, cancelable: false, detail: undefined};
                    var evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }
                CustomEvent.prototype = window.Event.prototype;
                window.CustomEvent = CustomEvent;
            })();
            var e = new CustomEvent(eventName);
            document.querySelector(selector).dispatchEvent(e);
        }, selector, eventName);
    },
};
