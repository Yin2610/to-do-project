import React from "react";

function FilterButton(props) {
  return (
    <button
      id={props.name}
      type="button"
      className="btn btn-outline-dark ms-2 mb-3 filterBtn"
      data-bs-toggle="button"
      aria-pressed={props.isPressed}
      onClick={() => {props.selectOne(props.name);props.setFilter(props.name); }}
    >
        <span>{props.name}</span>
    </button>
  );
}

export default FilterButton;