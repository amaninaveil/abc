import styled from "styled-components";
import { Link } from "react-router-dom";

export const BreadcrumbListStyle = styled.li`
  color: white;
  margin-right: 38px;
  display: inline;
  position: relative;
  text-transform: uppercase;
  font-weight: 600;
  &:first-child:after {
    content: "";
  }
  &::after {
    content: "/";
    position: absolute;
    left: -22px;
    color: white;
  }
`;

export const BreadcrumbLinkStyle = styled(Link)`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;
