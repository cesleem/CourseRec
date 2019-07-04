import React, { Component } from "react";
import { Button } from "carbon-components-react";
import firebase from "firebase";

import RecommendationsRow from "../../components/Recommendations/Row";

class RecommendationsScreen extends Component {
	constructor() {
		super();

		this.state = {
			courseRecommendations: [],
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
			console.log((Object.keys(this.state.tagColors).length + 1) % 10);
			this.setState({
				tagColors: { ...this.state.tagColors, [name]: tagColor }
			});
		}
		console.log(name, tagColor);
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
				newCourseRecommendation.categories.push(categoryLabel);
			} else {
				newCourseRecommendation = {
					course: course,
					score: categoryCourseRecommendations[course],
					categories: [categoryLabel]
				};
			}
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

	componentWillMount() {
		return firebase
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
			});
	}

	render() {
		return (
			<div>
				<h2
					className="module--heading"
					style={{ marginLeft: "2em", marginTop: "100px" }}
				>
					{"Your Recommended Courses"}
				</h2>
				<div
					className="container"
					style={{
						flex: "1",
						display: "flex",
						overflow: "auto",
						maxHeight: "700px"
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
						<RecommendationsRow
							isPrimary={true}
							tagColors={this.state.tagColors}
							courseRecommendations={
								this.state.courseRecommendations
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default RecommendationsScreen;
