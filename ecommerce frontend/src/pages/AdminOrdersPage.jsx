import AdminOrders from "../features/admin/components/AdminOrders";
import Navbar from "../features/navbar/Navbar"

export default function AdminOrdersPage() {
  return (
    <div >
      <Navbar>
      <AdminOrders />
      </Navbar>
    </div>
  )
}
