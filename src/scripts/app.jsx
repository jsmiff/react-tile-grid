/** @jsx React.DOM */
'use strict';

var React = require('react/addons');

// Router
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;

// Backbone
var Backbone = require("backbone");
Backbone.$ = window.$ = require("jquery")

// Views
var HeaderView = require ('./components/HeaderView');
var TilesListView = require ('./components/TilesListView');
var ProfileView = require ('./components/ProfileView');

// Stores
var TilesStore = require('./stores/tilesStore');

/**
 * Top level component that contains all other elements for grid
 */
var GridApp = React.createClass({

  componentDidMount: function() {

  },

  getInitialState: function() {

    // demo only
    TilesStore.demoTileEntry();

    return {
      filterText: '',
      sort: "Name"
    };

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

  render: function() {

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

        {this.props.activeRouteHandler()}

      </div>
    );

  }

});

var routes = (
  <Route path="/" tiles={TilesStore.tiles} handler={GridApp}>

    <Route name="profile" path="profile/:id" handler={ProfileView}/>

  </Route>
);

React.renderComponent(<Routes children={routes}/>, document.getElementById('app'));
