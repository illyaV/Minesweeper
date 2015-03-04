/** @jsx React.DOM */

var app = app || {};
(function(window, $, React){
  'use strict';

  app.Field = React.createClass({displayName: "Field",
    getInitialState: function(){
      return {marked: false, open: false};
    },

    render: function() {
      return (React.createElement("td", null, 
                React.createElement("div", {className: "field"}
                )
              ));
    }
  });
})(window, jQuery, React);