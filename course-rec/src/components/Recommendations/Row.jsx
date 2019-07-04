import React, { Component } from "react";

import RecommendationsExplainableCourseTile from "../../components/Recommendations/ExplainableCourseTile";

class RecommendationsRow extends Component {
	render() {
		let recs = this.props.courseRecommendations;
		return (
			<div>
				{!this.props.isPrimary && (
					<h3
						className="module--subheading"
						style={{
							marginBottom: "10px"
						}}
					>
						{"If you have more time try these classes..."}
					</h3>
				)}
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
						{recs.map(rec => (
							<RecommendationsExplainableCourseTile
								tags={rec.categories}
								tagColors={this.props.tagColors}
								courseLabel={rec.course}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default RecommendationsRow;
