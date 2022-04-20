import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addProduct } from '../../Actions/productActions';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      price: '',
      to: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const expData = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      to: this.state.to
    }
    this.props.addProduct(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-product">
        <Link to="/dashboard" className="btn btn-dark">
          Go Back
        </Link>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Product</h1>
              <p className="lead text-center">
                Add any information of product you may want
              </p>
              <form onSubmit={this.onSubmit} noValidate>
                <TextFieldGroup
                  placeholder="Bid Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextAreaFieldGroup
                  placeholder="Bid Content"
                  value={this.state.description}
                  name="description"
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about more"
                />
                <TextFieldGroup
                  type='number'
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="datetime-local"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-blobk btn-dark"
                />
              </form>
            </div>
          </div>
        </div><br/><br/><br/><br/>
      </div>
    );
  }
}

AddProduct.propTypes = {
  product: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  product: state.product,
});

export default connect(
  mapStateToProps,
  {addProduct}
)(withRouter(AddProduct));
