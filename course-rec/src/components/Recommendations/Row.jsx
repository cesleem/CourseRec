import React, { Component } from "react";

import RecommendationsExplainableCourseTile from "../../components/Recommendations/ExplainableCourseTile";

class RecommendationsRow extends Component {
	render() {
		let items = this.props.rankedRecommendations;
		return (
			<div>
				<h3
					className="module--subheading"
					style={{
						marginBottom: "10px"
					}}
				>
					{"If you have more time try these classes..."}
				</h3>
				<div
					style={{
						padding: "2.5em",
						flex: "1",
						display: "flex",
						flexDirection: "row",
						overflow: "auto",
						justifyItems: "center"
					}}
				>
					<div
						className="content"
						role="group"
						aria-label="selectable tiles"
						style={{
							padding: "1em",
							display: "flex",
							flexWrap: "nowrap",
							maxWidth: "1000px"
						}}
					>
						{Object.keys(items).map(key => (
							<RecommendationsExplainableCourseTile
								label={items[key][0]}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default RecommendationsRow;
