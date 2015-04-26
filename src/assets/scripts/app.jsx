/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var TransitionGroup = React.addons.CSSTransitionGroup;

// Router
var Router = require('react-router');
var {
  Route,
  RouteHandler,
  DefaultRoute,
  Link
} = Router;

// Backbone
var Backbone = require("backbone");
Backbone.$ = window.$ = require("jquery");

// Views
var HeaderView = require('./components/HeaderView');
var TilesListView = require('./components/TilesListView');
var DetailsView = require('./components/DetailsView');

// Stores
var TilesStore = require('./stores/tilesStore');

/**
 * Top level component that contains all other elements for grid
 */
var GridApp = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      filterText: '',
      sort: "Name"
    };
  },

  componentWillMount() {
    this.fetchTiles();
  },

  fetchTiles() {
    TilesStore.tiles.fetch();
  },

  handleFilterChange: function(filterText) {
    this.setState({
      filterText: filterText
    });
    this.forceUpdate();
  },

  handleSortChange: function(sort) {
    this.setState({
      sort: sort
    });
  },

  render() {
    return (
      <div style={{overflow: 'hidden'}}>
        <HeaderView
          filterText={this.state.filterText}
          sort={this.state.sort}
          setFilter={this.handleFilterChange}
          setSort={this.handleSortChange}
        />
        <TilesListView
          filterText={this.state.filterText}
          sort={this.state.sort}
          tiles={this.props.tiles}
        />
        <TransitionGroup component="div" transitionName="slowFade">
          <RouteHandler tiles={this.props.tiles} key={this.context.router.getCurrentPath()} />
        </TransitionGroup>
      </div>
    );
  }
});

var routes = (
  <Route path="/" handler={GridApp}>
    <Route name="details" path="details/:id" handler={DetailsView} />
  </Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler tiles={TilesStore.tiles} />, document.getElementById('app'));
});
