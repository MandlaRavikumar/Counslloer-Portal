import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Login from './components/Login';
import Register from './components/Register';
import DashBoard from './components/DashBoard';
import EnquiryForm from './components/EnquiryForm';
import ViewEnquiries from './components/ViewEnquiries';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/addenquiry" element={<EnquiryForm />} />
          <Route path="/addenquiry/:id" element={<EnquiryForm />} />
          <Route path="/viewenquiry" element={<ViewEnquiries />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
