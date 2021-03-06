import React from "react";

const Textarea = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <textarea className={`form-control ${props.className}`} cols="30" rows="3" id={props.name} name={props.name} value={props.value}
                   onChange={props.handleChange} placeholder={props.placeholder}/>
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    );
}

export default Textarea;