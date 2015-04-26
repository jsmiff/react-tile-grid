var React = require('react/addons');
var TilesListView = require('../components/TilesListView');
var TileView = require('../components/TileView');
var TilesStore = require('../stores/tilesStore');

// Backbone
var Backbone = require("backbone");
Backbone.$ = window.$ = require("jquery");

describe("TileListView Tests",function(){
  it("Renders", function () {
    var instance = <TilesListView tiles={TilesStore.tiles } />
    var component = React.addons.TestUtils.renderIntoDocument(instance);
    (component.getDOMNode().children.length).should.equal(1);
  });
});