angular.module('highlow').factory('GameFactory', [function() {
    'use strict';
    
    var generateNumber = function(low, high, last) {
        var next = 0;
        
        // The next number must be different than the previous number
        do {
            next = Math.floor(Math.random() * high) + low;
        } while(next === last);
        
        return next;
    };
    
    var Game = function(low, high) {
        this.previousNumbers = [];
        this.score = 0;
        this.inprogress = true;
        this.low = low;
        this.high = high;
        
        this.previousNumbers.push(generateNumber(low, high, low - 1));
    };
    
    Game.prototype.lower = function() {
    	var lastNumber = this.previousNumbers[this.previousNumbers.length - 1];
    	
        var newNumber = generateNumber(this.low, this.high, lastNumber);
        if(newNumber < lastNumber) {
            this.score++;
        } else {
            this.inprogress = false;
        }
        this.previousNumbers.push(newNumber);
    };
    
    Game.prototype.higher = function() {
    	var lastNumber = this.previousNumbers[this.previousNumbers.length - 1];
    	
        var newNumber = generateNumber(this.low, this.high, lastNumber);
        if(newNumber > lastNumber) {
            this.score++;
        } else {
            this.inprogress = false;
        }
        this.previousNumbers.push(newNumber);
    };
    
    Game.prototype.getScore = function() {
        return this.score;
    };
    
    Game.prototype.isInProgress = function() {
        return this.inprogress;  
    };
    
    Game.prototype.getPreviousNumbers = function() {
    	return this.previousNumbers;
    };
    
    return {
        createNew: function(low, high) {
            return new Game(low, high);
        }
    };
}]);