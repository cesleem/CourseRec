import React, { Component } from "react";
import { Button } from "carbon-components-react";
import firebase from "firebase";

import RecommendationsRow from "../../components/Recommendations/Row";

class RecommendationsScreen extends Component {
	constructor() {
		super();

		this.state = {
			courseRecommendations: [],
			rankedRecommendations: {}
		};
	}

	componentWillMount() {
		function maxPredictionRank(itemA, itemB) {
			return itemB[1] - itemA[1];
		}

		return firebase
			.firestore()
			.collection("recommendations")
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					var item = doc.data() || "Not Working";
					if (
						this.props.SelectedInterests.includes(
							item.categoryLabel
						)
					) {
						// console.log(item);
						this.setState({
							courseRecommendations: this.state.courseRecommendations.concat(
								item
							),
							rankedRecommendations: item
						});
					}
				});
				var rankedRecommendations = [];
				for (var rec in this.state.rankedRecommendations
					.courseRecommendations) {
					rankedRecommendations.push([
						rec,
						this.state.rankedRecommendations.courseRecommendations[
							rec
						]
					]);
				}
				this.setState({
					rankedRecommendations: rankedRecommendations.sort(
						maxPredictionRank
					),
					function() {
						console.log(
							this.state.rankedRecommendations
								.courseRecommendations
						);
					}
				});
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
							padding: "3em",
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							alignItems: "center"
						}}
					>
						<RecommendationsRow
							rankedRecommendations={
								this.state.rankedRecommendations
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default RecommendationsScreen;
