import { useEffect, useState } from "react";

function ProductList({ product, deletebtn }) {
  return (
    <>
      <li className="item">
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
          <button className="delete-button" onClick={deletebtn}>삭제</button>
        </div>
      </li>
    </>
  )
}

function ProductContainer({ products }) {

  const [searchFilter, setSearchFilter] = useState(''); // 검색 필터 기본 false

  const deletBtn = (e) => { // 카드 삭제 기능
    e.preventDefault();
    const btnParent = e.target.parentElement
    btnParent.parentElement.remove();
  }

  let filterList = products;

  if (searchFilter) { // input에 검색을 하면 
    // 이름(title)으로 검색 기능 소문자로 변환, 공백 제거 비교
    filterList = products.filter(product => product.title.replace(/\s/g, '').toLowerCase().includes(searchFilter.replace(/\s/g, '').toLowerCase()));
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="이름으로 검색"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </form>

      <ul className="product-list">
        {filterList.map(product => (
          <ProductList key={product.id} product={product} deletebtn={deletBtn} />
        ))}
      </ul>
    </div>
  )
}

function ProductApp() {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProductData(data))
  }, [])

  return (
    <div>
      <h1>상품 목록</h1>
      <ProductContainer products={productData} />
    </div>
  )
}
export default ProductApp;