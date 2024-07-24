import { useEffect, useState } from "react";

function ProductCardList({ products }) {
  const [filterInput, setFilterInput] = useState('');

  const deletBtn = (e) => { // 카드 삭제 기능
    e.preventDefault();
    const btnParent = e.target.parentElement
    btnParent.parentElement.remove();
  }
  // 이름(title)으로 검색 기능 추가
  const filterProducts = products.filter(product => product.title.toLowerCase().includes(filterInput.toLowerCase()));

  return (
    <div>
      <form>
        <input
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          type="text"
          placeholder="이름으로 검색"
        />
      </form>

      <ul className="product-list">
        {
          filterProducts.map((product, index) => (
            <li className="item" key={index}>
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
        }
      </ul>


    </div>
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