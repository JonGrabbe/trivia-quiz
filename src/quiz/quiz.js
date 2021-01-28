import React from 'react';
import Header from './quiz-header';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="quiz-container">
                <Header handleClick={this.props.handleClick} questions={this.props.questions}/>
                <div id="quiz-body-container">
                    <p>{this.props.questions.results[0].question}</p>
                </div>
            </div>
        );
    }
}