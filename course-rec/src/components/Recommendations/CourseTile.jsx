import React, { Component } from "react";
import { ClickableTile, Tag } from "carbon-components-react";

class RecommendationsCourseTile extends Component {
	render() {
		return (
			<div>
				<ClickableTile id="tile-5" name="tiles">
					Computer Networking
					<Tag className="some-class" type="red" role="listitem">
						Computer Networks
					</Tag>
				</ClickableTile>
			</div>
		);
	}
}

export default RecommendationsCourseTile;
