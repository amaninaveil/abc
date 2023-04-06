import React from "react";
import { useSelector } from "react-redux";
import { BreadcrumbListStyle, BreadcrumbLinkStyle } from './style';

function Breadcrumb() {
  const { breadcrumb } = useSelector((state) => state.breadcrumb);
  const renderBreadcrumb = (breadcrumb) => {
    return breadcrumb.length !== 0
      ? breadcrumb.map((element, index) =>
          index !== breadcrumb.length - 1 ? (
            <BreadcrumbListStyle key={index}>
              <BreadcrumbLinkStyle to={element.slug}>{element.name}</BreadcrumbLinkStyle>
            </BreadcrumbListStyle>
          ) : (
            <BreadcrumbListStyle key={index} className="text-dark">
              {element.name}
            </BreadcrumbListStyle>
          )
        )
      : "";
  };
  return <ul className='p-0 list-unstyled' >{renderBreadcrumb(breadcrumb)}</ul>;
}

export default Breadcrumb;
