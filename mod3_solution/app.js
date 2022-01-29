(function (){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject=['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
  var list=this;
  list.found = [];
  list.getMatchedMenuItems = function (searchTerm){
    list.found = MenuSearchService.getMatchedMenuItems(this.searchTerm);
  }
}

MenuSearchService.$inject = ["$http"];
function MenuSearchService($http){
  var service = this;
  service.getMatchedMenuItems = function(searchTerm){
    return $http({
      method: "Get",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    })
    .then(
      function (results){
        var foundItems = [];
         var menu = results.data.menu_items;
                 console.log(menu[0]);
        for (let i = 0; i < menu.length; i++){
          console.log(menu[i].description);
          if (menu[i].description.toLowerCase().includes(searchTerm.toLowerCase())){
            foundItems.push(menu[i]);
          }
        }
        return foundItems;

      }
    );
  }
}


})();
