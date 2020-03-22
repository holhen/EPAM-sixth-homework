var indexPageController = (function(ProductService, ProductSearchParameters) {
  //use this for filtering via ProductService
  var searchParameters = new ProductSearchParameters({
    sortBy: "price",
    direction: "asc"
  });
  //target item for product list
  var container = document.querySelector(".result .product-items");
  //category items list container
  var categories = document.querySelector(".filters ul");
  //search form
  var searchForm = document.querySelector(".index-page nav .search form");
  //search input
  var searchInput = document.querySelector(
    ".index-page nav .search form input"
  );

  function initialize() {
    searchProduct(searchParameters);
    getCategories();

    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      searchProduct(searchParameters);
    });

    searchInput.addEventListener("input", event => {
      searchParameters.searchTerm = event.target.value;
    });

    categories.addEventListener("click", event => {
      event.preventDefault();
      getProductsByCategory(event.target.textContent);
    });
  }

  function searchProduct(searchParameters) {
    //@todo: implement searching
    ProductService.search(searchParameters).then(function(products) {
      container.innerHTML = "";
      products.forEach(function(product) {
        container.appendChild(product.display());
      });
    });
  }

  function getCategories() {
    ProductService.getCategories().then(function(cats) {
      categories.innerHTML = "";
      cats.forEach(function(category) {
        categories.appendChild(category.display());
      });
    });
  }

  function getProductsByCategory(category) {
    ProductService.getProductsByCategory(category).then(function(products) {
      container.innerHTML = "";
      products.forEach(function(product) {
        container.appendChild(product.display());
      });
    });
  }

  return {
    run: initialize
  };
})(ProductService, ProductSearchParameters);
