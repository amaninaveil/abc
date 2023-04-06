import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { NavLink, useLocation } from "react-router-dom";
import {
  MAX_PAGINATION_NAV_ITEM,
  PRODUCTS_PER_PAGE,
} from "../../../utilities/Constant";
import "./_productPagination.scss";

function ProductPagination(props) {
  const { totalProducts, currentPage } = props;

  const [firstPage, setFirstPage] = useState(0);
  const pageNumbers = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const pathname = useLocation().pathname;
  const prevPage = currentPage > 0 ? currentPage - 1 : 0;
  const nextPage =
    currentPage < pageNumbers - 1 ? currentPage + 1 : pageNumbers - 1;
  const generateUrl = (pageId) => {
    const page = pageId !== 0 ? `?page=${pageId}` : "";
    return `${pathname}${page}`;
  };

  useEffect(() => {
    setFirstPage(0);
  }, [pathname]);

  const updatePagination = (e, newPage) => {
    if (newPage === currentPage) {
      e.preventDefault();
      return;
    }
    let currentFirstPage = firstPage;
    const pagninationNavItem =
      pageNumbers < MAX_PAGINATION_NAV_ITEM
        ? pageNumbers
        : MAX_PAGINATION_NAV_ITEM;
    const middlePage = currentFirstPage + Math.floor(pagninationNavItem / 2);

    if (newPage > middlePage) {
      currentFirstPage += newPage - middlePage;
      if (currentFirstPage > pageNumbers - pagninationNavItem) {
        currentFirstPage = pageNumbers - pagninationNavItem;
      }
    } else if (newPage < middlePage && currentFirstPage !== 0) {
      currentFirstPage -= middlePage - newPage;
      if (currentFirstPage < 0) {
        currentFirstPage = 0;
      }
    }
    setFirstPage(currentFirstPage);
  };

  const renderPagination = () => {
    let result = [];
    for (
      let i = firstPage;
      i < pageNumbers && i < firstPage + MAX_PAGINATION_NAV_ITEM;
      i++
    ) {
      result.push(
        <NavLink
          className="pagination-item"
          key={`${pathname}${i}`}
          to={() => generateUrl(i)}
          onClick={(e) => updatePagination(e, i)}
          activeClassName="active"
          isActive={() => currentPage === i}
        >
          {i + 1}
        </NavLink>
      );
    }
    return result;
  };

  return (
    <Pagination>
      <NavLink
        to={() => generateUrl(0)}
        className="pagination-item"
        isActive={() => false}
        onClick={(e) => updatePagination(e, 0)}
      >
        First
      </NavLink>
      <NavLink
        to={() => generateUrl(prevPage)}
        className="pagination-item"
        isActive={() => false}
        onClick={(e) => updatePagination(e, prevPage)}
      >
        Previous
      </NavLink>
      {renderPagination()}
      <NavLink
        className="pagination-item"
        to={() => generateUrl(nextPage)}
        isActive={() => false}
        onClick={(e) => updatePagination(e, nextPage)}
      >
        Next
      </NavLink>
      <NavLink
        to={() => generateUrl(pageNumbers - 1)}
        className="pagination-item"
        isActive={() => false}
        onClick={(e) => updatePagination(e, pageNumbers - 1)}
      >
        Last
      </NavLink>
    </Pagination>
  );
}

export default React.memo(ProductPagination);
