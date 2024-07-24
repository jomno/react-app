import { useEffect, useState } from "react";

function Product() {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProductData(data))
  }, [])
  // console.log(productData);

  return (
    <div>
      <h1>상품 목록</h1>
    </div>
  )
}
export default Product;