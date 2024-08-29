import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FoodItem from './FoodItem'
import { getMenus } from '../../actions/menuAction';
import {useParams} from 'react-router-dom'
import Loader from '../layouts/Loader'
import Message from '../layouts/Message'

export default function Menu() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {menus, loading, error} = useSelector((state)=> state.menus);
  useEffect(()=>{
    dispatch(getMenus(id));
  },[dispatch, id])
  return (
    <div>
      {loading? <Loader /> :error?(<Message variant="danger">{error}</Message>):
      menus && menus.length>0? (menus.map((menu)=>(
        <div key={menu._id}> 
          <h2>{menu.category}</h2>
          <hr />
          {menu.items && menu.items.length>0 ? (
            <div className='row'>
              {menu.items.map((item)=>(
                <FoodItem key={item._id} foodItem={item} restaurant={id} />
             ))}
            </div>
          ):(<Message variant="info">No food item found</Message>)}
        </div>
      ))):(<Message variant="info">No menus found</Message>)
      }
    </div>
  )
}
