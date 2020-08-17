import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{'Spiderman Look & Find'}</h1>
                <button onClick={this.props.startGame}>Start Game</button>
            </div>
        )
    }
}

export default Header;