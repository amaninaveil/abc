import React from "react";
import ItemRow from "../../../components/AdminBrandCategory/ItemRow/itemRow";
import "./_supportedTable.scss";
import "../../common/_separatedTable.scss";

function SupportedTable(props) {
  const { listItems, name, updateItemModal } = props;
  
  return (
    <div className="supported-table separated-table">
      <div className="header p-3">
        <h4 className="text-center">Our Supported Categories</h4>
        <div className="deco-line d-flex justify-content-center">
          <span></span>
        </div>
        <div className="text-right add-btn p-3">
          <button
            className="btn"
            data-toggle="modal"
            data-target="#modalSuppiler"
            data-backdrop="static"
            data-keyboard="false"
            onClick={() => updateItemModal({ action: "Add", name, item: null })}
          >
            <b>
              <i className="fas fa-plus mr-2"></i>Add new
            </b>
          </button>
        </div>
      </div>
      {listItems && listItems.length !== 0 ? (
        <table className=" my-4">
          <thead>
            <tr className="p-3">
              <th className="number">No.</th>
              <th className="text-center photo">Photo</th>
              <th className="name text-center">Name</th>
              <th className="day text-center">Created</th>
              <th className="day text-center">Last Modified</th>
              <th className="text-center action">Action</th>
            </tr>
          </thead>
          <tbody>
            {listItems
              .filter((item) => item.name !== "All")
              .map((item, index) => (
                <ItemRow
                  item={item}
                  key={item.id}
                  no={index + 1}
                  updateItemModal={(data) => updateItemModal({ ...data, name })}
                />
              ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No item is available</div>
      )}
    </div>
  );
}

SupportedTable.propTypes = {};

export default React.memo(SupportedTable);
