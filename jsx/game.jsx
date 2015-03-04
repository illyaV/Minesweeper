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
      console.log(this.state.matrix);

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
          _matrix[i][j] = 0;
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
        
        if (_matrix[y][x] !== "X") {
          _matrix[y][x] = "X";
          flag++; 
        }  
      }

      return _matrix;
    },

    genTips: function(_matrix) {
      var tip;

      for (var i = 0, l = _matrix.length; i < l; i++) {
        for (var j = 0, k = _matrix[i].length; j < k; j++) {
          if (_matrix[i][j] !== "X") {
            tip =  0;

            for (var h = i - 1; h < i+2; h++) {
              for (var g = j  - 1; g < j + 2; g++) {
                if (_matrix[h] && _matrix[h][g] === "X") {
                  tip++;
                }
              }
            }

            if (tip > 0) {
              _matrix[i][j] = tip;
            } 
          }
        }
      }

      return _matrix; 
    },

    makeRows: function() {
      var rows = [],
          row  = "",
          _matrix = this.state.matrix;

      for (var i = 0, l = _matrix.length; i < l; i++) {
        //row += "<tr>";
        
        for (var j = 0, k = _matrix[i].length; j < k; j++) {
          rows.push(<Field status="'+_matrix[i][j]+'" onClick="{}" />);  
        }
        
        //row += "</tr>";

        rows.push(row);
      }
      
      return rows;
    }
  });

  React.renderComponent(
    <Game x="16" y="16" bombsCount="15" />,
    document.getElementById("game")
  );
})(window, jQuery, React);