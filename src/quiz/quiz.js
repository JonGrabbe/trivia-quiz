import React from 'react';
import Header from './quiz-header';
import RadioFormControl from './radio-form-control';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answerObjects: [],
            radioButtonValue: undefined
        }
        this.checkAnswer = this.checkAnswer.bind(this);
        this.getRadioButtonValue = this.getRadioButtonValue.bind(this);
    }


    checkAnswer() {
        
    }

    getRadioButtonValue(e) {
        let val = e.currentTarget.value;
        this.setState(() => {
            return {radioButtonValue: val}
        })
    }


    render() {
        return (
            <div id="quiz-container">
                <Header handleClick={this.props.handleClick} currentQuestion={this.props.currentQuestion}/>
                <div id="quiz-body-container">
                    <p>{this.props.currentQuestion.question}</p>
                    <ul>
                        {this.props.currentQuestion.randomOrderPossibleQuestions.map((item, i) => {
                           return ( 
                                <RadioFormControl 
                                    value={item}
                                    id={i}
                                    lableText={item}
                                    handleChange={this.getRadioButtonValue}
                                />
                            )
                        })}    
                    </ul>
                    <button onClick={this.checkAnswer}>check</button>
                    <button onClick={this.props.next}>next</button>
                </div>
            </div>
        );
    }
}