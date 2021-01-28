import React from 'react';
import Header from './quiz-header';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestionIndex: 0
        }
        this.next = this.next.bind(this);
    }


    next() {
        let limit = this.props.questions.results.length - 1;
        if(this.state.currentQuestionIndex < limit) {
            this.setState(function(prevState) {
                return {
                    currentQuestionIndex: prevState.currentQuestionIndex + 1
                }
            })
        }
            
    }

    checkAnswer(e) {
        let currentQuestion = this.props.questions.results[this.state.currentQuestionIndex];
        let val = e.currentTarget.value;
        if(val === currentQuestion.correct_answer) {
            currentQuestion.isCorrect = true;
        }
    }

    render() {
        let currentQuestion = this.props.questions.results[this.state.currentQuestionIndex];
        
        return (
            <div id="quiz-container">
                <Header handleClick={this.props.handleClick} questions={this.props.questions}/>
                <div id="quiz-body-container">
                    <p>{this.props.questions.results[this.state.currentQuestionIndex].question}</p>
                    <ul>
                        <li>
                            <input type="text"/>
                        </li>
                        {currentQuestion.incorrect_answers.map(item => <li>{item}</li>)}
                    </ul>
                    <button onClick={this.next}>next</button>
                </div>
            </div>
        );
    }
}