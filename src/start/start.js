import React from 'react';
import Header from './start-header';
import Categories from './categories';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: undefined
        }
    }

    

    render() {
        let history = this.props.history;
        return(
            <div className="start">
                <Header />
                <div className="col left-col start-new-quiz-form">
                    <Categories categories={this.props.categories}/>
                    <div className="new-quiz-form-item">
                       <h2 className="new-quiz-form-item-heading">Question type</h2>
                       <div className="new-quiz-radio-items-container">
                            <div className="new-quiz-radio-item">
                                <input type="radio" name="question-type" value="any" id="any"/>
                                <label htmlFor="any">any</label>
                            </div>
                            <div className="new-quiz-radio-item">
                                <input type="radio" name="question-type" value="boolean" id="boolean"/>
                                <label htmlFor="boolean">true or false</label>
                            </div>
                            <div className="new-quiz-radio-item">
                                <input type="radio" name="question-type" value="difficulty" id="difficulty"/>
                                <label htmlFor="difficulty">Difficulty</label>
                            </div>
                       </div>
                    </div>
                </div>
                <div className="col right-col start-history-container">

                </div>
            </div>        
        )
        
    }
}