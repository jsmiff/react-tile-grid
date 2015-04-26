/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var TransitionGroup = React.addons.CSSTransitionGroup;

var TileView = require ('./TileView');

var BackboneMixin = {
  // https://github.com/facebook/react/blob/1be9a9e/examples/todomvc-backbone/js/app.js#L148-L171
  componentDidMount: function() {
    // Whenever there may be a change in the Backbone data, trigger a reconcile.
    this.getBackboneModels().forEach(function(model) {
      model.on('add change remove', this.forceUpdate.bind(this, null), this);
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

  updateDimensions: function() {
    this.setState({width: $(window).width(), height: $(window).height()});
  },

  componentWillMount: function() {
    this.updateDimensions();
  },

  componentDidMount: function() {
    window.addEventListener("resize", this.updateDimensions);
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },

  fetchTiles: function() {
    this.props.tiles.fetch({update: true, remove: true});
  },

  render: function() {
    // set sorting based off state
    this.props.tiles.comparator = function(model) {
      return model.get(this.props.sort);
    }.bind(this);
    this.props.tiles.sort();
    var tiles = this.props.tiles;
    // create each individual tile
    tiles = tiles.map(function (model) {
      if(JSON.stringify(model.get("tags")).indexOf(this.props.filterText.toLowerCase()) > -1) {
        return (
          <TileView windowWidth={this.state.width} windowHeight={this.state.height} key={model.cid} model={model} />
        );
      }
    }.bind(this));
    return (
      <ul className='tiles-container'>
        <TransitionGroup transitionName="slowFade">
          {tiles}
        </TransitionGroup>
      </ul>
    );
  }

});
