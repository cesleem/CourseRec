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
      InterestsScreen: true,
      ConstraintsScreen: false,
      RecommendationsScreen: false
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
    console.log(screen);
    this.setState({
      InterestsScreen: screen === "InterestsScreen" || false,
      ConstraintsScreen: screen === "ConstraintsScreen" || false,
      RecommendationsScreen: screen === "RecommendationsScreen" || false
    });
    console.log(this.state);
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
          <ProgressIndicator currentIndex={0}>
            <ProgressStep label="Step 1" secondaryLabel="Interests" />
            <ProgressStep label="Step 2" secondaryLabel="Constraints" />
            <ProgressStep label="Step 3" secondaryLabel="Your Recs!" />
          </ProgressIndicator>
        </div>
        {this.state.InterestsScreen && (
          <InterestsScreen advancePage={this.advancePage.bind(this)} />
        )}
        {this.state.ConstraintsScreen && (
          <ConstraintsScreen advancePage={this.advancePage.bind(this)} />
        )}
        {this.state.RecommendationsScreen && <RecommendationsScreen />}
      </div>
    );
  }
}

export default App;
