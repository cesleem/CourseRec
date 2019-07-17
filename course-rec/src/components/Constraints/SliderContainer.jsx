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
					height: "40vh",
					marginTop: "2%"
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
					name="difficulty"
					ariaLabelInput=""
					value={this.props.SelectedConstraints["difficulty"]}
					min={0}
					max={5}
					onChange={e =>
						this.props.addConstraints("difficulty", e.value)
					}
					labelText="Difficulty Rating"
				/>
				<Slider
					id="slider-2"
					name="effort"
					ariaLabelInput=""
					value={this.props.SelectedConstraints["effort"]}
					min={0}
					max={50}
					onChange={e => this.props.addConstraints("effort", e.value)}
					labelText="Rated Effort (Hrs/Week)"
				/>
				<h2
					className="module--helpertext"
					style={{ marginBottom: "2em", alignItems: "left" }}
				>
					{"I'm interested in classes with higher than ..."}
				</h2>
				<Slider
					id="slider-3"
					name="quality"
					ariaLabelInput=""
					value={this.props.SelectedConstraints["quality"]}
					min={0}
					max={5}
					onChange={e =>
						this.props.addConstraints("quality", e.value)
					}
					labelText="Overall Quality Rating"
				/>
			</div>
		);
	}
}

export default ConstraintsSliderContainer;
