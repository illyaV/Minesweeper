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
      this._$field = $("#field");

  		this.resetGame();
  		this.initHandlers();
  	},

  	resetGame: function() {
      this._bombsCash = {};
      this._gameMatrix = [];

      for (var i = 0; i < this._fieldSize.h; i++ ) {
      	this._gameMatrix[i] = [];
      	for (var j = 0; j < this._fieldSize.w; j++) {
          this._gameMatrix[i][j] = 0;
      	}
      }
      
      this.genBombs();
  		this.genTips();
      this.drowField();
  	},

  	genBombs: function() {
      var flag = 0,
          x, y;

      while (flag <+ this._bombCount) {
        x = Math.floor(Math.random() * (this._fieldSize.w));
        y = Math.floor(Math.random() * (this._fieldSize.h));
        if (!this._bombsCash[x+"_"+y]) {
          this._bombsCash[x+"_"+y] = true;
          this._gameMatrix[y][x] = "X";
          flag++;	
        }  
      }

      this.log();
  	},

  	genTips: function() {
      var tip;

      for (var i = 0, l = this._gameMatrix.length; i < l; i++) {
      	for (var j = 0, k = this._gameMatrix[i].length; j < k; j++) {
          if (this._gameMatrix[i][j] !== "X") {
            tip =  0;

            for (var h = i - 1; h < i+2; h++) {
            	for (var g = j  - 1; g < j + 2; g++) {
            		if (this._gameMatrix[h] && this._gameMatrix[h][g] === "X") {
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

      this.log(); 
  	},

  	drowField: function() {
      var row = ""

      this._$field.empty();

      for (var i = 0, l = this._gameMatrix.length; i < l; i++) {
      	row = "<tr>";
      	
      	for (var j = 0, k = this._gameMatrix[i].length; j < k; j++) {
      	  row += "<td><div class='cell' id='"+j+"_"+i+"' > </div></td>";  
      	}
        
        row += "</tr>";
      	this._$field.append(row);
      }
  	},

  	initHandlers: function() {
      var self = this;

      this._$field.on("mouseup", ".cell", function(event) {
        if (event.which === 3) {
        	
        	this.oncontextmenu = function() {
            return false;
          }

          self.markCell(event.target.id);
        } else {
        	self.checkCell(event.target.id);
        }
      });
  	},

  	markCell: function(id) {
      $("#"+id).toggleClass("marked");
  	},

  	checkCell: function(id) {
      var $cell = $("#"+id);
      
      if ($cell.is(".marked") || $cell.is(".open")) {
      	return;
      }

      if (this._bombsCash[id]) {
      	alert("Boom!");
      	this.lostGame();
      	return;
      }
      
      this.openCell(id);
  	},

  	openCell: function(id) {
      var $cell = $("#"+id),
          x = id.split("_")[0],
          y = id.split("_")[1];

      if ($cell.is(".marked") || $cell.is(".open")) {
      	return;
      }

      $cell.addClass('open');

      if (this._gameMatrix[y] && this._gameMatrix[y][x] > 0) {
        $cell.text(this._gameMatrix[y][x]);
        return;
      }

      this.openEmptyNeighbors(x, y);
  	},

  	openEmptyNeighbors: function(x, y) {
      // for (var h = y - 1; h < y + 2; h++) {
      //   for (var g = x  - 1; g < x + 2; g++) {
      //   	if (h !== y && g !== x) {
      //       this.openCell(g+"_"+h);
      //     }
      // 	}
      // }
  	},

  	lostGame: function() {
      this.resetGame();
  	},

  	wonGame: function() {

  	},

  	//-----------------------------------------------------------

  	log: function() {
  		console.log("-----------------------------------------------");
  		for (var i = 0, l = this._gameMatrix.length; i < l; i++) {
      	console.log(this._gameMatrix[i].join());
  	  }
  	}
  };

  app.init();
})(window, jQuery);