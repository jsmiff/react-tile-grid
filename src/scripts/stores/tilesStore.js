var Backbone = require("backbone");
Backbone.$ = window.$ = require("jquery")

// Private

var tile = Backbone.Model.extend({
  idAttribute: "ID"
});

var tilesCollection = Backbone.Collection.extend({
	url: "sampledata.json",
	model: tile
});

var _tiles = new tilesCollection();

// Public

var api = {};

api.getTile = function(id) {

	return _tiles.get(id);

}

/*
* Demo tiles being added and animating in
* IRL this will happen from a remote data source
*/
api.demoTileEntry = function () {

  var tilesToAdd = [{
    "ID":6,
    "Name":"Karl Marx",
    "Image":"img/marx.png",
    "Birth":1818
  },
  {
    "ID":7,
    "Name":"Rene Descartes",
    "Image":"img/descartes.png",
    "Birth":1596
  },
  {
    "ID":8,
    "Name":"Frantz Fanon",
    "Image":"img/fanon.png",
    "Birth":1925
  }];

  tilesToAdd.forEach(function(tile, index) {

    setTimeout(function() { _tiles.add(tile)}, (index + 1) * 2500);

  });

}

api.tiles = _tiles;

module.exports = api;
