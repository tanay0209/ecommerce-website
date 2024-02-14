import { API } from '../../backend';

// CREATE CATEGORY
export const createCategory = async (userId, token, category) => {
  return fetch(`${API}category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// FETCH ALL CATEGORIES
export const getCategories = async () => {
  return fetch(`${API}categories`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const deleteCategory = async (catgegoryId, userId, token) => {
  return fetch(`${API}category/${catgegoryId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// CREATE A NEW PRODUCT
export const createProduct = async (userId, token, product) => {
  return fetch(`${API}product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// FETCH ALL THE PRODUCTS
export const getProducts = async () => {
  return fetch(`${API}products`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// FETCH A SINGLE PRODUCT
export const getProduct = async (productId) => {
  return fetch(`${API}product/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// UPDATE AN EXISTING PRODUCT
export const updateProduct = async (productId, userId, token, product) => {
  return fetch(`${API}product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// DELETE A PRODUCT
export const deleteProduct = async (productId, userId, token) => {
  return fetch(`${API}product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
