import React from 'react';
import Start from './start/start';
import Quiz from './quiz/quiz';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: undefined,
      history: 'ddd',
      searchFilters: {},
      defaultQuestionLimit: 10,
      quizStarted: false,
      questionIndex: 0
    }
    this.getQuestionFilters = this.getQuestionFilters.bind(this);
    this.getEndpoint = this.getEndpoint.bind(this);
    this.getQuestionsData = this.getQuestionsData.bind(this);
    this.changeQuiz = this.changeQuiz.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  async getCategoriesData() {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      if(response.ok) {
        const jsonResponse = await response.json();
        this.setState({
          categories: jsonResponse.trivia_categories
        })
        // console.log(jsonResponse)
        //return jsonResponse;
        return;
      }
      throw new Error('Request failed!');
    } catch(error) {
      console.log(error)
    }
  }

  getQuestionFilters(e) {
    let elm = e.currentTarget;
    let name = elm.name;
    let value = elm.value;
    this.setState(function(prevState) {
      prevState.searchFilters[name] = value;
      return {
        searchFilters: prevState.searchFilters
      }
    })
  }

  componentDidMount() {
    this.getCategoriesData()
  }

  getEndpoint() {
    let endpoint = 'https://opentdb.com/api.php?amount='+this.state.defaultQuestionLimit;
    for(let property in this.state.searchFilters) {
      if(this.state.searchFilters[property]) {
        endpoint+='&'+property+'='+this.state.searchFilters[property]
      }
    }
    return endpoint
    // console.log(endpoint)
  }

  async getQuestionsData() {
    const endpoint = this.getEndpoint();
    console.log(endpoint)
    try {
      const response = await fetch(endpoint);
      if(response.ok) {
        const jsonResponse = await response.json();
        if(jsonResponse.response_code === 0) {
          /* this.setState({
            questionsData: jsonResponse,
            errorMessage: null,
            quizStarted: true
          }) */
          this.setState(function() {
            return {
              questionsData: jsonResponse,
              errorMessage: null
            }
          })
          this.addRandomOrderQuestions();
          this.setState(function() {
            return {
              quizStarted: true
            }
          })
          return true;  
        } else if(jsonResponse.response_code === 1) {
          this.setState(function() {
            return {
              errorMessage: 'no results found with the current search parameters'
            }
          })
          return false;
        } else if(jsonResponse.response_code === 2) {
          this.setState(function() {
            return {
              errorMessage: 'system error'
            }
          })
          return false;
        }
        //console.log(jsonResponse)
        //return jsonResponse;
        return;
      }
      throw new Error('Request failed!');
    } catch(error) {
      console.log(error)
    }
  }

  changeQuiz() {
    this.setState(function() {
      return {
        quizStarted: false,
        questionsData: null,
        questionIndex: 0
      }
    })
  }

  get currentQuestion() {
    return this.state.questionsData.results[this.state.questionIndex]
  }

  checkAnswer(e) {
    let answer = e.currentTarget.value;
    // let check = this.state.questionsData.results[this.state.questionIndex].correct_answer === answer;
    let check = this.currentQuestion.correct_answer === answer;
    console.log(this.currentQuestion)
    console.log(check)
    let currentIndex = this.state.questionIndex;
    this.setState(function(prevState) {
      return {
        questionsData: prevState.results[currentIndex].isCorrect = check
      }
    })
  }
  
  addRandomOrderQuestions() {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function randomOrderInArray(array, item) {
      let randomIndex = getRandomInt(0, array.length);
      let newArray = array.map(item => item);
      newArray.splice(randomIndex, 0, item);
      return newArray;
    }
    this.setState(function(prevState) {
      prevState.questionsData.results.forEach(item => {
        item.randomOrderPossibleQuestions = randomOrderInArray(item.incorrect_answers, item.correct_answer)
      })
    })
  }

  nextQuestion() {
    let limit = this.state.questionsData.results.length - 1;
    if(this.state.questionIndex < limit) {
      this.setState(function(prevState) {
          return {
              questionIndex: prevState.questionIndex + 1
          }
      })
    }
  }



  render() {
    // let start = (
    //   <Start 
    //     categories={this.state.categories}
    //     history={this.state.history}
    //     handle+ange={this.getQuestionFilters}
    //     startQuiz={this.getQuestionsData}
    //     errors={this.state.errorMessage}
    //   />
    // );
    // let quiz = (
    //   <Quiz 
    //     handleClick={this.changeQuiz}
    //     currentQuestion={this.state.questionsData.results[this.state.questionIndex]}
    //     next={this.nextQuestion}
    //   />
    // );
    // let quizStarted = this.state.quizStarted;
    // let html;
    // if(quizStarted) {
    //   html = quiz
    // } else {
    //   html = start
    // }
    return (
      <div>
        {
          this.state.quizStarted ? <Quiz 
                                      handleClick={this.changeQuiz}
                                      currentQuestion={this.state.questionsData.results[this.state.questionIndex]}
                                      next={this.nextQuestion}
                                    />
                                  :
                                  <Start 
                                    categories={this.state.categories}
                                    history={this.state.history}
                                    handleChange={this.getQuestionFilters}
                                    startQuiz={this.getQuestionsData}
                                    errors={this.state.errorMessage}
                                  />
        }
      </div>
    )
  }
}

export default App;
