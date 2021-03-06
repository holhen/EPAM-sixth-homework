var ProductService = (function(ProductItem, CategoryItem) {
  var url = "/api/products";

  /**
   *
   * @param {ProductSearchParameters} searchParameters
   * @returns {Promise<Array<ProductItem>>}
   */
  function searchProduct(searchParameters) {
    //@todo: implement
    //url: /api/products for searching - use buildUriParams() to pass additional parameters ('/api/products' + buildUriParams(searchParameters))
    //list items by category: /api/products/category/{categoryName}
    //the response will be an array, containing raw date - use arrays map function to return with a ProductItem

    var params = buildUriParams(searchParameters);

    return fetch(`${url}${params}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(products) {
        return mapToProductItems(products);
      });
  }

  function mapToProductItems(products) {
    return products.map(function(product) {
      return new ProductItem(product);
    });
  }

  function getCategories() {
    return fetch(`${url}/categories`)
      .then(function(response) {
        return response.json();
      })
      .then(function(categories) {
        return mapToCategoryItems(categories);
      });
  }

  function mapToCategoryItems(categories) {
    return categories.map(function(category) {
      return new CategoryItem(category);
    });
  }

  function getProductsByCategory(category) {
    return fetch(`${url}/category/${category}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(products) {
        return mapToProductItems(products);
      });
  }

  /**
   *
   * @param {ProductSearchParameters} searchParams
   * @returns {string}
   */
  function buildUriParams(searchParams) {
    var query = [];
    var params = searchParams.toJSON();
    Object.keys(params).forEach(function(param) {
      if (params[param]) {
        query.push(param + "=" + encodeURIComponent(params[param]));
      }
    });
    return (query.length && "?" + query.join("&")) || "";
  }

  return {
    search: searchProduct,
    getCategories: getCategories,
    getProductsByCategory: getProductsByCategory
  };
})(ProductItem, CategoryItem);
