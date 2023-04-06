import styled from "styled-components";

export const HeaderSectionStyle = styled.h4`
  position: relative;
  display: inline-block;
  padding: 0 0 8px;
  color: var(--home-header);
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #f8fafc;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    width: 100px;
    background-color: var(--home-header);
  }
`;
