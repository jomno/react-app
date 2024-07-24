import { useEffect, useState } from "react";

function ProductCardList({ products }) {
  const deletBtn = (e) => {
    e.preventDefault();
    const btnParent = e.target.parentElement
    btnParent.parentElement.remove();
  }

  const product = products.map(product => (
    <li className="item" key={product.id}>
      <div className="flex-wrap">
        <span className="item-rating">평점: {product.rating.rate}</span>
        <figure className="item-image">
          <img src={product.image} alt={product.title} />
        </figure>
      </div>
      <h3 className="item-title">{product.title}</h3>
      <div className="item-description">{product.description}</div>
      <div className="item-price">가격: ₩{(product.price * 1200).toLocaleString()}</div>
      <div className="item-delete">
        <button className="delete-button" onClick={deletBtn}>삭제</button>
      </div>
    </li>
  ))

  return (
    <ul className="product-list">
      {product}
    </ul>
  )
}

function Product() {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProductData(data))
  }, [])

  return (
    <div>
      <h1>상품 목록</h1>
      <ProductCardList products={productData} />
    </div>
  )
}
export default Product;