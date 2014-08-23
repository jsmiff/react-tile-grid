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

	handleRankSortClick: function(e) {
		e.preventDefault();
		this.props.setSort("Rank");
	},

	render: function () {
		return (
			<div className="header">
				<form>
					<input
              type="text"
              placeholder="Search..."
              value={this.props.filterText}
              ref="filterTextInput"
              onChange={this.handleFilterChange}
          />
					<button className="btn"
						onClick={this.handleNameSortClick}
					>Sort by Name</button>
					<button className="btn"
						onClick={this.handleRankSortClick}
					>Sort by Rank</button>
				</form>
			</div>
		);
	}
});
