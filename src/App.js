import React from 'react';
import Start from './start';
import Quiz from './quiz';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            quizStart: false,
            responseError: false
        }
        // this.getData = this.getData.bind(this);
        this.getStartValue = this.getStartValue.bind(this);
        this.createNewQuiz = this.createNewQuiz.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.getScore = this.getScore.bind(this);
        this.endQuiz = this.endQuiz.bind(this);
        this.getRadioChangeValue = this.getRadioChangeValue.bind(this);
    }

    async getData(url) {
        try {
            const response = await fetch(url);
            if(response.ok) {
              const jsonResponse = await response.json();
              console.log(jsonResponse)
              return jsonResponse;
            }
            throw new Error('Request failed!');
          } catch(error) {
            console.log(error)
          }
    }

    async getCategories() {
        let endpoint = 'https://opentdb.com/api_category.php';
        let res = await this.getData(endpoint);
        // console.log(res)
        this.setState(function() {
            return {
                categories: res.trivia_categories
            }
        })
    }

    getStartValue(e) {
        let elm = e.currentTarget;
        let textVal = elm.value;
        let type = elm.getAttribute('typeval');
        this.setState(function() {
            return {
                [type]: textVal
            }
        })
    }

    async createNewQuiz() {
        const amount = 'amount=10&';
        let endpoint = 'https://opentdb.com/api.php?'+amount;
        const queryTerms = ['category', 'difficulty', 'type'];
        let state = this.state;
        queryTerms.forEach(function(item, index) {
            if(state[item]) {
                if(index === 0) {
                    endpoint += item+'='+state[item]
                } else {
                    endpoint += '&'+item+'='+state[item]
                }
            }
        })
        console.log(endpoint)
        
        let response = await this.getData(endpoint)
        this.random(response.results)
        if(response && response.response_code === 0) {
            this.setState(function() {
                return {
                    quizData: response,
                    quizStart: true,
                    score: 0,
                    responseError: false
                }
            })
        } else if(response.response_code === 1) {
            this.setState(function() {
                return {
                    responseError: true,
                    responseErrorMessage: 'no results found try changing the search options'
                }
            })
        }
    }

    endQuiz() {
        this.setState(function() {
            return {
                quizStart: false
            }
        })
    }

    checkAnswer(index, correct) {
        // console.log(val)
        // this.setState(function(prevState) {
        //     prevState.quizData.results[0].isCorrect = true
        //     return {
        //         quizData: prevState
        //     }
        // })
        
        if(!this.state.quizData.results[index].answered) {
            this.state.quizData.results[index].isCorrect = correct
            // this.setState({
            //     quizData: this.state.quizData
            // })
            this.setState(function() {
                return {
                    quizData: this.state.quizData
                }
            })
        }
        this.state.quizData.results[index].answered = true;


        // if(!this.state.quizData.results[index].answered) {
        //     this.setState(function(prevState) {
        //         return {
        //             quizData: prevState.quizData.results[index].isCorrect = correct,
        //         }
        //     })
        //     // this.setState(function(prevState) {
        //     //     return {
        //     //         quizData: prevState.quizData.results[index].answered = true
        //     //     }
        //     // })
        // }

    }

    getScore() {
        let score = 0;
        this.state.quizData.results.forEach(item => {
            if(item.answered && item.isCorrect) {
                score++;
            }
        })
        this.setState({
            score: score
        })
    }

    getRadioChangeValue(e) {
        let text = e.currentTarget.value;
        this.setState({
            radioValue: text
        })
    }

    checkRadio(index, correct) {
        if(!this.state.quizData.results[index].answered) {
            this.setState(function(prevState) {
                return {
                    quizData: prevState.quizData.results[index].isCorrect = correct,
                }
            })
            this.setState(function(prevState) {
                return {
                    quizData: prevState.quizData.results[index].answered = true
                }
            })
        }
    }

    random(arr) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        arr.forEach(function(item) {
            //generate a randomized array of possible answers and add the new array to each object as a property
            let answers = item.incorrect_answers.map(item => item);
            let correctAnswer = item.correct_answer;            
            let randomIndex = getRandomInt(0, answers.length);
            answers.splice(randomIndex, 0, correctAnswer)

            item.randomAnswers = answers;
        })
    }




    componentDidMount() {
        this.getCategories()
    }

    render() {
        let categoryName;
        if(this.state.category) {
            let catId;
            this.state.categories.forEach((item, index) => {
                if(item.id === parseInt(this.state.category)) {
                    catId = index
                }
            })
            if(catId !== undefined) {
                categoryName = this.state.categories[catId].name;
            }
        }

        //response error
        let noResponseError = this.state.responseError ? <p className="no-results">{this.state.responseErrorMessage}</p> : null;

        return (
            <div className="container">
                {this.state.quizStart ? null : <Start categories={this.state.categories} handleChange={this.getStartValue} startQuiz={this.createNewQuiz} noResponseError={noResponseError}/>}
                {this.state.quizStart && (this.state.responseError === false) 
                    ? 
                    <Quiz 
                        questionsArray={this.state.quizData} 
                        check={this.checkAnswer} score={this.getScore} 
                        scoreNum={this.state.score} endQuiz={this.endQuiz}
                        getRadioValue={this.getRadioChangeValue}
                        radioValue={this.state.radioValue}
                        categoryName={categoryName}
                        diff={this.state.difficulty}
                    />
                    : 
                    null}

                
            </div>
        );
    }
}