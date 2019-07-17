import React, { Component } from "react";
import { Button } from "carbon-components-react";
import firebase from "firebase";

import RecommendationsRow from "../../components/Recommendations/Row";

class RecommendationsScreen extends Component {
	constructor() {
		super();

		this.state = {
			courseRecommendations: [],
			recRows: {},
			tagColorOptions: [
				"red",
				"magenta",
				"purple",
				"blue",
				"cyan",
				"teal",
				"green",
				"gray",
				"cool-gray",
				"warm-gray"
			],
			tagColors: {}
		};
	}

	assignTag(name) {
		var tagColor = "";
		if (name in this.state.tagColors) {
			tagColor = this.state.tagColors[name];
		} else {
			tagColor = this.state.tagColorOptions[
				(Object.keys(this.state.tagColors).length + 1) % 10
			];
			// console.log((Object.keys(this.state.tagColors).length + 1) % 10);
			this.setState({
				tagColors: { ...this.state.tagColors, [name]: tagColor }
			});
		}
		// console.log(name, tagColor);
		return tagColor;
	}

	addRecommendedCourse(categoryRecommendations) {
		var categoryLabel = categoryRecommendations.categoryLabel;
		var categoryCourseRecommendations =
			categoryRecommendations.courseRecommendations;
		var newCourseRecommendation;

		this.assignTag(categoryLabel);
		Object.keys(categoryCourseRecommendations).forEach((course, i) => {
			var existingCourseRecommendation = this.state.courseRecommendations.find(
				rec => rec["course"] === course
			);
			if (existingCourseRecommendation) {
				newCourseRecommendation = {
					...existingCourseRecommendation,
					course: existingCourseRecommendation.course,
					score: Math.max(
						existingCourseRecommendation.score,
						categoryCourseRecommendations[course]
					)
				};
			} else {
				newCourseRecommendation = {
					course: course,
					score: categoryCourseRecommendations[course],
					categories: {}
				};
			}

			newCourseRecommendation.categories[categoryLabel] =
				categoryCourseRecommendations[course];

			var courseRecommendations = this.state.courseRecommendations;
			courseRecommendations[i] = newCourseRecommendation;
			this.setState({
				courseRecommendations: courseRecommendations
			});
		});
	}

	maxPredictionRank(recA, recB) {
		return recB.score - recA.score;
	}

	ranker() {
		this.setState({
			courseRecommendations: this.state.courseRecommendations.sort(
				this.maxPredictionRank
			),
			function() {
				console.log(this.state.courseRecommendations);
			}
		});
	}

	componentDidMount() {
		firebase
			.firestore()
			.collection("recommendations")
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					var categoryRecommendations = doc.data() || "Not Working";
					if (
						this.props.SelectedInterests.includes(
							categoryRecommendations.categoryLabel
						)
					) {
						this.addRecommendedCourse(categoryRecommendations);
					}
				});
				this.ranker(this.state.courseRecommendations);
				let rows = { 0: undefined, 1: "effort", 2: "difficulty" };
				let recs = this.state.courseRecommendations.slice(0, 15);

				Object.keys(rows).forEach(rowIdx => {
					if (recs) {
						let recRows = { ...this.state.recRows };
						let recRow = this.filterConstraints(recs, rows[rowIdx]);
						recRows[rowIdx] = recRow;
						this.setState({ recRows: recRows });
						// console.log(recRow.length);
						recs = recs.filter(rec => !recRow.includes(rec));
					}
				});
			});
	}

	isPassingConstraint(rec, constraint) {
		// console.log(constraint);
		// console.log(rec.course);
		let key = {
			difficulty: "ratingDifficulty",
			effort: "ratingWorkload",
			quality: "ratingQuality"
		};

		let courseInfo = this.props.courses[rec.course];

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

	filterConstraints(recs, constraintToRelax = undefined) {
		let constraints = Object.keys(this.props.SelectedConstraints);
		// console.log(recs);

		if (constraintToRelax) {
			constraints = constraints.filter(
				constraint => constraint != constraintToRelax
			);
		}

		console.log(constraints);
		recs = recs.filter(
			rec =>
				!constraints
					.map(constraint =>
						this.isPassingConstraint(rec, constraint)
					)
					.some(res => res == false)
		);
		return recs;
	}

	render() {
		return (
			<div>
				<div
					className="container"
					style={{
						flex: "1",
						display: "flex",
						overflow: "auto",
						maxHeight: "95vh",
						marginLeft: "4.75em",
						marginRight: "3.5em",
						marginBottom: "10%"
					}}
				>
					<div
						className="content"
						role="group"
						aria-label="selectable tiles"
						style={{
							padding: "0em",
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							alignItems: "center"
						}}
					>
						<div>
							{this.state.recRows[0] &&
							this.state.recRows[0].length !== 0 ? (
								<div>
									<h2
										className="module--heading"
										style={{
											// marginLeft: "2em",
											marginTop: "100px"
										}}
									>
										{"Your Recommended Courses"}
									</h2>
									<RecommendationsRow
										isPrimary={true}
										tagColors={this.state.tagColors}
										courseRecommendations={
											this.state.recRows[0]
										}
										courseMetadata={this.props.courses}
										// SelectedConstraints={this.props.SelectedConstraints}
									/>
									<div
										style={{
											height: "3vh",
											marginTop: "7.5em"
										}}
									>
										<svg
											style={{
												width: "100%",
												height: "100%"
											}}
										>
											<line
												x1="0"
												y1="0"
												x2="100%"
												y2="0"
												style={{
													stroke: "#433333",
													strokeWidth: 2
												}}
											/>
										</svg>
									</div>
								</div>
							) : (
								<h3
									className="module--subheading"
									style={{
										marginTop: "3em",
										marginBottom: "1.5em"
									}}
								>
									{
										"Sorry, no courses match your selected constraints."
									}
								</h3>
							)}
						</div>
						<div>
							{this.state.recRows[1] &&
								this.state.recRows[1].length !== 0 && (
									<div>
										<RecommendationsRow
											title={
												"If you have more time try these classes..."
											}
											isPrimary={false}
											tagColors={this.state.tagColors}
											courseRecommendations={
												this.state.recRows[1]
											}
											courseMetadata={this.props.courses}
											// SelectedConstraints={this.props.SelectedConstraints}
											// constraintToRelax={"effort"}
										/>
										<div
											style={{
												height: "4.75vh",
												marginTop: "4em"
											}}
										>
											<svg
												style={{
													width: "100%",
													height: "100%"
												}}
											>
												<line
													x1="0"
													y1="0"
													x2="100%"
													y2="0"
													style={{
														stroke: "grey",
														strokeWidth: 2
													}}
												/>
											</svg>
										</div>
									</div>
								)}
						</div>
						<div>
							{this.state.recRows[2] &&
								this.state.recRows[2].length !== 0 && (
									<RecommendationsRow
										title={
											"If you're interested in more of a challenge try these classes..."
										}
										isPrimary={false}
										tagColors={this.state.tagColors}
										courseRecommendations={
											this.state.recRows[2]
										}
										courseMetadata={this.props.courses}
										// SelectedConstraints={this.props.SelectedConstraints}
										// constraintToRelax={"difficulty"}
									/>
								)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RecommendationsScreen;
