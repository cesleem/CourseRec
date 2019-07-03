import React, { Component } from "react";

import { Button } from "carbon-components-react";

import InterestsTileGrid from "../../components/Interests/TileGrid";

class InterestsScreen extends Component {
	render() {
		return (
			<div>
				<h1
					className="module--heading"
					style={{
						marginTop: "1em",
						marginBottom: "1em",
						marginLeft: "1em"
					}}
				>
					{"Welcome to OMSCS CourseRecs!"}
				</h1>
				<h2
					className="module--subheading"
					style={{ marginLeft: "2em" }}
				>
					{" > First, please select your academic interests below."}
				</h2>
				<InterestsTileGrid />
				<Button
					style={{ float: "right", marginRight: "3em" }}
					onClick={() => this.props.advancePage("ConstraintsScreen")}
				>
					{"Next >"}
				</Button>
			</div>
		);
	}
}

export default InterestsScreen;
