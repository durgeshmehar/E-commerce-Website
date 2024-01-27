import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar"
import ProductList from "../features/product/components/ProductList"
import { selectProductListStatus } from "../features/product/productSlice";
import { useSelector } from 'react-redux';

function Home() {
  const status= useSelector(selectProductListStatus);

  return (
    <div>
      <Navbar>
      <ProductList />
      </Navbar>
      {status ==="idle" ? <Footer></Footer>:null}
    </div>
  )
}

export default Home;