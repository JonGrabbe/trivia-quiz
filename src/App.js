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
      quizStarted: false
    }
    this.getQuestionFilters = this.getQuestionFilters.bind(this);
    this.getEndpoint = this.getEndpoint.bind(this);
    this.getQuestionsData = this.getQuestionsData.bind(this);
    this.changeQuiz = this.changeQuiz.bind(this);
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
          this.setState({
            questionsData: jsonResponse,
            errorMessage: null,
            quizStarted: true
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
        questionsData: null
      }
    })
  }
  

  render() {
    let start = (
      <Start 
        categories={this.state.categories}
        history={this.state.history}
        handleChange={this.getQuestionFilters}
        startQuiz={this.getQuestionsData}
        errors={this.state.errorMessage}
      />
    );
    let quiz = (
      <Quiz 
        handleClick={this.changeQuiz}
        questions={this.state.questionsData}
      />
    );
    let quizStarted = this.state.quizStarted;
    let html;
    if(quizStarted) {
      html = quiz
    } else {
      html = start
    }
    return (
      <div>{html}</div>
    )
  }
}

export default App;
