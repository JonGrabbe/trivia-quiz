import React from 'react';
import Start from './start/start';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: undefined,
      history: 'ddd'
    }
  }

  async getCategoriesData() {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      if(response.ok) {
        const jsonResponse = await response.json();
        this.setState({
          categories: jsonResponse.trivia_categories
        })
        console.log(jsonResponse)
        //return jsonResponse;
      }
      throw new Error('Request failed!');
    } catch(error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getCategoriesData()
  }

  render() {
    return(
      <Start 
        categories={this.state.categories}
        history={this.state.history}
      />
    )
  }
}

export default App;
