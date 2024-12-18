import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../Context/Store'
import FoodItem from '../FoodItem/FoodItem'


const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext) ?? {}


  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list?.map((item, index) => {
          // console.log(food_list);
          if(category==="All" || category===item.category){
            return  <FoodItem key={index} name={item.name || "no provider"} id={item._id} description={item.description || "no provider"} price={item.price || "no provider"} image={item.image || "no provider"} />

        }
        
})}
      </div>
    </div>
  )
}

export default FoodDisplay