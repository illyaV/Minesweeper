/** @jsx React.DOM */

var app = app || {};
(function(window, $, React){
  'use strict';

  app.Field = React.createClass({
    getInitialState: function(){
      return {marked: false, open: false};
    },

    render: function() {
      return (<td >
                <div className="field">
                </div>
              </td>);
    }
  });
})(window, jQuery, React);