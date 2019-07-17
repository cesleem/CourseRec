import React, { Component } from "react";
import { ClickableTile, Tag, Icon } from "carbon-components-react";
import { Checkmark32 } from "@carbon/icons-react";
import "../../components/Recommendations/CourseTile.scss";

class RecommendationsCourseTile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isHover: false
		};
	}
	render() {
		let maxNumTags = 3;
		let scoreThreshold = 0.22;
		let tags = Object.keys(this.props.tags).map(tagLabel => [
			tagLabel,
			this.props.tags[tagLabel]
		]);
		tags.sort((x, y) => y[1] - x[1]);

		var linkStyle = { position: "absolute", top: "15px", right: "15px" };
		if (this.state.isHover) {
			linkStyle["fill"] = "#ff6169";
		} else {
			linkStyle["fill"] = "white";
		}

		return (
			<div>
				<ClickableTile
					href={this.props.courseLink}
					target="_blank"
					id="tile-5"
					name="tiles"
					style={{
						height: "165px",
						width: "309px"
					}}
				>
					{
						//TODO : Add to wishlist + save actions
						// <div>
						// <Checkmark32
						// 	style={linkStyle}
						// 	onMouseEnter={() =>
						// 		this.setState({ isHover: true })
						// 	}
						// 	onMouseLeave={() =>
						// 		this.setState({ isHover: false })
						// 	}
						// />
						// </div>
					}

					<p
						style={{
							position: "absolute",
							bottom: "15px",
							right: "15px",
							fontWeight: "bold",
							color: "blue"
						}}
					>
						{this.props.courseLabel}
					</p>
					{tags.slice(0, maxNumTags).map((tag, rank) => {
						let tagLabel = tag[0];
						let score = tag[1];
						// console.log(tagLabel, score);
						return (
							(score > scoreThreshold ||
								this.props.courseRank <= 3) && (
								<Tag
									className="no-href"
									type={this.props.tagColors[tagLabel]}
									role="listitem"
								>
									<span>{tagLabel}</span>
								</Tag>
							)
						);
					})}
				</ClickableTile>
			</div>
		);
	}
}

export default RecommendationsCourseTile;
