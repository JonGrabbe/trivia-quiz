export default function Categories(props) {
    let cat;
    if(props.categories) {
        cat = (
          <div className="create-quiz-form-item-container">
            <label htmlFor="categories-select" className="new-quiz-form-item-heading">Categories</label>
            <select name="category" id="categories-select" onChange={props.handleChange}>
                {props.categories.map(item => <option className="categories-option" value={item.id}>{item.name}</option>)}
            </select>
          </div>
        );
    } else {
        cat = <p>fetching categories...</p>
    }
    return cat;
}