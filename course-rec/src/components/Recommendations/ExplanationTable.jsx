import React, { Component } from "react";

class RecommendationsExplanationTable extends Component {
	render() {
		return (
			<div style={{ marginLeft: ".75em" }}>
				<p style={{ marginBottom: ".15em" }}>
					{"Course Difficulty Rating: " +
						parseFloat(this.props.ratingDifficulty).toFixed(1)}
				</p>
				<p style={{ marginBottom: ".15em" }}>
					{"Course Quality Rating: " +
						parseFloat(this.props.ratingQuality).toFixed(1)}
				</p>
				<p style={{ marginBottom: ".15em" }}>
					{"Course Time/Effort Rating: " +
						parseFloat(this.props.ratingWorkload).toFixed(1) +
						" hrs/wk"}
				</p>
			</div>
		);
	}
}

export default RecommendationsExplanationTable;
