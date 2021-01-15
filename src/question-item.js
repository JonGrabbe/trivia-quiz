import React from 'react';
import RadioButton from './radio-button';

export default class QuestionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let userCorrectAnswer;
        let hasAnswered;
        if(this.props.question.isCorrect === true || this.props.question.isCorrect === false) {
            hasAnswered = true;
        } else {
            hasAnswered = false;
        }
        // let jsonText = JSON.parse(this.props.question);
        return (
            <div className="question-item-container">
                <div className="col2-container">
                    <p className="item">question: {this.props.pageNum + 1} / {this.props.maxPage + 1}</p>
                    <p className="item">score: {this.props.scoreNum}</p>
                </div>

                <div className="col2-container" id="nav-buttons-container">
                    <button className="item form-field-default small-button" onClick={this.props.prev}>prev</button>
                    <button className="item form-field-default small-button" onClick={this.props.next}>next</button>
                </div>

                <p className="question">{""+this.props.question.question}</p>

                <p>{this.props.question.isCorrect ? 'correct' : null}</p>
                <p>{this.props.question.isCorrect === false ? 'wrong! the correct answer is: '+this.props.question.correct_answer : null}</p>

                <ul className="possiple-answers-container">
                    {
                        this.props.question.randomAnswers.map(function(item) {
                            return (
                                <RadioButton 
                                    text={item}
                                    check={this.props.check}
                                    hasAnswered={hasAnswered}
                                    userCorrectAnswer={this.props.question.correct_answer}
                                    isCorrect={this.props.question.isCorrect}
                                    getRadioValue={this.props.getRadioValue}
                                />
                            );
                        }.bind(this))
                    }
                    {/* {<RadioButton text={this.props.question.correct_answer} check={this.props.check}/>} */}
                </ul>
                <button className="form-field-default start-button" onClick={this.props.check}>Submit</button>
                {/* <button value={this.props.question.correct_answer} onClick={this.props.check}>check</button> */}
            </div>
        );
    }    
}