import React from 'react';
import Select from './select';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div className="start-container">
                <h1>Trivia Quiz</h1>
                
                <div className="form-item-container">
                    <label className="form-label-start" htmlFor="categories">Categories</label>
                    {this.props.categories ? <Select items={this.props.categories} handleChange={this.props.handleChange} id='categories'/> : null}
                </div>
                
                <div className="form-item-container">
                    <label className="form-label-start" htmlFor="difficulty">difficulty</label>
                    <select className="form-field-default" name="" id="difficulty" typeval="difficulty" onChange={this.props.handleChange}>
                        <option value="">any</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                
                <div className="form-item-container">
                    <label className="form-label-start" htmlFor="type">Type of question</label>
                    <select className="form-field-default" name="" id="type" onChange={this.props.handleChange} typeval="type">
                        <option value="">any</option>
                        <option value="multiple">Multiple answer</option>
                        <option value="boolean">True or False</option>
                    </select>
                </div>

                {this.props.noResponseError ? this.props.noResponseError : null}

                <button className="form-field-default start-button" onClick={this.props.startQuiz}>Create quiz</button>
            </div>
        );
    }
}