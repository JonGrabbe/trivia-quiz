export default function Option(props) {
    return (
        <option value={props.item.id}>
            {props.item.name}
        </option>
    )
}