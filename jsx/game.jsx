/** @jsx React.DOM */
var app = app || {};

(function(window, $, React){
  'use strict';
  var Field = app.Field;

  var Game = React.createClass({
    getInitialState: function(){
      return {matrix: []};
    },

    componentDidMount: function(){
      this.resetGame();
    },

    render: function() {
      var rows = this.makeRows();
      return (<div className="game">
                <table>
                  {rows}
                </table>
              </div>);
    },

    resetGame: function() {
      var _matrix = [];

      for (var i = 0; i < this.props.y; i++ ) {
        _matrix[i] = [];
        for (var j = 0; j < this.props.x; j++) {
          _matrix[i][j] = {value: 0, marked: false, opened: false};
        }
      }

      this.setState({matrix: this.genTips(this.genBombs(_matrix))});
    },

    genBombs: function(_matrix) {
      var flag = 0,
          x, y;

      while (flag <+ this.props.bombsCount) {
        x = Math.floor(Math.random() * (this.props.x));
        y = Math.floor(Math.random() * (this.props.y));
        
        if (_matrix[y][x].value !== "X") {
          _matrix[y][x].value = "X";
          flag++;
        }  
      }

      return _matrix;
    },

    genTips: function(_matrix) {
      var tip;
      return _matrix.map(function(row, i){
        return row.map(function(item, j){
          if (item.value !== "X") {
            tip =  0;

            for (var h = i - 1; h < i+2; h++) {
              for (var g = j  - 1; g < j + 2; g++) {
                if (_matrix[h] && _matrix[h][g] && _matrix[h][g].value === "X") {
                  tip++;
                }
              }
            }

            return {value: tip, opened: item.opened, marked: item.marked}; 
          }
          return item;
        });
      }); 
    },

    onOpenField: function(x, y) {
      var _matrix = $.extend([],this.state.matrix);
      if (!_matrix[y][x].marked) {
        _matrix[y][x].opened = true;
        this.setState({matrix: _matrix});
      }
    },

    onMarkField: function(x, y) {
      var _matrix = $.extend([],this.state.matrix);
      if (!_matrix[y][x].opened) {
        _matrix[y][x].marked = !_matrix[y][x].marked;
        this.setState({matrix: _matrix});
      }
    },

    makeRows: function() {
      var self = this;
      return this.state.matrix.map(function(row, y) {
        return (<tr>{row.map(function(item, x){
          return (<Field value={item.value} opened={item.opened} marked={item.marked} onOpen={self.onOpenField.bind(self, x, y)} onMark={self.onMarkField.bind(self, x, y)} />);
        })}</tr>);
      });
    }
  });

  React.render(
    <Game x="16" y="16" bombsCount="15" />,
    document.getElementById("game")
  );
})(window, jQuery, React);