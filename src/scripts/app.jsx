/** @jsx React.DOM */
'use strict';

var React   = require('react/addons');
var Backbone = require("backbone");
Backbone.$ = window.$ = require("jquery")

var Header = require ('./components/HeaderView');
var TilesListView = require ('./components/TilesListView');

/**
 * Top level component that contains all other elements for grid
 */
var GridApp = React.createClass({

  getInitialState: function() {
    return {
      filterText: '',
      sort: "Name"
    };
  },

  handleFilterChange: function(filterText) {
    this.setState({
      filterText: filterText
    });
  },

  handleSortChange: function(sort) {
    this.setState({
      sort: sort
    });

    this.forceUpdate();
  },

  render: function() {

    return (
      <div style={{overflow: 'hidden'}}>
        <Header
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
      </div>
    );

  }

});

var tilesCollection = Backbone.Collection.extend({
  url: "sampledata.json",
});

var tiles = new tilesCollection();

/*
 * Demo tiles being added and animating in
 * IRL this will happen from a remote data source
 */
var tilesToAdd = [{
  "ID":6,
  "Name":"Karl Marx",
  "Image":"img/marx.png",
  "Rank":600
},
{
  "ID":7,
  "Name":"Rene Descartes",
  "Image":"img/descartes.png",
  "Rank":700
},
{
  "ID":8,
  "Name":"Frantz Fanon",
  "Image":"img/fanon.png",
  "Rank":800
}];

tilesToAdd.forEach(function(tile, index) {

  setTimeout(function() { tiles.add(tile)}, (index + 1) * 2500);

});

React.renderComponent(<GridApp tiles={tiles} />, document.getElementById('app'));
