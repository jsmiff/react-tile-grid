/** @jsx React.DOM */

var React = require('react/addons');
var TileView = require('../src/scripts/components/TileView');
var TilesStore = require('../src/scripts/stores/tilesStore');

// Backbone
var Backbone = require("backbone");
Backbone.$ = window.$ = require("jquery");

describe("TileView Tests",function(){

		it("Footer renders name", function () {

				var model = new Backbone.Model({
					Name: "John Doe"
				});

				var instance = <TileView model={model} />
				var component = React.addons.TestUtils.renderIntoDocument(instance);

				expect($(component.getDOMNode()).find('footer').html()).toBe('John Doe');

		});


});
