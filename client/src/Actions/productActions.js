import axios from 'axios';

import { GET_ERRORS, GET_PRODUCT, GET_PRODUCTS, PRODUCT_LOADING } from './types';

// Create Product
export const addProduct = (productData, history) => dispatch => {
    axios
      .post('api/product', productData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  //Get all products
export const getProducts = () => dispacth => {
    dispacth(setProductLoading());
    axios
      .get('/api/product/all')
      .then(res =>
        dispacth({
          type: GET_PRODUCTS,
          payload: res.data,
        })
      )
      .catch(err =>
        dispacth({
          type: GET_PRODUCTS,
          payload: null,
        })
    );
};

//Get product by id
export const getProductById = (id) => dispacth => {
    dispacth(setProductLoading());
    axios
      .get(`/api/product/${id}`)
      .then(res => {
        dispacth({
          type: GET_PRODUCT,
          payload: res.data
        });
      })
      .catch(err => {
        dispacth({
          type: GET_PRODUCT,
          payload: null
        });
      });
  };

export const bidProduct = (bidData, history) => dispacth => {
    axios
        .post('/api/product/bidProduct', bidData)
        .then(res => history.push('/product-list'))
        .catch(err => {
            dispacth({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//Product Loading
export const setProductLoading = () => {
    return {
      type: PRODUCT_LOADING
    };
};