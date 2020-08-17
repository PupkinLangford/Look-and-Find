import React from 'react';

class Scoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const scores = this.props.scores.map((s) => {
            return <div><p>{`${s.name}: ${s.score}`}</p></div>
        });
        console.table(this.props.scores);
        return (
            <div>
                <h2>{this.props.score}</h2>
                {scores}
            </div>
        )
    }
}

export default Scoreboard;
