/** @jsx React.DOM */
'use strict';

var React   = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({

  getTileWidth: function() {

    var windowWidth = this.props.windowWidth,
        tileWidth = this.props.windowWidth / 5;

    if(windowWidth <= 1024) {
      tileWidth = this.props.windowWidth / 4;
    }

    if(windowWidth <= 768) {
      tileWidth = this.props.windowWidth / 3;
    }

    if(windowWidth <= 480) {
      tileWidth = this.props.windowWidth / 2;
    }

    if(windowWidth <= 360) {
      tileWidth = this.props.windowWidth;
    }

    return tileWidth;

  },

  render: function() {

    var tileHeight = this.getTileWidth() * 1.2;

    var tileStyle = {
      backgroundImage: 'url(' + this.props.model.get('Image') + ')',
      width: this.getTileWidth() + 'px',
      height: tileHeight + 'px'
    };

    return (
      <li style={tileStyle} className='tile' key={this.props.model.get('ID')}>{this.props.model.get('Name')}
      </li>
    );
  }

});
