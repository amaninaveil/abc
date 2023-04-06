import React, { useState } from "react";
import "./_productList.scss";
import ProductRow from "./ProductRow/productRow";
import CancelModal from "../../../../components/AdminBrandCategory/CancelModal/cancelModal";

function ProductList(props) {
  const { products } = props;
  const [removeItem, setRemoveItem] = useState(null);
  // const productSaleEvent = {
  //   saleProgram: {
  //     type: "Sale Event",
  //     value: "In Sale Event",
  //   },
  // };
  // const productSaleProduct = {
  //   saleProgram: {
  //     type: "Sale Product",
  //     value: "40%",
  //   },
  // };
  // const productNoSale = {};
  return (
    <>
      {products ? (
        <>
          <table className="w-100">
            <thead>
              <tr className="p-3">
                <th className="number">No.</th>
                <th className="photo">Photo</th>
                <th className="name">Name</th>
                <th className="price text-right">Price</th>
                <th className="brand">Brand</th>
                <th className="text-center sale">Sale Program</th>
                <th className="text-center action">Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => (
                  <ProductRow
                    product={product}
                    key={product.id}
                    index={index + 1}
                    removeItem={(id) => setRemoveItem(id)}
                  />
                ))}
            </tbody>
          </table>
          <CancelModal id={removeItem} name="product" />
        </>
      ) : (
        <div className="text-center">No product is available</div>
      )}
    </>
  );
}

ProductList.propTypes = {};

export default React.memo(ProductList);
