import React, { Component } from "react";
import { Button } from "carbon-components-react";

import RecommendationsRow from "../../components/Recommendations/Row";

class RecommendationsScreen extends Component {
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
						<RecommendationsRow />
						<RecommendationsRow />
						<RecommendationsRow />
						<RecommendationsRow />
					</div>
				</div>
			</div>
		);
	}
}

export default RecommendationsScreen;
