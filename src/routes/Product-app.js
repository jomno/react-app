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
  const [sortList, setSortList] = useState('default');

  const deletBtn = (e) => { // 카드 삭제 기능
    e.preventDefault();
    const btnParent = e.target.parentElement
    btnParent.parentElement.remove();
  }

  let filterList = products; // 기본 리스트

  if (searchFilter) { // input에 검색을 하면 
    // 이름(title)으로 검색 기능 소문자로 변환, 공백 제거 비교
    filterList = products.filter(product => product.title.replace(/\s/g, '').toLowerCase().includes(searchFilter.replace(/\s/g, '').toLowerCase()));
  }

  // 기본 정렬 누르면 filterList=products 디폴트값
  // 가격 정렬 누르면 filterList = 가격정렬된리스트 a-b 오름차순
  // 평점 정렬 누르면 filterList = 평점정렬된리스트 a-b 오름차순

  switch (sortList) {
    case 'price':
      filterList = products.filter((product) => product.price).sort((a, b) => (a.price - b.price))
      // console.log('가격 정렬')
      break;
    case 'rating':
      filterList = products.filter((product) => product.rating.rate).sort((a, b) => (a.rating.rate - b.rating.rate))
      // console.log('평점 정렬')
      break;
    default:
      // console.log('기본 정렬')
      break;
  }

  useEffect(() => { }, [searchFilter, sortList]);

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
      <div className="btn-wrap">
        <button onClick={() => setSortList('default')}>기본 정렬</button>
        <button onClick={() => setSortList('price')}>가격 정렬</button>
        <button onClick={() => setSortList('rating')}> 평점 정렬</button >
      </div >

      <ul className="product-list">
        {filterList.map(product => (
          <ProductList key={product.id} product={product} deletebtn={deletBtn} />
        ))}
      </ul>
    </div >
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