import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBrands } from "../../../../utilities/slices/brandSlice";
import "./_existedBrand.scss";

function ExistedBrand() {
  const stateBrands = useSelector((state) => state.brand.data);
  const stateProducts = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  // get brands
  useEffect(() => {
    async function fetchBrands() {
      await dispatch(getBrands());
    }

    if (!stateBrands.length) {
      fetchBrands();
    }
  }, [dispatch, stateBrands]);

  const renderListBrand = () => {
    let res = "";
    res = stateBrands
      .filter((brand) => stateProducts.filterProducts[brand.name])
      .map((brand, index) => {
        const brandName = brand.name;

        return (
          <NavLink
            activeClassName="active"
            to={`/product/${brandName}`}
            key={brand.id}
          >
            <li className="">
              {brand.img ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}${brand.img}`}
                  alt=""
                  className="mr-3"
                />
              ) : (
                ""
              )}
              <span>{brandName}</span>
              <span>
                {stateProducts.filterProducts[brandName]
                  ? stateProducts.filterProducts[brandName].length
                  : 0}
              </span>
            </li>
          </NavLink>
        );
      });
    return res;
  };

  return (
    <div className="option-table">
      <div className="option-table-heading">BRANDS</div>
      <div className="option-table-content brand-table filter-table">
        <ul>{stateProducts.filterProducts && renderListBrand()}</ul>
      </div>
    </div>
  );
}

export default ExistedBrand;
