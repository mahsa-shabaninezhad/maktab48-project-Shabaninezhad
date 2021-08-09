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
import ModalContainer from "./components/modals/ModalContainer";
import PaymentPage from "./pages/PaymentPage";
import SuccessfulPayment from "./pages/SuccessfulPayment";
import FailedPayment from "./pages/FailedPayment";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <div className="App">
      <Switch>
        <StoreRoute exact path='/' component={LandingPage}/>
        <StoreRoute exact path='/cart' component={BasketPage}/>
        <StoreRoute exact path='/checkout' component={CheckoutPage}/>
        <StoreRoute exact path='/product/:brand/:id' component={ProductPage}/>
        <StoreRoute  path='/products' component={ProductsPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/payment" component={PaymentPage}/>
        <Route exact path='/payment/successful/:orderId' component={SuccessfulPayment}/>
        <Route exact path='/payment/failed' component={FailedPayment}/>
        <AdminPanelRoute exact path="/adminPanel/products" component={AdminPanelProductPage}/>
        <AdminPanelRoute exact path="/adminPanel/price&inventory" component={AdminPanelQuantityPage}/>
        <AdminPanelRoute exact path="/adminPanel/orders" component={AdminPanelOrdersPage}/>
      </Switch>
      <ModalContainer/>
      <ToastContainer rtl position='bottom-left'/>

    </div>
  );
}

export default App;
