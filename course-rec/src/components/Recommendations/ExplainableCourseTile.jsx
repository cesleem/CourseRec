import React, { Component } from "react";

import RecommendationsCourseTile from "../../components/Recommendations/CourseTile";
import RecommendationsExplanationTable from "../../components/Recommendations/ExplanationTable";

class RecommendationsExplainableCourseTile extends Component {
	render() {
		return (
			<div>
				<RecommendationsCourseTile label={this.props.label} />
				<RecommendationsExplanationTable />
			</div>
		);
	}
}

export default RecommendationsExplainableCourseTile;
