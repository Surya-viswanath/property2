
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Category() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({ address: '', price: '', type: '' });
  
    useEffect(() => {
      // Fetch properties using Axios
      axios.get('https://property1-uoj3.onrender.com/getpro')
        .then(response => {
          setProperties(response.data); // Assuming the response contains an array of properties
          setFilteredProperties(response.data); // Initially set filtered properties to all properties
        })
        .catch(error => {
          console.error('Error fetching properties:', error);
        });
    }, []); // Empty dependency array ensures useEffect runs only once after initial render
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters({ ...filters, [name]: value });
    };
  
    useEffect(() => {
      // Filter properties whenever filters change
      const filtered = properties.filter(property => {
        const addressMatch = property.address.toLowerCase().includes(filters.address.toLowerCase());
        // const priceMatch = property.regularPrice >= parseInt(filters.price) || filters.price === '';
        const typeMatch = property.type.toLowerCase() === filters.type.toLowerCase() || filters.type === '';
        // const bedroomMatch = property.bedrooms.toString().toLowerCase()() === filters.bedrooms.toString().toLowerCase() || filters.bedrooms === '';
        return addressMatch && typeMatch ;
      });
      setFilteredProperties(filtered);
    }, [filters, properties]);
  return (

    <div>
        <div>
        <input type="text" name="address" placeholder="Filter by address" value={filters.address} onChange={handleFilterChange} />
        {/* <input type="number" name="price" placeholder="Filter by price" value={filters.price} onChange={handleFilterChange} /> */}
        <input type="text" name="type" placeholder="Filter by type" value={filters.type} onChange={handleFilterChange} />
        {/* <input type="text" name="bedrooms" placeholder="Filter by no : of bedrooms" value={filters.bedrooms} onChange={handleFilterChange} /> */}
      </div>
      <ul>
        {filteredProperties.map(property => (
          <li key={property.id}>
            <div>Address: {property.address}</div>
            <div>Price: {property.regularPrice}</div>
            <div>Type: {property.type}</div>
            <div>Type: {property.bedrooms}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Category

