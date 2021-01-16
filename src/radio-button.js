export default function RadioButton(props) {
    let labelClassName = 'radio-button-label';
    if(props.hasAnswered === true && props.text === props.userCorrectAnswer) {
        labelClassName += ' true-text-color';
    }
    // if(props.hasAnswered === true && props.isCorrect === false && props.text === props.userCorrectAnswer) {
    //     labelClassName += ' false-text-color';
    // }

    return (
        <div className="radio-button-container" key={props.text}>
            <input type="radio" name="question" id={props.text} value={props.text} onChange={props.getRadioValue}/>
            <label dangerouslySetInnerHTML={{__html: props.text}} htmlFor={props.text} className={labelClassName}></label>
        </div>
    );
}