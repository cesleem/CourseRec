import React, { Component } from "react";

import RecommendationsExplainableCourseTile from "../../components/Recommendations/ExplainableCourseTile";

class RecommendationsRow extends Component {
	isPassingConstraint(rec, constraint) {
		// console.log(constraint);
		console.log(rec.course);
		let key = {
			difficulty: "ratingDifficulty",
			effort: "ratingWorkload",
			quality: "ratingQuality"
		};

		let courseInfo = this.props.courseMetadata[rec.course];

		if (!courseInfo) return false;

		let courseConstraintValue = courseInfo[key[constraint]];

		let selectedConstraintValue = this.props.SelectedConstraints[
			constraint
		];

		if (constraint === "quality") {
			//for quality, users select course quality which exceeds minimum
			// console.log(
			// 	courseConstraintValue,
			// 	">",
			// 	selectedConstraintValue,
			// 	courseConstraintValue >= selectedConstraintValue
			// );
			return courseConstraintValue >= selectedConstraintValue;
		} else {
			// console.log(
			// 	courseConstraintValue,
			// 	"<",
			// 	selectedConstraintValue,
			// 	courseConstraintValue <= selectedConstraintValue
			// );
			return courseConstraintValue <= selectedConstraintValue;
		}
	}

	render() {
		let recs = this.props.courseRecommendations;

		return (
			<div>
				{recs && (
					<div>
						{!this.props.isPrimary && (
							<h3
								className="module--subheading"
								style={{
									marginTop: "3em",
									marginBottom: "1.5em"
								}}
							>
								{this.props.title}
							</h3>
						)}
						<div />
						<div
							style={{
								// padding: "2.5em",
								marginTop: "3.5em",
								flex: "1",
								display: "flex",
								flexDirection: "row",
								overflow: "auto",
								justifyItems: "center",
								width: "85vw"
							}}
						>
							<div
								className="content"
								role="group"
								aria-label="selectable tiles"
								style={{
									// padding: "1em",
									display: "flex",
									flexWrap: "nowrap",
									width: "90vw",
									maxWidth: "1000px"
								}}
							>
								{recs.map((rec, rank) => (
									<RecommendationsExplainableCourseTile
										tags={rec.categories}
										tagColors={this.props.tagColors}
										courseLabel={rec.course}
										courseRank={rank}
										courseLink={
											this.props.courseMetadata[
												rec.course
											].link
										}
										ratingDifficulty={
											this.props.courseMetadata[
												rec.course
											].ratingDifficulty
										}
										ratingWorkload={
											this.props.courseMetadata[
												rec.course
											].ratingWorkload
										}
										ratingQuality={
											this.props.courseMetadata[
												rec.course
											].ratingQuality
										}
									/>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default RecommendationsRow;
