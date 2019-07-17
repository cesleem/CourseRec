import React, { Component } from "react";
import { ProgressIndicator, ProgressStep } from "carbon-components-react";
import InterestsScreen from "./screens/Interests/Screen";
import ConstraintsScreen from "./screens/Constraints/Screen";
import RecommendationsScreen from "./screens/Recommendations/Screen";

// import firebase from "firebase";
import firebase from "firebase/app";

class App extends Component {
  constructor() {
    super();

    this.state = {
      courses: {},
      currentIndex: 0,
      InterestsScreen: true,
      ConstraintsScreen: false,
      RecommendationsScreen: false,
      SelectedInterests: [],
      SelectedConstraints: {
        difficulty: 3,
        effort: 10,
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

  componentDidMount() {
    return firebase
      .firestore()
      .collection("courses")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var course = doc.data() || "Not Working";
          // console.log(course.name);
          this.setState({
            courses: {
              ...this.state.courses,
              [course.name]: course
            }
          });
        });
      });
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
    // console.log(interest);

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
    // console.log(constraint, newValue);
    var selectedConstraints = this.state.SelectedConstraints;
    selectedConstraints[constraint] = newValue;
    this.setState({
      SelectedConstraints: selectedConstraints
    });
  }

  render() {
    return (
      <div>
        {
          (window.onbeforeunload = function() {
            return "Changes you made may not be saved.";
          })
        }
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
            SelectedInterests={this.state.SelectedInterests}
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
            SelectedConstraints={this.state.SelectedConstraints}
            courses={this.state.courses}
          />
        )}
      </div>
    );
  }
}

export default App;
