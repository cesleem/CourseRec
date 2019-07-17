import React, { Component } from "react";

import { Button, ToastNotification } from "carbon-components-react";

import InterestsTileGrid from "../../components/Interests/TileGrid";

class InterestsScreen extends Component {
	constructor() {
		super();

		this.state = {
			displayInterestsError: false
		};
	}
	render() {
		return (
			<div>
				{this.state.displayInterestsError && (
					<ToastNotification
						kind="info"
						lowContrast={false}
						title="Selection Error"
						subtitle="Please choose at least 3 interests."
						hideCloseButton="true"
						caption=""
						style={{
							minWidth: "30rem",
							width: "75vw",
							marginBottom: ".2rem"
						}}
					/>
				)}
				<h1
					className="module--heading"
					style={{
						marginTop: "1em",
						marginBottom: "1em",
						marginLeft: "10%"
					}}
				>
					{"Welcome to OMSCS CourseRecs!"}
				</h1>
				<h2
					className="module--subheading"
					style={{ marginLeft: "10%" }}
				>
					{
						" > First, please select atleast three (3) academic interests below."
					}
				</h2>
				<InterestsTileGrid addInterests={this.props.addInterests} />
				<Button
					style={{
						position: "absolute",
						bottom: "0",
						right: "0",
						marginRight: "4.5em",
						marginBottom: "6em"
					}}
					onClick={() => {
						if (this.props.SelectedInterests.length >= 3) {
							this.props.advancePage("ConstraintsScreen");
						} else {
							this.setState({ displayInterestsError: true });
						}
					}}
				>
					{"Next >"}
				</Button>
			</div>
		);
	}
}

export default InterestsScreen;
