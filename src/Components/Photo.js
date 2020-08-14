import React from 'react';
import spiderman from '../images/spiderman.jpg'
import './Photo.css'
import firebase from 'firebase'

class Photo extends React.Component {
    constructor(props) {
        super(props);
        const toFind = ["Sewer", "Green Border", "Elevator", "Kitchen Door", "Stairs", "Bathroom"];
        this.state = {doors: toFind, modalLoc: null, modalDoor: null};
    }

    handleClick = (e) => {
        if(this.state.modalLoc) {
            this.setState({...this.state, modalLoc: null});
            return;
        }
        this.setState({...this.state, modalLoc: [e.pageX, e.pageY]});
        console.log(e.pageX, e.pageY);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const validate = firebase.functions().httpsCallable('Locations');
        const selectedDoor = this.state.modalDoor;
        const coords = [this.state.modalLoc[0], this.state.modalLoc[1]];
        validate({door: selectedDoor, x: coords[0], y: coords[1]})
        .then((result) => {
            if(result.data) {
                this.setState({...this.state, 
                doors: [...this.state.doors].filter((d) => d!== selectedDoor),
                modalLoc: null, modalDoor: null});
            }
            else {
                this.setState({...this.state, modalLoc: null, modalDoor: null});
            }
        });
    }

    renderModal = () => {
        if(!this.state.modalLoc) return;
        const myStyle = {
            display: 'block',
            left: this.state.modalLoc[0],
            top: this.state.modalLoc[1],
        };
        return <div className={'modal'} style={myStyle}>
            <select onChange={(e) => this.setState({...this.state, modalDoor: e.target.value})}>
                <option value={""} selected disabled hidden>Select a door</option> 
                {this.state.doors.map((door) => <option value={door}>{door}</option>)}
            </select>
            <button onClick={this.handleSubmit}>Submit</button>
        </div>
    }

    render() {
        return (
            <div className={'photoContainer'}>
                <img className={'mainPhoto'} src={spiderman} alt='' onClick={this.handleClick}/>
                {this.renderModal()}
            </div>
        )
    }

}

export default Photo;
