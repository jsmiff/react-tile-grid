/** @jsx React.DOM */
'use strict';

var React = require('react/addons');

// Router
var Router = require('react-router');

// Stores
var TilesStore = require('../stores/tilesStore');

var BackboneMixin = {
  // https://github.com/facebook/react/blob/1be9a9e/examples/todomvc-backbone/js/app.js#L148-L171
  componentDidMount: function() {
    // Whenever there may be a change in the Backbone data, trigger a reconcile.
    this.getBackboneModels().forEach(function(model) {
      model.on('add change remove', function() {
        this.setState(this.getStateFromStore());
      }.bind(this, null), this);
    }, this);
  },
  componentWillUnmount: function() {
    // Ensure that we clean up any dangling references when the component is
    // destroyed.
    this.getBackboneModels().forEach(function(model) {
      model.off(null, null, this);
    }, this);
  }
};

module.exports = React.createClass({

  mixins: [BackboneMixin],

  getBackboneModels: function() {
    return [this.props.tiles];
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  getStateFromStore: function() {
    var id = this.context.router.getCurrentParams().id;
    return {
      info: TilesStore.getTile(id)
    };
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  close: function () {
    this.context.router.transitionTo('/');
  },

  render: function() {
    var info = this.state.info && this.state.info.toJSON() || {};
    if(info.id) {
      var imgStyle = {
        backgroundImage: 'url(' + info['photos'][0]['alt_sizes'][1]['url'] + ')'
      };
      return (
        <div className="side-screen-modal p-50">
          <div style={imgStyle} className="img-large block-center"></div>
          <button className="large-button block-center mt-50" onClick={this.close}>Close</button>
        </div>
      );
    } else {
      return <div className="side-screen-modal p-50"></div>
    }
  }

});
