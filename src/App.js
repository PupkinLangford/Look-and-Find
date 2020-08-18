import React from 'react';
import './App.css';
import Photo from './Components/Photo';
import Header from './Components/Header';
import Scoreboard from './Components/Scoreboard';
import firebase from 'firebase';


class App extends React.Component{
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp({projectId: "look-and-find-66c5d"});
    }
    const query = firebase.firestore().collection('scores').orderBy('score').limit(10);
    this.scores = [];
    query.onSnapshot(snapshot => {
      snapshot.forEach(entry => {
        const data = entry.data();
        this.scores.push({name: data.name, score: data.score});
      });
    });
    this.state = {pregame: true, postgame: false};
  }

  startGame = () => {this.setState({...this.state, pregame: false, time:0})}
  gameOver = (endTime) => {
    this.setState({...this.state, time: endTime/1000});
    if(this.state.time < this.scores[this.scores.length - 1].score || this.scores.length < 10) {
      let username = prompt("New high score! Enter your name");
      if (!username) username = 'Anonymous';
      if (username.length > 20) username = username.substring(0, 20);
      firebase.firestore().collection('scores').add({name: username, score: this.state.time});
      const query = firebase.firestore().collection('scores').orderBy('score').limit(10);
      query.onSnapshot(snapshot => {
        this.scores = [];
        snapshot.forEach(entry => {
          const data = entry.data();
          this.scores.push({name: data.name, score: data.score});
        });
        this.setState({...this.state, postgame: true});
      });
    } else {
      this.setState({...this.state, postgame: true});
    }
  }
  render() {
    let display;
    if (this.state.pregame) display = <Header startGame={this.startGame}/>
    else if (this.state.postgame) display = <Scoreboard score={this.state.time} scores={[...this.scores]}/>
    else display = <Photo gameOver={this.gameOver}/>
    return (
      <div className="App">
        {display}
      </div>
    );
  }
}

export default App;
