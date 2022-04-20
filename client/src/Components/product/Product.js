import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Loader from '../common/Loader';
import Moment from 'react-moment';
import TextFieldGroup from '../common/TextFieldGroup';
import { getProductById, bidProduct } from '../../Actions/productActions';

let product_id, bidder;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      bid: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const bidData = {
      id: product_id,
      bidder: bidder,
      bid: this.state.bid
    };

    this.props.bidProduct(bidData, this.props.history);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProductById(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.product === null && this.props.product.product) {
      this.props.history.push('/not-found');
    }
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const { product, loading } = this.props.product;
    const { user } = this.props.auth;
    if(user && user.id)
      bidder = user.id;
    const { errors } = this.state;
    
    if (product && product._id)
      product_id = product._id;

    let productLoading;
    let biddingContent;
    let bidsContent;

    if (product && product.bids)
      bidsContent = (
        product.bids.map((bid, index) => {
          return (
            <li key={index} className='list-group-item'>
              <i className='fa fa-check'>
                <span className='ml-2 text-capitalize'>bidder: </span>{ bid.bidder.name },
                <span className='ml-2 text-capitalize'>bid price: </span>{ bid.bid } USD
              </i> 
            </li>
          );
        })
      );
    else
      bidsContent = (
        <span className="lead">
          There are no bids...
        </span>
      );

    if (product && user && product.seller._id !== user.id){
      if (product && product.buyer)
      biddingContent = (
        <div className='row'>
            <div className="col-md-12">
                <div className="card card-body bg-light">
                  <h3 className="text-center text-info">SEALED!</h3>
          <p className="lead">
            This project is already bidded by {product.buyer.name}.
          </p>
                </div>
            </div>
          </div>
      );
    else
      biddingContent = (
        <div className='row'>
            <div className="col-md-12">
                <div className="card card-body bg-light">
               
          <h3 className="text-center text-info">Please Submit your proposal!</h3>
          <form onSubmit={this.onSubmit} noValidate>
            
            {/* <input type='hidden' name='id' value={id} /> */}
            {/* <div className='col-md-6'> */}
              <TextFieldGroup
                type="number"
                placeholder='Bid Price'
                name="bid"
                value={this.state.bid}
                onChange={this.onChange}
                error={errors.bid}
              />
            {/* </div> */}
            <div className='col-md-6'>
              <input
                type="submit"
                value="Submit"
                className="btn btn-blobk btn-dark"
              />
            </div>
            
          </form>
        </div>
        </div>
            </div>
      );
    }
    
    if (product === null || loading) {
      productLoading = <Loader />;
    } else {
      productLoading = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/product-list" className="btn btn-light mb-3 float-left">
                Back To
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <div className="profile-header">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
              <div className="text-center">
                <h1 className="display-5 text-center">{product.itemName}</h1>
                <p className="lead text-center">
                  created by {product.seller.name}
                </p>
                <p className="lead text-center">
                  Period: <Moment format="YYYY-MM-DD hh:m">{product.bidStart}</Moment> {' - '} <Moment format="YYYY/MM/DD hh:m">{product.bidEnd}</Moment>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light">
                <h3 className="text-center text-info">More...</h3>
                <p className="lead">
                  {product.description}
                </p>
                <hr />
                <h3 className="text-center text-info">Info</h3>
                <div className="row justify-content-center">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
    
                  <li className='list-group-item'>
                <i className='fa fa-check'>
                  <span className='ml-2 text-capitalize'>bids: </span>{ product.bids.length }
                </i>
              </li>
              &nbsp;
              <li className='list-group-item'>
                <i className='fa fa-check'>
                  <span className='ml-2 text-capitalize'>starting price: </span>{ product.startingBid } USD
                </i>
              </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
          <div className="col-md-12">
              <div className="card card-body bg-light">
                <h3 className="text-center text-info">Bids...</h3>
                <div className="row justify-content-center">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {bidsContent}
                  </div>
                </div>
              </div>
          </div>
          </div>
          {biddingContent}
          <br/><br/><br/><br/>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{productLoading}</div>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  getProductById: PropTypes.func.isRequired,
  bidProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product,
  errors: state.errors
});

export default connect(mapStateToProps, { getProductById, bidProduct })(withRouter(Product));