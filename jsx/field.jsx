/** @jsx React.DOM */

var app = app || {};
(function(window, $, React){
  'use strict';

  app.Field = React.createClass({
    getInitialState: function(){
      return {marked: false, opened: false};
    },

    open: function(e) {
      e.stopPropagation();
      e.preventDefault();
      this.props.onOpen();
    },
    
    mark: function(e) {
      console.log(e);
      e.stopPropagation();
      e.preventDefault();
      this.props.onMark();
    },

    render: function() {
      return (<td >
                <div className={React.addons.classSet({
                  open: this.props.opened,
                  mark: this.props.marked,
                  bomb: (this.props.opened && this.props.value==="X"),
                  field: true
                })} onClick={this.open} onContextMenu={this.mark} >
                </div>
              </td>);
    }
  });
})(window, jQuery, React);