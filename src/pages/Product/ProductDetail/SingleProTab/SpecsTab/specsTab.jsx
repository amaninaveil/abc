import HeaderSection from "../../../../../components/common/HeaderSection/headerSection";
import React from "react";
import "./_specsTab.scss";
function SpecsTab(props) {
  const { specs, generalInfo } = props;
  const renderGeneralInfo = (generalInfo) => {
    return (
      <React.Fragment>
        <div className="d-flex gen-info">
          <div className="tag">Brand:</div>
          <div>{generalInfo.brandName}</div>
        </div>
        <div className="d-flex gen-info">
          <div className="tag">Warranty:</div>
          <div>{generalInfo.warranty} month(s)</div>
        </div>
      </React.Fragment>
    );
  };

  const renderSpecsInfo = (specifications) => {
    let result = [];
    if (specifications && specifications.length !== 0) {
      specifications.forEach((specification, index) => {
        if (index % 2 === 0) {
          result.push(
            <div className="row specs" key={index}>
              <div className="col-4 specs-tag text-capitalize">
                {specification.name}
              </div>
              <div className="col-8 specs-content text-capitalize">
                {specification.value}
              </div>
            </div>
          );
        } else {
          result.push(
            <div className="row specs specs-deco" key={index}>
              <div className="col-4 specs-tag text-capitalize">
                {specification.name}
              </div>
              <div className="col-8 specs-content text-capitalize">
                {specification.value}
              </div>
            </div>
          );
        }
      });
      return result;
    }
    return <div>No Specification Description</div>;
  };

  return (
    <div className="row">
      <div className="col-lg-5">
        <HeaderSection content="General Information" />
        {renderGeneralInfo(generalInfo)}
      </div>
      <div className="col-lg-7">
        <HeaderSection content="Product Specification" />
        {renderSpecsInfo(specs)}
      </div>
    </div>
  );
}

SpecsTab.propTypes = {};

export default SpecsTab;
