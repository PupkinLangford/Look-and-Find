import React from 'react';
import './App.css';
import Photo from './Components/Photo';
import firebase from 'firebase';


function App() {
  firebase.initializeApp({projectId: "look-and-find-66c5d"})
  return (
    <div className="App">
      <Photo/>
    </div>
  );
}

export default App;
