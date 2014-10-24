(function() {
    'use strict';

    angular.module('quizzesApp').service('alert', function() {
        var addMessage = function (type) {
            return function (text, displayed) {
                this.messages.push({
                    type: type,
                    text: text,
                    displayed: displayed || false
                });
            };
        };
        this.messages = [];
        this.success = addMessage('success');
        this.warning = addMessage('warning');
        this.info = addMessage('info');
        this.setAllDisplayed = function () {
            angular.forEach(this.messages, function (message) {
                message.displayed = true;
            });
        };
        this.clear = function () {
            var messages = [];
            angular.forEach(this.messages, function (message) {
                if (!message.displayed) {
                    messages.push(message);
                }
            });
            this.messages = messages;
        };
        this.confirm = function (message) {
            return confirm(message);
        };
    });
})();
