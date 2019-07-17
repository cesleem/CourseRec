import React, { Component } from "react";

import RecommendationsCourseTile from "../../components/Recommendations/CourseTile";
import RecommendationsExplanationTable from "../../components/Recommendations/ExplanationTable";

class RecommendationsExplainableCourseTile extends Component {
	render() {
		return (
			<div>
				<RecommendationsCourseTile
					tags={this.props.tags}
					tagColors={this.props.tagColors}
					courseLabel={this.props.courseLabel}
					courseLink={this.props.courseLink}
					courseRank={this.props.courseRank}
				/>
				<RecommendationsExplanationTable
					ratingDifficulty={this.props.ratingDifficulty}
					ratingWorkload={this.props.ratingWorkload}
					ratingQuality={this.props.ratingQuality}
				/>
			</div>
		);
	}
}

export default RecommendationsExplainableCourseTile;
