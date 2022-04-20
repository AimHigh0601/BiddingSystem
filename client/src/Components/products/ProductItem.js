import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// import isEmpty from '../../validations/is-empty';

class ProductItem extends Component {
  render() {
    const { product } = this.props;

    return (
      <div className='card card-body bg-dark mb-3 text-white'>
        <div className="row">
          <div className="col-6">
            <h3 style={{ textAlign: 'center' }}>{product.itemName}</h3>
            <p>{product.description}</p>
            <Link to={`/product/${product._id}`} className='btn btn_info'>View & Proposal</Link>
          </div>
          <div className="col-md-6 skill d-none md-block ">
            <h4>Info</h4>
            <ul className="list-group">
              <li className='list-group-item bg-dark'>
                <i className='fa fa-check'>
                  <span className='ml-2 text-capitalize'>seller: </span>{product.seller.name}
                </i>
              </li>
              <li className='list-group-item bg-dark'>
                <i className='fa fa-check'>
                  <span className='ml-2 text-capitalize'>period: </span><Moment format="YYYY-MM-DD hh:m">{product.bidStart}</Moment> {' - '} <Moment format="YYYY/MM/DD hh:m">{product.bidEnd}</Moment>
                </i>
              </li>
              <li className='list-group-item bg-dark'>
                <i className='fa fa-check'>
                  <span className='ml-2 text-capitalize'>bids: </span>{ product.bids.length }
                </i>
              </li>
              <li className='list-group-item bg-dark'>
                <i className='fa fa-check'>
                  <span className='ml-2 text-capitalize'>price: </span>{ product.startingBid } USD
                </i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductItem;
