import React from "react";

function FilterButton(props) {
  return (
        <button
          id={props.name}
          type="button"
          className={`btn btn-outline-dark ms-2 mb-3 filterBtn ${props.name==="All"? "active": ""}`}
          onClick={() => {props.selectOne(props.name);props.setFilter(props.name); props.setSearching(false)}}
        >
            <span>{props.name}</span>
        </button>
      );
}

export default FilterButton;