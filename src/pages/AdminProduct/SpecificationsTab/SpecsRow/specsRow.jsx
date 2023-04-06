import React from "react";
import { CustomInput, FormGroup } from "reactstrap";
import { ATTRIBUTE_TYPE } from "../../ProductTab/ProductDetail/Specification/type";
import "./_specsRow.scss";
import ProductApi from "../../../../api/productApi";
import { useDispatch } from "react-redux";
import { showFailedMessage } from "../../../../utilities/slices/notificationSlice";

function SpecsRow(props) {
  const { specification, index, updateSpecsStatus, removeItem } = props;
  const dispatch = useDispatch();

  const editSpecsStatus = () => {
    ProductApi.updateSpecsStatus(specification.id)
      .then((res) => {
        updateSpecsStatus({
          ...specification,
          isDisabled: !specification.isDisabled,
        });
      })
      .catch(() => dispatch(showFailedMessage()));
  };
  return (
    <tr className="specifications-table-item separated-table-item">
      <td className="number">{index}</td>
      <td className="name">
        <div>{specification.name}</div>
      </td>
      <td className="type">
        <div>{ATTRIBUTE_TYPE[specification.dataType]}</div>
      </td>

      <td className="text-center">
        <FormGroup>
          <CustomInput
            type="switch"
            id={specification.id}
            checked={!specification.isDisabled}
            onChange={editSpecsStatus}
          />
        </FormGroup>
      </td>

      <td className="product-action action text-center">
        <i
          data-toggle="modal"
          data-target="#modalRemoveAttribute"
          className="fa fa-times"
          onClick={() => removeItem(specification)}
        ></i>
      </td>
    </tr>
  );
}

SpecsRow.propTypes = {};

export default React.memo(SpecsRow);
