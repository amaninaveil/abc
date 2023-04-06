import React from "react";
import LongDescriptionInput from "../../../../../components/AdminProduct/LongDescriptionInput/longDescriptionInput";
import "./_longDescription.scss";
import parseDescription from "../../../../../helpers/parseDescription";

function LongDescription(props) {
  const { product } = props;
  const descriptions = parseDescription(product?.longDescrip);

  const renderLongDescriptionArea = () => {
    let result = [];
    if (descriptions.length > 0) {
      descriptions.forEach((description, index) =>
        result.push(
          <LongDescriptionInput key={index} description={description} />
        )
      );
    }
    for (let i = result.length; i < 3; i++) {
      result.push(<LongDescriptionInput key={result.length} />);
    }
    return result;
  };

  return (
    <div className="long-description">
      <div className="text-center header">Long Description</div>
      <p className="text-center">
        <small>
          * Each product can add only 3 paragraphs for long description.
        </small>
      </p>

      {renderLongDescriptionArea()}
    </div>
  );
}

LongDescription.propTypes = {};

export default LongDescription;
