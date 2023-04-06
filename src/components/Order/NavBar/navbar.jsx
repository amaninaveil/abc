import React from "react";
import {
  NavIconContainer,
  Icon,
  LinkContainer,
  NavTitle,
  NavTitleBackground,
  NavTitleContainer,
  NavTitleWrapper,
  BorderTopRadius,
  BorderBottomRadius,
  EmptyComponent,
} from "./style";
import { NavLink, useLocation } from "react-router-dom";
import { OrderStatus } from "../../../pages/Order/type";

function Navbar() {
  const OrderStatusNav = [
    {
      icon: "fas fa-ellipsis-h",
      href: "/your-orders/placed-order",
      title: OrderStatus.PLACED_ORDER,
    },
    {
      icon: "far fa-check-circle",
      href: "/your-orders/handling",
      title: OrderStatus.IN_HANDLING,
    },
    {
      icon: "fas fa-truck",
      href: "/your-orders/shipped",
      title: OrderStatus.SHIPPED,
    },
    {
      icon: "fas fa-home",
      href: "/your-orders/deliveried",
      title: OrderStatus.DELIVERIED,
    },
    {
      icon: "far fa-times-circle",
      href: "/your-orders/cancelled",
      title: OrderStatus.CANCELLED,
    },
  ];

  const location = useLocation();
  const getNavLinkClass = (path) => {
    return location.pathname.includes(path) ? "active" : "";
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100" style={NavTitleBackground}>
        <NavIconContainer className="col-2 p-0">
          <ul
            className="list-unstyled py-2 position-sticky"
            style={{ top: "70px" }}
          >
            <EmptyComponent />
            {OrderStatusNav.map((status) => (
              <LinkContainer
                className={getNavLinkClass(status.href)}
                key={status.href}
              >
                <NavLink to={status.href} className="py-2">
                  <Icon className={getNavLinkClass(status.href)}>
                    <i className={status.icon}></i>
                  </Icon>
                </NavLink>
              </LinkContainer>
            ))}
          </ul>
        </NavIconContainer>
        <div className="col-10 p-0">
          <ul
            className="list-unstyled  position-sticky"
            style={{ marginLeft: "2em", paddingTop: "0.8em", top: "70px" }}
          >
            {OrderStatusNav.map((status, index) => {
              var nextTab =
                index < OrderStatusNav.length - 1 && OrderStatusNav[index + 1];
              var nextActiveTab =
                nextTab && location.pathname.includes(nextTab.href)
                  ? BorderBottomRadius
                  : null;
              var prevTab = index > 0 && OrderStatusNav[index - 1];
              var prevActiveTab =
                prevTab && location.pathname.includes(prevTab.href)
                  ? BorderTopRadius
                  : null;

              return (
                <React.Fragment key={status.href}>
                  {index === 0 ? (
                    <NavTitleWrapper>
                      <NavTitleContainer
                        style={
                          location.pathname.includes(status.href)
                            ? BorderBottomRadius
                            : null
                        }
                      >
                        <EmptyComponent />
                      </NavTitleContainer>
                    </NavTitleWrapper>
                  ) : null}
                  <NavTitleWrapper className={getNavLinkClass(status.href)}>
                    <NavTitleContainer
                      className={getNavLinkClass(status.href)}
                      style={prevActiveTab || nextActiveTab}
                    >
                      <NavTitle to={status.href}>
                        {status.title}
                      </NavTitle>
                    </NavTitleContainer>
                  </NavTitleWrapper>
                  {index === OrderStatusNav.length - 1 &&
                  location.pathname.includes(status.href) ? (
                    <NavTitleWrapper>
                      <NavTitleContainer style={BorderTopRadius}>
                        <EmptyComponent />
                      </NavTitleContainer>
                    </NavTitleWrapper>
                  ) : null}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
