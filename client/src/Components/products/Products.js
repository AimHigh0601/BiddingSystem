import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';
import { getProducts } from '../../Actions/productActions';
import ProductItem from './ProductItem';

class Products extends Component {

  componentDidMount() {
    this.props.getProducts();
  }

  render() {

    const { products, loading } = this.props.product;
    let productItem;

    if(products === null || loading) {
      productItem = <Loader/>;
    } else {
      if(products.length > 0 ){
        productItem = products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))
      } else {
        productItem = <h4>No products.... found</h4>
      }
    }

    return (
      <div className='products'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">
                Projects
              </h1>
              <p className="lead text-center">
                Click View & Proposal Button to submit proposals.
              </p>
              {productItem}
            </div>
          </div>
        </div>
        <br/><br/><br/><br/>
      </div>
    )
  }
}

Products.propTypes = {
  product: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getProducts }) (Products);