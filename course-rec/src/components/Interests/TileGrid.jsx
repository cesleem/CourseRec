import React, { Component } from "react";
import { SelectableTile } from "carbon-components-react";
import firebase from "firebase";

class InterestsTileGrid extends Component {
	constructor() {
		super();
		this.state = { items: [] };
	}

	componentWillMount() {
		return firebase
			.firestore()
			.collection("interests")
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					var item = doc.data() || "Not Working";
					// console.log(item);
					this.setState({ items: this.state.items.concat(item) });
				});
			});
	}

	render() {
		let items = this.state.items;
		return (
			<div
				className="container"
				style={{
					flex: "1",
					display: "flex",
					overflow: "auto",
					justifyContent: "center"
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
						alignItems: "center",
						maxHeight: "400px",
						maxWidth: "75%"
					}}
				>
					{items.map(item => (
						<SelectableTile
							name={item.categoryLabel}
							handleClick={this.props.addInterests.bind(
								this,
								item.categoryLabel
							)}
						>
							{item.categoryLabel}
						</SelectableTile>
					))}
				</div>
			</div>
		);
	}
}

export default InterestsTileGrid;
