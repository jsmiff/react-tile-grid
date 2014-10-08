/** @jsx React.DOM */
'use strict';

var React   = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Router = require('react-router');

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

  openDetails: function () {
    Router.transitionTo('profile', { id: this.props.model.get('ID') });
  },

  render: function() {

    var tileHeight = this.getTileWidth() * 1.3;

    var tileStyle = {
      backgroundImage: 'url(' + this.props.model.get('Image') + ')',
      width: (this.getTileWidth() - 5) + 'px',
      margin: '5px 2.5px 0',
      height: tileHeight + 'px'
    };

    var params = {
      id: this.props.model.get('ID')
    };

    return (
      <li onClick={this.openDetails} style={tileStyle} className='tile' key={this.props.model.get('ID')}>

          <footer>{this.props.model.get('Name')}</footer>

      </li>
    );
  }

});
