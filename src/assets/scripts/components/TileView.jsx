/** @jsx React.DOM */
'use strict';

var React   = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Router = require('react-router');

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getTileWidth: function() {
    var windowWidth = this.props.windowWidth; // TODO get container width to remove need for parentPadding
    var tileWidth = this.props.windowWidth / 5;
    var parentPadding = 10;

    if(windowWidth <= 1024) {
      tileWidth = (this.props.windowWidth - parentPadding) / 4;
    }
    if(windowWidth <= 768) {
      tileWidth = (this.props.windowWidth - parentPadding) / 3;
    }
    if(windowWidth <= 480) {
      tileWidth = (this.props.windowWidth - parentPadding) / 2;
    }
    if(windowWidth <= 360) {
      tileWidth = (this.props.windowWidth - parentPadding);
    }
    return tileWidth;
  },

  openDetails: function () {
    this.context.router.transitionTo('details', { id: this.props.model.get('id') });
  },

  render: function() {
    var tileHeight = this.getTileWidth() * 1.2;
    var tileStyle = {
      backgroundImage: 'url(' + this.props.model.get("preview_image") + ')',
      width: (this.getTileWidth() - 10) + 'px',
      margin: '5px',
      height: tileHeight + 'px',
      border: "1px solid #efefef"
    };
    return (
      <li onClick={this.openDetails} style={tileStyle} className='tile' key={this.props.model.get('id')}></li>
    );
  }

});
