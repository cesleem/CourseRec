import React, { Component } from "react";
import { Button } from "carbon-components-react";

import ConstraintsSliderContainer from "../../components/Constraints/SliderContainer";

class ConstraintsScreen extends Component {
	render() {
		return (
			<div>
				<h2
					className="module--subheading"
					style={{ marginLeft: "2em", marginTop: "100px" }}
				>
					{
						" > Next, please tell us how you're thinking about your course selection this semester."
					}
				</h2>
				<ConstraintsSliderContainer
					SelectedConstraints={this.props.SelectedConstraints}
					addConstraints={this.props.addConstraints}
				/>
				<Button
					style={{ float: "right", marginRight: "3em" }}
					onClick={() =>
						this.props.advancePage("RecommendationsScreen")
					}
				>
					{"Next >"}
				</Button>
			</div>
		);
	}
}

export default ConstraintsScreen;
