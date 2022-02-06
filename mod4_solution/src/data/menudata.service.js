(function (){
'use strict';
angular.module('data')
.service(MenuDataService, 'MenuDataService');

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService(){
  var service = this;
  service.getAllCategories = function (){
    return $http({
      method: "Get",
      url: (ApiBasePath + "/categories.json")
    }).then(
      function (results){
        service.results=results;
        return service.results
      }
    )
  }
  service.getTiemsForCategory = function(categoryShortName){
    return $http({
      method: "Get",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    }).then(
      function (results){
        service.results=results;
        return service.results
      }
    )

  }
}

})();
