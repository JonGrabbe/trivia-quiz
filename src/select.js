import Option from './option';

export default function Select(props) {
    return (
        <select name="" id={props.id} className="form-field-default select" onChange={props.handleChange} typeval="category">
            <option value="">Any</option>
            {props.items.map(obj => <Option item={obj} />)}
        </select>
    );
}