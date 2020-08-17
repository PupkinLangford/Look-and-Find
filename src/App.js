import React from 'react';
import './App.css';
import Photo from './Components/Photo';
import Header from './Components/Header';
import firebase from 'firebase';


class App extends React.Component{
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp({projectId: "look-and-find-66c5d"});
   }
    this.state = {pregame: true, postgame: false};
  }

  startGame = () => {this.setState({...this.state, pregame: false, time:0})}
  gameOver = (endTime) => {
    this.setState({...this.state, postgame: true, time: endTime/1000})}
  render() {
    let display;
    if (this.state.pregame) display = <Header startGame={this.startGame}/>
    else if (this.state.postgame) display = <h1>{this.state.time}</h1>
    else display = <Photo gameOver={this.gameOver}/>
    return (
      <div className="App">
        {display}
      </div>
    );
  }
}

export default App;
