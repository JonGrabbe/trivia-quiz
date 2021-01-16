import React from 'react';
import QuestionItem from './question-item';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionNum: 0,
            maxQuestion: undefined
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.prevQuestion = this.prevQuestion.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    nextQuestion() {
        this.setState(function(prevState) {
            if(this.state.questionNum+1 <= this.state.maxQuestion) {
                return {
                    questionNum: this.state.questionNum + 1
                }
            }
        })
    }

    prevQuestion() {
        this.setState(function(prevState) {
            if(this.state.questionNum > 0) {
                return {
                    questionNum: this.state.questionNum - 1
                }
            }
        })
    }

    componentDidMount() {
        //console.log(this.props.questionsArray.results)
        let maxQuestion = this.props.questionsArray.results.length-1;
        this.setState(function() {
            return {
                maxQuestion: maxQuestion
            }
        })
    }

    checkAnswer(e) {
        // let anwser = e.currentTarget.value;
        // let correctAnswer = this.props.questionsArray.results[this.state.questionNum].correct_answer;
        // if(anwser === correctAnswer) {
        //     this.props.check(this.state.questionNum, true)
        // }
        let isCorrect;
        //let answer = e.currentTarget.value;
        let answer = this.props.radioValue;
        let currentObj = this.props.questionsArray.results[this.state.questionNum];
        if(answer === currentObj.correct_answer) {
            isCorrect = true;
        } else {
            isCorrect = false;
        }
        this.props.check(this.state.questionNum, isCorrect)
        this.props.score()
    }


    render() {
        return (
            <div className="quiz-container">
                <h1>Trivia Quiz</h1>
                <div className="quiz-data-container">
                    {this.props.categoryName ? <h2>Category: {this.props.categoryName}</h2> : null}
                    {this.props.diff ? <h2>Difficulty: {this.props.diff}</h2> : null}
                    <button className="form-field-default small-button" id="start-quiz-button" onClick={this.props.endQuiz}>start new quiz</button>
                </div>
                <QuestionItem 
                    question={this.props.questionsArray.results[this.state.questionNum]}
                    next={this.nextQuestion}
                    prev={this.prevQuestion}
                    check={this.checkAnswer}
                    pageNum={this.state.questionNum}
                    maxPage={this.state.maxQuestion}
                    scoreNum={this.props.scoreNum}
                    getRadioValue={this.props.getRadioValue}
                />
            </div>
        )
    }
}   