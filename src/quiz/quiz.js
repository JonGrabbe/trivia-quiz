import React from 'react';
import Header from './quiz-header';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="quiz-container">
                <Header handleClick={this.props.handleClick}/>
            </div>
        );
    }
}