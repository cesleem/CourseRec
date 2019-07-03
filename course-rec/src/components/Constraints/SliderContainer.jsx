import React, { Component } from "react";
import { Slider } from "carbon-components-react";

class ConstraintsSliderContainer extends Component {
	render() {
		return (
			<div
				style={{
					padding: "3em",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					height: "400px",
					marginTop: "100px"
				}}
			>
				<h2
					className="module--helpertext"
					style={{ marginBottom: "2em", alignItems: "left" }}
				>
					{"I'm interested in classes with up to..."}
				</h2>
				<Slider
					id="slider-1"
					name=""
					ariaLabelInput=""
					value={3}
					min={0}
					max={5}
					labelText="Difficulty Rating"
				/>
				<Slider
					id="slider-2"
					name=""
					ariaLabelInput=""
					value={3}
					min={0}
					max={5}
					labelText="Time/Effort Rating"
				/>
				<Slider
					id="slider-3"
					name=""
					ariaLabelInput=""
					value={3}
					min={0}
					max={5}
					labelText="Overall Quality Rating"
				/>
			</div>
		);
	}
}

export default ConstraintsSliderContainer;
