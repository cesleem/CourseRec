import React, { Component } from "react";

import RecommendationsCourseTile from "../../components/Recommendations/CourseTile";
import RecommendationsExplanationTable from "../../components/Recommendations/ExplanationTable";

class RecommendationsExplainableCourseTile extends Component {
	render() {
		return (
			<div>
				<RecommendationsCourseTile />
				<RecommendationsExplanationTable />
			</div>
		);
	}
}

export default RecommendationsExplainableCourseTile;
