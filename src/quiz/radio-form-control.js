export default function RadioFormControl(props) {
    return (
        <li className="possible-answer-container" key={props.id}>
            <input type="radio" name="question" value={props.value} id={props.id}/>
            <label htmlFor={props.id}>{props.lableText}</label>
        </li>
    );
}