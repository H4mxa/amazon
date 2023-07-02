import { Container, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sampleProducts } from '../../data';

const Home = () => {
  return (
    <Container className="mt-3">
      <Row>
        {sampleProducts.map((product) => (
          <Col key={product._id} sm={6} md={4} lg={3}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt="image" className="product-image" />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
