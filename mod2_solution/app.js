(function (){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var list1 = this;

  list1.itemIndex = "";

  list1.itemsToBuy = ShoppingListCheckOffService.getToBuy();

  list1.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
}

AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var list2 = this;

  list2.boughtItems = ShoppingListCheckOffService.getBought();
}

function ShoppingListCheckOffService(){
  var service = this;

  var toBuy = [
    { itemName: "Hot Sauce",
    quantity: 2 },
    { itemName: "Milk",
    quantity: 1 },
    { itemName: "Chicken",
    quantity: 5 },
    { itemName: "Onions",
    quantity: 1 },
    { itemName: "Cheese",
    quantity: 3 }
  ];
  var bought = [];

  service.buyItem = function(itemIndex){
    console.log(itemIndex);
    var item = {
      itemName: toBuy[itemIndex].itemName,
      quantity: toBuy[itemIndex].quantity
    };
    toBuy.splice(itemIndex, 1);
    bought.push(item);
  };

  service.getToBuy = function(){
    return toBuy;
  };

  service.getBought = function (){
    return bought;
  };
}

})();
