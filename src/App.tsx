import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Catalog from './components/Catalog';
import Services from './components/Services';
import Equipment from './components/Equipment';
import VendorForm from './components/form/Vendorform';
import ProfilePage from './components/ProfilePage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SelectLoginPage from './components/selectpage';
import UpdateProfilePage from './components/UpdateProfilePage';
import UpdateForm from './components/form/UpdateForm';
import ServiceDetails from './components/ServiceDetails';
import React from 'react';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/vendorform" element={<VendorForm />} />
          <Route path="//updateform" element={<UpdateForm existingData={{
            name: '',
            description: '',
            price: '',
            ownerId: '',
            image: null,
            available: ''
          }} onUpdate={function (updatedData: { name: string; description: string; price: string; ownerId: string; image: string | null; available: string; }): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/update-profile" element={<UpdateProfilePage />}/>
          <Route path="/select-login" element={<SelectLoginPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          
          <Route path="/checkout" element={<Checkout cartItems={[]} onCheckout={function (): void {
            throw new Error('Function not implemented.');
          } } />} />

          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
