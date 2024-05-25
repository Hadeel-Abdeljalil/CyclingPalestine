import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsCart, BsHouse, BsListCheck, BsPerson } from 'react-icons/bs';
import { UserContext } from '../../../Web/Context/FeatureUser.jsx';
import { FaRoute, FaUsers } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';

export default function SideBar() {
  const { userData, loading } = useContext(UserContext);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
      setActiveItem(itemName);
  };

  if (loading) {
      return (
          <div className="loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3">
              <span className="loader"></span>
          </div>
      );
  }

  return (
    <div className='mt-4  mb-5  vh-100 col-md-3 col-xl-2 px-sm-2 px-0  '>
            <div className="position-fixed  mb-5  ">
                <div className="d-flex flex-column align-items-start px-3 pt-2 text-white justify-content-center mb-5">
                    <div className="  w-100   mb-3 text-decoration-none">
                        <div className=' w-100 d-flex align-items-center'>
                            <div className=" ">
                                <img className='rounded-circle image-sidebar' src={userData.image? userData.image: '/images/profile.jpeg'} />
                            </div>
                            <div className='me-2'>
                                <p className=" text-dark mb-0 mt-3 ">{userData.userName} </p>
                                <p className=" text-black-50  ">{userData.email} </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-column mb-sm-auto mb-0 justify-content-end align-items-sm-start list-unstyled w-100" id="menu">
                       
                        <li className={`rounded-end-1  mb-1  nav-item  sidebar-text ${activeItem === 'orders' ? 'activesidebar' : ''}`} onClick={() => handleItemClick('orders')}>
                            <Link to='/dashboard/orders' className="nav-link px-0 align-middle w-100 p-2">
                                <BsListCheck className="ms-1 d-none d-sm-inline " /> 
                                <span className="ms-1 d-none d-sm-inline">الطلبات</span>
                            </Link>
                        </li>
                        <li className={`rounded-end-1  mb-1  nav-item sidebar-text ${activeItem === 'users' ? 'activesidebar' : ''}`} onClick={() => handleItemClick('users')}>
                            <Link to='/dashboard/users' className="nav-link align-middle px-0 p-2">
                                <FaUsers className="ms-1 d-none d-sm-inline " /> 
                                <span className="ms-1 d-none d-sm-inline">  المستخدمين </span>
                            </Link>
                        </li>
                        <li className={`rounded-end-1  mb-1  nav-item sidebar-text ${activeItem === 'tripsAdmin' ? 'activesidebar' : ''}`} onClick={() => handleItemClick('tripsAdmin')}>
                            <Link to='/dashboard/trips' className="nav-link align-middle px-0 p-2">
                                <FaRoute className="ms-1 d-none d-sm-inline " /> 
                                <span className="ms-1 d-none d-sm-inline">  الرحل </span>
                            </Link>
                        </li>

                        <li className={`rounded-end-1  mb-1  nav-item sidebar-text ${activeItem === 'categoriesAdmin' ? 'activesidebar' : ''}`} onClick={() => handleItemClick('categoriesAdmin')}>
                            <Link to='/dashboard/categories' className="nav-link align-middle px-0 p-2">
                                <BiCategory className="ms-1 d-none d-sm-inline " /> 
                                <span className="ms-1 d-none d-sm-inline">  الفئات </span>
                            </Link>
                        </li>
                        <li className={`rounded-end-1  mb-1  nav-item sidebar-text ${activeItem === 'productsAdmin' ? 'activesidebar' : ''}`} onClick={() => handleItemClick('productsAdmin')}>
                            <Link to='/dashboard/products' className="nav-link align-middle px-0 p-2">
                                <BsCart className="ms-1 d-none d-sm-inline " /> 
                                <span className="ms-1 d-none d-sm-inline">  المنتجات </span>
                            </Link>
                        </li>
                        <li className={`rounded-end-1  mb-1  nav-item sidebar-text ${activeItem === 'home' ? 'activesidebar' : ''}`} onClick={() => handleItemClick('home')}>
                            <Link to='/' className="nav-link align-middle px-0 p-2">
                                <BsHouse className="ms-1 d-none d-sm-inline " /> 
                                <span className="ms-1 d-none d-sm-inline">  العودة إلى الرئيسية </span>
                            </Link>
                        </li>
                    </div>
                    <hr />

                </div>
            </div>
        </div>
  )
}
