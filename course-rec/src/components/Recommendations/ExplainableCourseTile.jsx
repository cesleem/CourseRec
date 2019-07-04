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
				/>
				<RecommendationsExplanationTable />
			</div>
		);
	}
}

export default RecommendationsExplainableCourseTile;
