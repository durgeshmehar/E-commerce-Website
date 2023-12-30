import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/navbar/Navbar"

function Home() {
  return (
    <div >
      <Navbar>
      <AdminProductList />
      </Navbar>
    </div>
  )
}

export default Home;