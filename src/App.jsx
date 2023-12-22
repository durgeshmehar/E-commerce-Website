import './App.css'
import ProductList from './features/ProductList/ProductList'
import { Provider} from 'react-redux';
import store from './app/store'
function App() {

  return (
    <>
     <Provider store={store}>

      <h1>This is App Component</h1>
      <ProductList></ProductList>
     </Provider>
    </>
  )
}

export default App
