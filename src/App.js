import { useEffect, useState } from "react";
import style from './css/Product.module.css';
import './css/App.css';

function ProductList({ product, deletebtn }) {
  return (
    <>
      <li className={style.itemWrap}>
        <div className={style.flex}>
          <span className={style.itemRating}>평점: {product.rating.rate}</span>
          <figure className={style.itemImage}>
            <img src={product.image} alt={product.title} />
          </figure>
        </div>
        <h3 className={style.item}>{product.title}</h3>
        <div className={style.item}>{product.description}</div>
        <div className={`${style.item} ${style.price}`}>가격: ₩{(product.price * 1200).toLocaleString()}</div>
        <div className={style.btnWrap}>
          <button className={style.btn} onClick={deletebtn}>삭제</button>
        </div>
      </li>
    </>
  )
}

function ProductContainer({ products }) {

  const [filterProducts, setFilterProducts] = useState(products);
  const [searchFilter, setSearchFilter] = useState('');
  const [sortList, setSortList] = useState('default');


  const deletBtn = (e) => {
    e.preventDefault();
    const btnParent = e.target.closest('li')
    let result = window.confirm(`정말 ${btnParent.querySelector('h3').textContent}을 삭제하시겠습니까?`);
    if (result) {
      alert('성공적으로 삭제하였습니다.')
      btnParent.remove(); // 이 부분 변경해야 함.
    }
  }

  const getButtonStyle = (type) => {
    return sortList === type ? { backgroundColor: '#87a86f', color: '#Fff' } : {}; // 이 부분 변경해야 함.
  };

  useEffect(() => {
    let filterList = products;

    if (searchFilter) {
      filterList = products.filter(product => product.title.replace(/\s/g, '').toLowerCase().includes(searchFilter.replace(/\s/g, '').toLowerCase()));
    }

    switch (sortList) {
      case 'price':
        filterList = filterList.slice().sort((a, b) => (a.price - b.price));
        break;
      case 'rating':
        filterList = filterList.slice().sort((a, b) => (a.rating.rate - b.rating.rate))
        break;
      default:
        break;
    }

    setFilterProducts(filterList);
  }, [searchFilter, sortList, products])

  return (
    <div className={style.container}>
      <div className={style.flexWrap}>
        <form>
          <input
            type="text"
            placeholder="이름으로 검색"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          {searchFilter ? <button onClick={() => setSearchFilter('')}>X</button> : null}
        </form>

        <div className={style.btnWrap}>
          <button onClick={() => setSortList('default')} style={getButtonStyle('default')} className={style.btn}>기본 정렬</button>
          <button onClick={() => setSortList('price')} style={getButtonStyle('price')} className={style.btn}>가격 정렬</button>
          <button onClick={() => setSortList('rating')} style={getButtonStyle('rating')} className={style.btn}> 평점 정렬</button >
        </div >
      </div>

      <ul className="product-list">
        {filterProducts.map(product => (
          <ProductList key={product.id} product={product} deletebtn={deletBtn} />
        ))}
      </ul>
    </div >
  )
}

function App() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('출력 X');
        }
        return response.json();
      })
      .then(data => {
        setProductData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div >
      <h1 className={style.title}>상품 목록</h1>
      <ProductContainer products={productData} />
    </div>
  )
}
export default App;