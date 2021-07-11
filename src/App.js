import { Switch, Route } from "react-router-dom";
import { AdminPanelRoute, StoreRoute } from "./components/Routes";
import LoginPage from "./pages/LoginPage";
import BasketPage from "./pages/store/BasketPage";
import CheckoutPage from "./pages/store/CheckoutPage";
import ProductPage from "./pages/store/ProductPage";
import ProductsPage from "./pages/store/ProductsPage";
import LandingPage from "./pages/store/LandingPage";
import AdminPanelProductPage from "./pages/web/AdminPanelProductPage";
import AdminPanelQuantityPage from "./pages/web/AdminPanelQuantityPage";
import AdminPanelOrdersPage from "./pages/web/AdminPanelOrdersPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ModalContainer from "./components/modals/ModalContainer";

function App() {

  return (
    <div className="App">
      <Switch>
        <StoreRoute exact path='/' component={LandingPage}/>
        <StoreRoute exact path='/card' component={BasketPage}/>
        <StoreRoute exact path='/checkout' component={CheckoutPage}/>
        <StoreRoute exact path='/product/:id' component={ProductPage}/>
        <StoreRoute exact path='/products/:brand' component={ProductsPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <AdminPanelRoute exact path="/adminPanel/products" component={AdminPanelProductPage}/>
        <AdminPanelRoute exact path="/adminPanel/price&inventory" component={AdminPanelQuantityPage}/>
        <AdminPanelRoute exact path="/adminPanel/orders" component={AdminPanelOrdersPage}/>
      </Switch>
      <ModalContainer/>
      <ToastContainer/>

    </div>
  );
}

export default App;
