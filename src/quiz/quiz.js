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


    checkAnswer(e) {
        let currentQuestion = this.props.questions.results[this.state.currentQuestionIndex];
        let val = e.currentTarget.value;
        if(val === currentQuestion.correct_answer) {
            currentQuestion.isCorrect = true;
        }
    }

    render() {
        //let currentQuestion = this.props.questions.results[this.state.currentQuestionIndex];
        
        return (
            <div id="quiz-container">
                <Header handleClick={this.props.handleClick} questions={this.props.questions}/>
                <div id="quiz-body-container">
                    <p>{this.props.currentQuestion.question}</p>
                    <ul>
                        <li>
                            <input type="text"/>
                        </li>
                        {/* {currentQuestion.incorrect_answers.map(item => <li>{item}</li>)} */}
                    </ul>
                    <button onClick={this.props.next}>next</button>
                </div>
            </div>
        );
    }
}