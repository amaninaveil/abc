import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavIconContainer = styled.div`
  background-color: var(--nav-container-icon-background);
  border-radius: 0 1.5em 1.5em 0;
`;

export const LinkContainer = styled.li`
  position: relative;
  &.active::after {
    transition: 0.8s;
    position: absolute;
    content: "";
    background-color: white;
    height: 100%;
    width: 0.2em;
    top: 0;
    left: 0;
  }
`;

export const NavTitleBackground = { backgroundColor: "var(--nav-order-list-background" };

export const Icon = styled.span`
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  display: flex;
  border: 1.5px var(--nav-container-icon-background) solid;
  justify-content: center;
  border-radius: 0.4em;
  margin: 10px;
  padding: 10px;
  font-size: larger;
  &.active {
    transition: 0.8s;
    border: 1.5px rgb(255, 255, 255) solid;
    color: #ffffff;
  }
  &:hover {
    color: #ffffff;
  }
`;

export const NavTitle = styled(NavLink)`
  text-decoration: none;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  font-weight: bold;
  padding: 1.3em;
  font-size: small;
  &.active {
    transition: 0.8s;
    color: var(--nav-order-primary-font-color);
    &:hover {
      color: var(--nav-order-primary-font-color);
    }
  }
  &:hover {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
  }
`;
export const NavTitleWrapper = styled.li`
  background: white;
  &.active {
    transition: 0.8s;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
`;

export const NavTitleContainer = styled.div`
  background: var(--nav-order-list-background);
  &.active {
    background: white;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
`;

export const EmptyComponent = styled.div`
  height: 30px;
`

export const BorderTopRadius = {borderTopRightRadius: '30px'}
export const BorderBottomRadius = {borderBottomRightRadius: '30px'}
