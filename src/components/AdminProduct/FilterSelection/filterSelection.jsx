import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import { updateBrandFilter } from "../../../utilities/slices/brandSlice";
import { updateCategoryFilter } from "../../../utilities/slices/categorySlice";
import {
  addFilter,
  removeFilter,
} from "../../../utilities/slices/filterProduct";
import "./_filterSelection.scss";

function FilterSelection(props) {
  const { selections, name } = props;
  const ref = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdownOnClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const closeDropdownMenu = (e) => {
      // if dropdown menu is open and user click component which is not in (meaning outside) ref (in this case, ref is dropdown menu)
      if (dropdownOpen && ref.current && !ref.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdownMenu);
    return () => {
      document.removeEventListener("mousedown", closeDropdownMenu);
    };
  }, [dropdownOpen]);

  const updateFilterItems = (isCheckedAction, selectedItem) => {
    const item = {
      id: selectedItem.id,
      name: selectedItem.name,
    };
    if (name === "Category") {
      dispatch(
        updateCategoryFilter({
          id: selectedItem.id,
          isCheckedAction: isCheckedAction,
        })
      );
    } else {
      dispatch(
        updateBrandFilter({
          id: selectedItem.id,
          isCheckedAction: isCheckedAction,
        })
      );
    }

    if (isCheckedAction) {
      dispatch(addFilter({ ...item, itemCategory: name }));
    } else {
      dispatch(removeFilter(item));
    }
  };

  return (
    <div className="filter-selection " ref={ref}>
      <div
        onClick={toggleDropdownOnClick}
        className="d-flex align-items-center h-100"
      >
        <div className="mr-2">{name}</div>
        <span>
          <i className="fas fa-chevron-down"></i>
        </span>
      </div>
      <div className={`selection-menu ${dropdownOpen ? "active" : ""}`}>
        {selections.map((selection) => (
          <div className="selection-item px-2 py-1" key={selection.name}>
            <FormGroup check>
              <Label check className="w-100">
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    updateFilterItems(e.target.checked, selection)
                  }
                  checked={selection.isCheckedByAdmin}
                />
                {selection.name}
              </Label>
            </FormGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

FilterSelection.propTypes = {};

export default React.memo(FilterSelection);
