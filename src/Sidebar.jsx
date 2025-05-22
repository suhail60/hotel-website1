import React from 'react';

export default function Sidebar({
  search,
  selectedPriceRange,
  setSelectedPriceRange,
  setSearch,
  roomType,
  setRoomType,
  setAvailability,
  availability
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add search logic here if needed
  };

  return (
    <div className="sidebar p-3 bg-light rounded shadow-sm">
      {/* Search Section */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">400 Hotels & Holiday Rentals Found</h5>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Search By Hotel Name/City</h6>
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="input-group">
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                placeholder="Search..."
                aria-label="Search hotels"
              />
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Price Filter */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Filter by Price Per Night</h5>
        </div>
        <div className="card-body">
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="form-select"
            aria-label="Price range filter"
          >
            <option value="">All Prices</option>
            <option value="lessThan 1500">Less Than ₹1500</option>
            <option value="2000 to 3000">₹2000 to ₹3000</option>
            <option value="3000 to 4000">₹3000 to ₹4000</option>
            <option value="4000 to 5000">₹4000 to ₹5000</option>
            <option value="greaterThan 5000">Above ₹5000</option>
          </select>
        </div>
      </div>

      {/* Room Type Filter */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Filter by Room Type</h5>
        </div>
        <div className="card-body">
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="form-select"
            aria-label="Room type filter"
          >
            <option value="">All Room Types</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Standard">Standard</option>
            <option value="Executive">Executive</option>
            <option value="Family">Family Room</option>
          </select>
        </div>
      </div>

      {/* Availability Filter */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Availability</h5>
        </div>
        <div className="card-body">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
              id="availableCheckbox"
            />
            <label className="form-check-label" htmlFor="availableCheckbox">
              Show Available Only
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}