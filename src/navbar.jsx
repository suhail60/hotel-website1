import React from 'react'

export default function navbar() {
  return (
    <div className='navbar '>
        <ul className="nav justify-content-center">
  <li className="nav-item ">
    <a className="nav-link px-5 border-4 border-black border-2 border-black " aria-current="page" href="#">Hotel Name</a>
  </li>
  <li className="nav-item">
    <a className="nav-link px-5" href="#">Star Rating</a>
  </li>
  <li className="nav-item">
    <a className="nav-link px-5" href="#">Price</a>
  </li>
  <li className="nav-item">
    <a className="nav-link  px-5 disabled" aria-disabled="true">Map View</a>
  </li>
</ul>
    </div>
  )
}
