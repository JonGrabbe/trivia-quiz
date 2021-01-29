import React from 'react';
import Header from './quiz-header';
import RadioFormControl from './radio-form-control';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestionIndex: 0
        }
    }


    render() {
        //let currentQuestion = this.props.questions.results[this.state.currentQuestionIndex];
        
        return (
            <div id="quiz-container">
                <Header handleClick={this.props.handleClick} currentQuestion={this.props.currentQuestion}/>
                <div id="quiz-body-container">
                    <p>{this.props.currentQuestion.question}</p>
                    <ul>
                        {this.props.currentQuestion.randomOrderPossibleQuestions.map((item, i) => {
                           return ( <RadioFormControl 
                                value={item}
                                id={i}
                                lableText={item}
                            />)
                        })}    
                    </ul>
                    <button onClick={this.props.next}>next</button>
                </div>
            </div>
        );
    }
}