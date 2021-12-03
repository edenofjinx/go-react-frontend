const Select = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                {" "}{props.title}{" "}
            </label>
            <select name={props.name} id={props.name} value={props.value} onChange={props.handleChange}
                    className={`form-select ${props.className}`}>
                <option value="">{props.placeholder}</option>
                {props.options.map((option) => {
                    return (
                        <option className="form-select" key={option.id} value={option.id} label={option.value}>
                            {option.value}
                        </option>
                    )
                })}
            </select>
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    );
};

export default Select;