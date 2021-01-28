export default function Categories(props) {
    let cat;
    if(props.categories) {
        cat = (
          <div className="new-quiz-form-item">
            <label htmlFor="categories-select" className="new-quiz-form-item-label">Category</label>
            <select name="" id="categories-select">
                {props.categories.map(item => <option className="categories-option">{item.name}</option>)}
            </select>
          </div>
        );
    } else {
        cat = <p>fetching categories...</p>
    }
    return cat;
}