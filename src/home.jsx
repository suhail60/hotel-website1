import React, { useState } from 'react';

import Sidebar from "./Sidebar";
import HotelCard from './HotelCard';
import { useMediaQuery } from 'react-responsive';
import { Button, Offcanvas } from 'react-bootstrap';

export default function Home() {
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState('');
  const [availability, setAvailability] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className='wrapper' style={{ overflowX: 'hidden' }}>
      {/* Mobile Filter Button - Only shows on small screens */}
      {isMobile && (
        <div className="d-flex justify-content-end p-3">
          <Button variant="primary" onClick={toggleSidebar} className="d-md-none">
            <i className="bi bi-funnel-fill me-2"></i>Filters
          </Button>
        </div>
      )}

      <div className="container-fluid g-0">
        <div className="row flex-nowrap">
          {/* Sidebar Column - Hidden on mobile, shown as offcanvas */}
          {!isMobile ? (
            <div className={`${isTablet ? 'col-md-4' : 'col-md-3 col-xl-2'} px-sm-2 px-0 bg-light`}
              style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflowY: 'auto'
              }}>
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2">
                <Sidebar
                  search={search}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  setSearch={setSearch}
                  roomType={roomType}
                  setRoomType={setRoomType}
                  availability={availability}
                  setAvailability={setAvailability}
                />
              </div>
            </div>
          ) : (
            <Offcanvas show={showSidebar} onHide={toggleSidebar} responsive="md" placement="start">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Sidebar
                  search={search}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  setSearch={setSearch}
                  roomType={roomType}
                  setRoomType={setRoomType}
                  availability={availability}
                  setAvailability={setAvailability}
                />
              </Offcanvas.Body>
            </Offcanvas>
          )}

          {/* Main Content Column */}
          <div className={`${isMobile ? 'col-12' : isTablet ? 'col-md-8' : 'col-md-9 col-xl-10'} py-3`} 
               style={{ 
                 overflowY: 'auto', 
                 height: isMobile ? 'auto' : '100vh',
                 paddingLeft: isMobile ? '15px' : '',
                 paddingRight: isMobile ? '15px' : ''
               }}>
            <HotelCard
              search={search}
              selectedPriceRange={selectedPriceRange}
              roomType={roomType}
              availability={availability}
            />
          </div>
        </div>
      </div>
    </div>
  );
}