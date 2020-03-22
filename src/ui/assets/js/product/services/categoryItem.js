var CategoryItem = (function() {
  var itemTemplate = "<li><a href='#'>{{name}}</a></li>";

  var CategoryItem = function(category) {
    this.name = category;
  };

  CategoryItem.prototype.display = function() {
    var tpl = itemTemplate;
    var params = {
      name: this.name
    };
    Object.keys(params).forEach(function(param) {
      tpl = tpl.replace(new RegExp("{{" + param + "}}", "g"), params[param]);
    });
    var div = document.createElement("div");
    div.innerHTML = tpl;
    return div.firstElementChild;
  };

  return CategoryItem;
})();
