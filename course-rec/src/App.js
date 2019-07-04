import React, { Component } from "react";
import { ProgressIndicator, ProgressStep } from "carbon-components-react";
import InterestsScreen from "./screens/Interests/Screen";
import ConstraintsScreen from "./screens/Constraints/Screen";
import RecommendationsScreen from "./screens/Recommendations/Screen";

import firebase from "firebase";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0,
      InterestsScreen: true,
      ConstraintsScreen: false,
      RecommendationsScreen: false,
      SelectedInterests: [],
      SelectedConstraints: {
        difficulty: 1,
        effort: 2,
        quality: 3
      }
    };

    var firebaseConfig = {
      apiKey: "AIzaSyDm1A3lqhENNbQR_5B08x-6qTEql3iuZfQ",
      authDomain: "courserec-adfe3.firebaseapp.com",
      databaseURL: "https://courserec-adfe3.firebaseio.com",
      projectId: "courserec-adfe3",
      messagingSenderId: "701478358471",
      appId: "1:701478358471:web:ad9730993bc2ec3e"
    };

    firebase.initializeApp(firebaseConfig);
  }

  advancePage(screen) {
    var screenIndex = {
      InterestsScreen: 0,
      ConstraintsScreen: 1,
      RecommendationsScreen: 2
    };
    console.log(screen);
    this.setState({
      InterestsScreen: screen === "InterestsScreen" || false,
      ConstraintsScreen: screen === "ConstraintsScreen" || false,
      RecommendationsScreen: screen === "RecommendationsScreen" || false,
      currentIndex: screenIndex[screen]
    });
    console.log(this.state);
  }

  addInterests(interest) {
    console.log(interest);

    if (this.state.SelectedInterests.includes(interest)) {
      this.setState({
        SelectedInterests: this.state.SelectedInterests.filter(
          item => item !== interest
        )
      });
      console.log("removed");
    } else {
      this.setState({
        SelectedInterests: this.state.SelectedInterests.concat(interest)
      });
      console.log("added");
    }
  }

  addConstraints(constraint, newValue) {
    console.log(constraint, newValue);
    var selectedConstraints = this.state.SelectedConstraints;
    selectedConstraints[constraint] = newValue;
    this.setState({
      SelectedConstraints: selectedConstraints
    });
  }

  render() {
    return (
      <div>
        <div
          style={{
            padding: "3em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <ProgressIndicator currentIndex={this.state.currentIndex}>
            <ProgressStep label="Step 1" secondaryLabel="Interests" />
            <ProgressStep label="Step 2" secondaryLabel="Constraints" />
            <ProgressStep label="Step 3" secondaryLabel="Your Recs!" />
          </ProgressIndicator>
        </div>
        {this.state.InterestsScreen && (
          <InterestsScreen
            advancePage={this.advancePage.bind(this)}
            addInterests={this.addInterests.bind(this)}
          />
        )}
        {this.state.ConstraintsScreen && (
          <ConstraintsScreen
            SelectedConstraints={this.state.SelectedConstraints}
            addConstraints={this.addConstraints.bind(this)}
            advancePage={this.advancePage.bind(this)}
          />
        )}
        {this.state.RecommendationsScreen && (
          <RecommendationsScreen
            SelectedInterests={this.state.SelectedInterests}
          />
        )}
      </div>
    );
  }
}

export default App;
