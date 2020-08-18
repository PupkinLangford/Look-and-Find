import React from 'react';
import './Header.css'

class Header extends React.Component {
    render() {
        return (
            <div className={'header'}>
                <h1>{'Spiderman Look & Find'}</h1>
                <button onClick={this.props.startGame}>Start Game</button>
            </div>
        )
    }
}

export default Header;