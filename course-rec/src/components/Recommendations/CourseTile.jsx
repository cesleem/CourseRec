import React, { Component } from "react";
import { ClickableTile, Tag } from "carbon-components-react";

class RecommendationsCourseTile extends Component {
	render() {
		return (
			<div>
				<ClickableTile
					id="tile-5"
					name="tiles"
					style={{ height: "165px", width: "309px" }}
				>
					<p
						style={{
							position: "absolute",
							bottom: "15px",
							right: "15px",
							fontWeight: "bold"
						}}
					>
						{this.props.courseLabel}
					</p>
					{this.props.tags.map(tagLabel => (
						<Tag
							className="some-class"
							type={this.props.tagColors[tagLabel]}
							role="listitem"
						>
							{tagLabel}
						</Tag>
					))}
				</ClickableTile>
			</div>
		);
	}
}

export default RecommendationsCourseTile;
