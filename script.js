;(function() {
	"use strict";

let bar = {
	name: "WunderBar",
	arrBarmen: [],
	arrWaiter: [],
	arrBeverages: [{rom: 500},{whiskey:1000},{martini:400},{coffe:800},{juice: 1200}],
	countTips : 0,
	arrListOfOrders: [],
};

function CreateOrder(descr, volume, ice){
	this.descr  = descr;
	this.volume = volume;
	this.ice    = ice;  
}

function CreatePersonal(name,age,prof, ownTips = 0){
	this.name = name;
	this.age  = age;
	this.prof = prof;
        this.ownTips = ownTips;
}

function CreateBarmen(name, age,prof, ownTips, favoriteDrink){
	CreatePersonal.apply(this,arguments);
	this.favoriteDrink = favoriteDrink;
}

function CreateWaiter(name, age, prof){
	CreatePersonal.apply(this, arguments);
}

CreateWaiter.prototype.takeOrder = function(bar, beverage, volume, ice){
	for (let i = 0; i < bar.arrBeverages.length; i++){
		if (beverage in bar.arrBeverages[i]){console.log(bar.arrBeverages[i][beverage]);
     	if(bar.arrBeverages[i][beverage] < volume) {return console.log("Sorry, we have not such " + beverage + "!");}
     		 var order = new CreateOrder(beverage,volume, ice);
             bar.arrListOfOrders.push(order);
       }
  }
	return console.log(bar.arrListOfOrders);
}


CreateWaiter.prototype.takeTips = function(bar,money){
	bar.countTips += money;
	return console.log(bar.countTips);
}

CreateBarmen.prototype.executeOrders = function(DescrBeverage, volume){
	for (let i = 0; i < bar.arrBeverages.length; i++){
		if (DescrBeverage in bar.arrBeverages[i]){
     	if(bar.arrBeverages[i][DescrBeverage] < volume) {return  console.log("We have only " + bar.arrBeverages[i][DescrBeverage] + "!");}
     		 bar.arrBeverages[i][DescrBeverage] -= volume;
     		return  console.log(bar.arrBeverages[i]); 
       }
  }
}

bar.refillStock = function(objNew){
  let prop   = Object.keys(objNew)[0];
  let isFind = false;
  for (let i = 0; i < bar.arrBeverages.length; i++){
		if (prop in bar.arrBeverages[i]){
                    bar.arrBeverages[i][prop] += objNew[prop];
                    isFind = true;
                    } 
  }
    if (!(isFind)) {bar.arrBeverages.push(objNew);
                   console.log("New beverage!");
                   }
}

bar.sortTips = function(){
   if (!(bar.countTips !== 0)) { return "No tips";}
  let countBarmen = bar.arrBarmen.length;
  let countWaiter = bar.arrWaiter.length;
  let lengthMax = Math.max(countBarmen, countWaiter);
  //console.log(lengthMax);
  let count = bar.countTips /(countBarmen + countWaiter);
  for (let i = 0; i < lengthMax; i++){
    if (bar.arrBarmen[i]) {bar.arrBarmen[i].ownTips = count; console.log(bar.arrBarmen[i]);}
    if (bar.arrWaiter[i]) {bar.arrWaiter[i].ownTips = count; console.log(bar.arrWaiter[i]);}
    
  }
    bar.countTips = 0;
  
console.log(count);
}


function toHire(name, age, prof){
  let newPerson;
  if (prof == "barmen"){ newPerson = new CreateBarmen(name, age, prof, 0, "coffe");
                       bar.arrBarmen.push(newPerson);
                       console.log(newPerson);
        } else {newPerson = new CreateWaiter(name, age, prof);
                       bar.arrWaiter.push(newPerson);
                console.log(newPerson);
               }
  return newPerson;
}


function toFire(name, prof){
  if (prof == "barmen"){for (let i = 0; i < bar.arrBarmen.length; i++){
                        if (!(bar.arrBarmen[i].name == name)) {continue;}
                       bar.arrBarmen.splice(i,1);
                       return console.log(bar.arrBarmen);
  }
  } else {for (let i = 0; i < bar.arrWaiter.length; i++){
                        if (!(bar.arrWaiter[i].name == name)) {continue;}
                       bar.arrWaiter.splice(i,1);
                       return console.log(bar.arrWaiter);
          }
        }
}


toHire("Bob", 25, "barmen");
toHire("Sam", 30, "barmen");
toHire("Jasika", 21, "waiter");

bar.arrWaiter[0].takeOrder(bar, "martini", 200, true);
bar.arrWaiter[0].takeTips(bar, 150);

bar.arrBarmen[1].executeOrders("martini", 200);

bar.arrBarmen[1].favoriteDrink = "martini";
console.log(bar.arrBarmen[1]);

bar.refillStock({tea: 800});
bar.refillStock({martini: 1000});
console.log(bar.arrBeverages);

bar.sortTips();

toFire("Bob", "barmen");  


}) ();