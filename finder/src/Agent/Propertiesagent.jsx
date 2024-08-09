import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { CiLocationOn, CiHeart } from "react-icons/ci";
import axios from 'axios';
import '../components/Rent.css'

function Propertiesagent() {
    const {email}=useParams();
    const { user } = useAuth();
    const [first, setFirst] = useState([]);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
  
    // const email = user.email;
    useEffect(() => {
      const handleItems = async () => {
        try {
          const response = await axios.get('http://localhost:4008/getpro');
          setFirst(response.data);
         
         
         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      handleItems();
    }, []);
  
  // console.log(sells);
    
  const filteredData = first.filter((item) => item.email === email);
  return (
    <div>
<Row style={{ margin: '1%' }}>
  <h3 style={{ color: '#393d73' }}>My Properties</h3>
  {filteredData.length > 0 ? (
    filteredData.map((property) => (
      <Col xs={12} sm={6} md={4} lg={4} key={property._id} style={{ marginBottom: '4%' }}>
        <Card style={{ width: '100%', height: '430px' }}>
          {user ? (
            <Link to={`/detail/${property._id}`} style={{ textDecoration: 'none' }}>
              <Card.Img variant="top" src={property.image} />
            </Link>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Card.Img variant="top" src={property.image} />
            </Link>
          )}
          <Card.Body>
            <Card.Text className="textp">
              <p>{property.title}</p>
              <p style={{ color: '#707070' }}>{property.type} , {property.sell}</p>
              <p style={{ color: 'black' }}>
                {property.regularPrice} <br />
                {property.description}
              </p>
              <div style={{ display: 'flex' }}>
                <p style={{ color: '#707070' }}><CiLocationOn />{property.address}</p>
                {/* <p onClick={() => handleAddToWishlist(property)} style={{ marginLeft: '20%' }} ><CiHeart  style={{fontSize:'24px',color:'red'}}/></p> */}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <p>No properties found</p>
  )}
</Row>
    </div>
  )
}

export default Propertiesagent;
