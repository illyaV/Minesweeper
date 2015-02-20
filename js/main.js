(function(window, $){
  'use strict';

  var app;
  
  app = {
  	_bombsCash: {},
  	_gameMatrix: [],
  	_bombCount: 15,

  	_fieldSize: {
  		w: 16,
  		h: 16
  	},

  	init: function() {
  		this.resetGame();
  		this.genBombs();
  		this.genTips();
  		this.drowField();
  		this.initHandlers();
  	},

  	resetGame: function() {
      this._bombsCash = {};
      this._gameMatrix = [];

      for (var i = 0; i < this._fieldSize.h; i++ ) {
      	this._gameMatrix[i] = [];
      	for (var j = 0; j < this._fieldSize.w; j++) {
          this._gameMatrix[i][j] = false;
      	}
      }
  	},

  	genBombs: function() {
      var flag = true,
          x, y;

      while (flag<16) {
        x = Math.floor(Math.random() * (this._fieldSize.w));
        y = Math.floor(Math.random() * (this._fieldSize.h));
        if (!this._bombsCash[x+"_"+y]) {
          this._bombsCash[x+"_"+y] = true;
          this._gameMatrix[y][x] = true;
          flag++;	
        }  
      }

      console.log(this._bombsCash);
      console.log(this._gameMatrix);
  	},

  	genTips: function() {
      var tip = 0;

      for (var i = 0, l = this._gameMatrix.length; i < l; i++) {
      	for (var j = 0, k = this._gameMatrix[i].length; j < k; j++) {
          if (this._gameMatrix[i][j] !== true) {
            
            for (var h = i - 1; h < i+2; h++) {
            	for (var g = j  - 1; g < j + 2; g++) {
            		if (this._gameMatrix[h] && this._gameMatrix[h][g] === true) {
                  tip++;
            		}
            	}
            }

            if (tip > 0) {
              this._gameMatrix[i][j] = tip;
            } 
          }
      	}
      }

      console.log(this._gameMatrix); 
  	},

  	drowField: function() {

  	},

  	initHandlers: function() {

  	}
  };

  app.init();
})(window, jQuery);