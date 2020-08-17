import React from 'react';

class Scoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const scores = this.props.scores.map((s, ind) => {
            return <div><p>{`${ind + 1}. ${s.name}: ${s.score} seconds`}</p></div>
        });
        console.table(this.props.scores);
        return (
            <div>
                <h2>{`Your Time: ${this.props.score} seconds`}</h2>
                <h2>{'High Scores:'}</h2>
                {scores}
            </div>
        )
    }
}

export default Scoreboard;
