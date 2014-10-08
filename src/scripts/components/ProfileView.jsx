/** @jsx React.DOM */
'use strict';

var React = require('react/addons');

// Router
var Router = require('react-router');

// Stores
var TilesStore = require('../stores/tilesStore');

module.exports = React.createClass({

	getStateFromStore: function(props) {
		props = props || this.props;
		return {
			info: TilesStore.getTile(props.params.id)
		};
	},

	getInitialState: function() {
		return this.getStateFromStore();
	},

	close: function () {
		Router.transitionTo('/');
	},

	render: function() {

		var info = this.state.info && this.state.info.toJSON() || {};

		var avatarStyle = {
			backgroundImage: 'url(' + info.Image + ')'
		};

		return (
			<div className="side-screen-modal p-50">
				<div style={avatarStyle} className="circle-avatar block-center"></div>
				<h1 className="block-center">{info.Name}</h1>
				<h2 className="block-center">Born {info.Birth}</h2>
				<button className="large-button block-center mt-50" onClick={this.close}>Close</button>
			</div>
		);
	}

});
