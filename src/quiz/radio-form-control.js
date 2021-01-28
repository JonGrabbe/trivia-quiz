export default function RadioFormControl(props) {
    return (
        <div className="radio-form-item-container">
            <input type="radio" name="question" value={props.value} id={props.id}/>
            <label htmlFor={props.id}>{props.lableText}</label>
        </div>
    );
}