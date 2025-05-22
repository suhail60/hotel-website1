import React, { useState } from 'react';
import hotelData from './hotelData';

export default function HotelCard({ search, selectedPriceRange, roomType, availability }) {
  const [sort, setSort] = useState('');

  const filteredItems = hotelData
    .filter((hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.city.toLowerCase().includes(search.toLowerCase())
    )
    .filter((hotel) => (roomType ? hotel.roomType.toLowerCase() === roomType.toLowerCase() : true))
    .filter((hotel) => (availability ? hotel.availability : true))
    .filter((hotel) => {
      if (!selectedPriceRange) return true;

      if (selectedPriceRange.includes('lessThan')) {
        const max = parseInt(selectedPriceRange.replace(/\D/g, ''));
        return hotel.pricePerNight < max;
      } else if (selectedPriceRange.includes('greaterThan')) {
        const min = parseInt(selectedPriceRange.replace(/\D/g, ''));
        return hotel.pricePerNight > min;
      } else {
        const [min, max] = selectedPriceRange.replace(/\s/g, '').split('to');
        return (
          hotel.pricePerNight >= parseInt(min) &&
          hotel.pricePerNight <= parseInt(max)
        );
      }
    })
    .sort((a, b) => {
      if (sort === 'lowToHigh') return a.pricePerNight - b.pricePerNight;
      if (sort === 'highToLow') return b.pricePerNight - a.pricePerNight;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="container mt-4">
      {/* Sorting Controls */}
      <div className="mb-4">
        <div className="btn-group" role="group">
          <button 
            type="button" 
            className={`btn ${sort === '' ? 'btn-primary' : ''}`}
            onClick={() => setSort('')}
          >
            Default
          </button>
          <button 
            type="button" 
            className={`btn ${sort === 'lowToHigh' ? 'btn-primary' : ''}`}
            onClick={() => setSort('lowToHigh')}
          >
            Price (Low to High)
          </button>
          <button 
            type="button" 
            className={`btn ${sort === 'highToLow' ? 'btn-primary' : ''}`}
            onClick={() => setSort('highToLow')}
          >
            Price (High to Low)
          </button>
          <button 
            type="button" 
            className={`btn ${sort === 'rating' ? 'btn-primary' : ''}`}
            onClick={() => setSort('rating')}
          >
            Top Rated
          </button>
        </div>
        <div className="mt-2 text-muted">
          Showing {filteredItems.length} of {hotelData.length} hotels
        </div>
      </div>

      {/* Hotel Cards */}
      {filteredItems.length > 0 ? (
        <div className="row">
          {filteredItems.map((hotel) => (
            <div key={hotel.id} className="col-lg-6 mb-4">
              <div className={`card h-100 ${!hotel.availability ? 'opacity-75' : ''}`}>
                <div className="row g-0 h-100">
                  <div className="col-md-5">
                    <img
                      src="https://www.seleqtionshotels.com/content/dam/seleqtions/Connaugth/TCPD_PremiumBedroom4_1235.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"
                      className="img-fluid rounded-start h-100 w-100 object-fit-cover"
                      alt={hotel.name}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body d-flex flex-column h-100">
                      <div>
                        <div className="d-flex justify-content-between align-items-start">
                          <h5 className="card-title mb-1">{hotel.name}</h5>
                          <span className={`badge ${hotel.availability ? 'bg-success' : 'bg-danger'}`}>
                            {hotel.availability ? 'Available' : 'Booked'}
                          </span>
                        </div>
                        <p className="card-text text-muted mb-2">
                          <i className="bi bi-geo-alt-fill me-1"></i> {hotel.city}
                        </p>
                        <p className="card-text">
                          <span className="badge bg-light text-dark">{hotel.roomType}</span>
                        </p>
                        
                        <div className="my-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={`bi ${i < Math.floor(hotel.rating) ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`}
                            ></i>
                          ))}
                          <span className="ms-2 small text-muted">({hotel.reviews} reviews)</span>
                        </div>
                        
                        <div className="mb-2">
                          {hotel.amenities.map((amenity, index) => (
                            <span key={index} className="badge bg-light text-dark me-1 mb-1">
                              <i className="bi bi-check-circle me-1"></i>{amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="mb-0">₹{hotel.pricePerNight}</h4>
                            <small className="text-muted">per night</small>
                          </div>
                          <button 
                            className="btn btn-primary" 
                            disabled={!hotel.availability}
                          >
                            {hotel.availability ? 'Book Now' : 'Sold Out'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h4>No hotels found matching your criteria</h4>
          <p className="text-muted">Try adjusting your filters or search term</p>
        </div>
      )}
    </div>
  );
}