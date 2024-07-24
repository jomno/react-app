import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/Product">
        <button>Product</button>
      </Link>
    </div>
  );
}

export default Home;