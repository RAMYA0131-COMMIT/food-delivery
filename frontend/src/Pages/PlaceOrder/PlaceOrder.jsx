import React, { useContext, useEffect, useState} from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../Context/Store'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItem,url} =useContext(StoreContext)
  
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",     
    state: "",    
    zipcode: "",
    country: "",
    phone: "",
  });
  
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };
  

  const PlaceOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
  
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = { ...item }; 
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
  
    console.log("Order Data:", orderData); 
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      console.log("API Response:", response.data); 
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); 
      } else {
        console.error("Error in response:", response.data);
        alert("Order placement failed. Please check your details.");
      }
    } catch (error) {
      console.error("API Error:", error.response || error.message);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  const navigate =useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  

  return (
  <form onSubmit={PlaceOrder} className="place-order">
    <div className="place-order-left">
    <p className="title">Delivery Information</p>
    <div className="multifields">
      <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
      <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
    </div>
    <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address'  />
    <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
    <div className="multifields">
      <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
      <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
    </div>
    <div className="multifields">
      <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
      <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Counrty'/>
    </div>
    <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
    </div>
    <div className="place-order-right">
    <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                 <b>Total</b>
                 <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
    </div>
  </form>
  )
}

export default PlaceOrder