/** @jsx React.DOM */
'use strict';

var React   = require('react');

module.exports = React.createClass({

	handleFilterChange: function() {
	  this.props.setFilter(
	      this.refs.filterTextInput.getDOMNode().value
	  );
	},

	handleNameSortClick: function(e) {
		e.preventDefault();
		this.props.setSort("Name");
	},

	handleBirthSortClick: function(e) {
		e.preventDefault();
		this.props.setSort("Birth");
	},

	render: function () {
		return (
			<div className="header clearfix">
				<h1 className="brand pull-left">Tile Grid</h1>
				<form id="filterForm" className="pull-right">
					<button className="btn noselect"
						onClick={this.handleNameSortClick}
					>Sort by Name</button>
					<button className="btn noselect"
						onClick={this.handleBirthSortClick}
					>Sort by Birth Year</button>
					<input
							type="text"
							placeholder="Search..."
							value={this.props.filterText}
							ref="filterTextInput"
							onChange={this.handleFilterChange}
					/>
				</form>
			</div>
		);
	}
});
