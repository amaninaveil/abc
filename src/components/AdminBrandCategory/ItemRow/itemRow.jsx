import React from "react";

function ItemRow(props) {
  const { item, no, updateItemModal } = props;

  const convertDate = (date) => {
    let newDate = new Date(date);
    newDate = newDate.toString().split(" ");
    let result = newDate[1] + " " + newDate[2] + ", " + newDate[3];
    return result;
  }

  return (
    <tr className="product-table-item separated-table-item">
      <td>{no}</td>
      <td className="">
        <img src={`${process.env.REACT_APP_API_URL}${item.img}`} alt="" />
      </td>
      <td className="text-center name">
        <div>
          <b>{item.name}</b>
        </div>
      </td>
      <td className="text-center ">
        <b>{convertDate(item.createdDate)}</b>
      </td>
      <td className="text-center ">
        <b>{convertDate(item.lastModified)}</b>
      </td>

      <td className="product-action">
        <div className="d-flex justify-content-between align-items-center">
          <i
            data-toggle="modal"
            data-target="#modalSuppiler"
            className="far fa-eye"
            onClick={() => updateItemModal({ item, action: "View" })}
          ></i>
          <i
            data-toggle="modal"
            data-target="#modalRemoveSuppiler"
            className="fa fa-times"
            onClick={() => updateItemModal({ item, action: "Remove" })}
          ></i>
        </div>
      </td>
    </tr>
  );
}

ItemRow.propTypes = {};

export default React.memo(ItemRow);
