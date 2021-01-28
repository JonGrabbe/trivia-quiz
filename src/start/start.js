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
                    <Categories categories={this.props.categories} handleChange={this.props.handleChange}/>
                    <div className="create-quiz-form-item-container">
                        <h2 className="new-quiz-form-item-heading">Question type</h2>
                        <p className="radio-item-container">
                            <input type="radio" name="type" value="" id="any" onChange={this.props.handleChange}/>
                            <label htmlFor="any">any</label>
                        </p>
                        <p className="radio-item-container">
                            <input type="radio" name="type" value="boolean" id="boolean" onChange={this.props.handleChange}/>
                            <label htmlFor="boolean">true / false</label>
                        </p>
                        <p className="radio-item-container">
                            <input type="radio" name="type" value="multiple" id="multiple" onChange={this.props.handleChange}/>
                            <label htmlFor="multiple">multiple</label>
                        </p>
                    </div>
                    <div className="create-quiz-form-item-container">
                        <h2 className="new-quiz-form-item-heading">Difficulty</h2>
                        <div className="radio-items-container">
                            <p className="radio-item-container">
                                <input type="radio" name="difficulty" value="" id="any-difficulty" onChange={this.props.handleChange}/>
                                <label htmlFor="any-difficulty">any</label>
                            </p>
                            <p className="radio-item-container">
                                <input type="radio" name="difficulty" value="easy" id="easy" onChange={this.props.handleChange}/>
                                <label htmlFor="easy">easy</label>
                            </p>
                            <p className="radio-item-container">
                                <input type="radio" name="difficulty" value="medium" id="medium" onChange={this.props.handleChange}/>
                                <label htmlFor="medium">medium</label>
                            </p>
                            <p className="radio-item-container">
                                <input type="radio" name="difficulty" value="hard" id="hard" onChange={this.props.handleChange}/>
                                <label htmlFor="hard">hard</label>
                            </p>
                        </div>
                    </div>
                    {this.props.errors ? <p>{this.props.errors}</p>: null}
                    <button id="start-quiz-button" className="main-button" onClick={this.props.startQuiz}>start new quiz</button>
                </div>
                <div className="col right-col start-history-container">

                </div>
            </div>        
        )
        
    }
}