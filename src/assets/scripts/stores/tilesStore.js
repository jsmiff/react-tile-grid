var Backbone = require("backbone");
Backbone.$ = window.$ = require("jquery")
var _ = require("underscore");

// Private
var tile = Backbone.Model.extend({
  idAttribute: "id",
  initialize() {
    var altSizes = this.get('photos')[0]['alt_sizes'];
    this.set("preview_image", altSizes[altSizes.length - 1]['url']);
  }
});
var tilesCollection = Backbone.Collection.extend({
  url: "http://api.tumblr.com/v2/tagged?tag=gif&api_key=1cKpGIQkllOdNlqwkGAxWtSkUuCFo2sEJtDlhIiLE69GgVsU40",
  model: tile,
  sync: (method, collection, options) => {
    options.dataType = "jsonp";
    return Backbone.sync(method, collection, options);
  },
  parse: (data) => {
    var response = _.filter(data.response, function(i) {
      if(i.photos && i.photos[0].alt_sizes.length) {
        return i;
      }
    });
    return response;
  }
});
var _tiles = new tilesCollection();

// Public
var api = {};
api.getTile = function(id) {
  return _tiles.get(id);
}
api.tiles = _tiles;

module.exports = api;
