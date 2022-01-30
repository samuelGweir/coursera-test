(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective(){
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove:'&',
      myTitle: '@test'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

}

NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;
  list.getMatchedMenuItems = function (searchTerm){
    var promise = MenuSearchService.getMatchedMenuItems(this.searchTerm);
    promise.then(function(response){
      list.found = response;
    })
  }
  list.removeItem = function (index){
    list.found.splice(index,1);
  }

}

MenuSearchService.$inject = ["$http"];
function MenuSearchService($http){
  var service = this;
  service.getMatchedMenuItems = function(searchTerm){
  service.result = $http({
      method: "Get",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    })
    .then(
      function (results){
         service.itemsFound = [];
         service.menu = results.data.menu_items;
        for (let i = 0; i < service.menu.length; i++){
          if (service.menu[i].description.includes(searchTerm)){
            service.itemsFound.push(service.menu[i]);
          }
        }
        return service.itemsFound;

      }
    )
    .catch(function (error) {
      console.log(error);
    });
    return service.result
  }
}


})();
