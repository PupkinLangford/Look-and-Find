import React from 'react';
import spiderman from '../images/spiderman.jpg'
import './Photo.css'

class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.toFind = ["Sewer", "Green Border", "Elevator", "Kitchen Door", "Stairs", "Bathroom"];
        this.state = {found: 0, modalLoc: null};
    }

    handleClick = (e) => {
        if(this.state.modalLoc) {
            this.setState({...this.state, modalLoc: null});
            return;
        }
        this.setState({...this.state, modalLoc: [e.pageX, e.pageY]});
        console.log(e.pageX, e.pageY);
    }

    renderModal = () => {
        if(!this.state.modalLoc) return;
        const myStyle = {
            display: 'block',
            left: this.state.modalLoc[0],
            top: this.state.modalLoc[1],
        };
        return <div className={'modal'} style={myStyle}>
            <select>
                {this.toFind.map((door) => <option value={door}>{door}</option>)}
            </select>
            <button>Submit</button>
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
