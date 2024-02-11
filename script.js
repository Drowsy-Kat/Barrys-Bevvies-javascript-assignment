const allOrderText = [];
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form");
  const size = document.getElementsByName("drink-size");
  const priceTextElement = document.getElementById("priceText");
  const totalCostElement = document.getElementById("totalCostText");
  const toppings = document.getElementsByName("toppings");
  const drinkType = document.getElementsByName("drink-type");
  const base = document.getElementById("base");
  const toppingsContainer = document.getElementById("toppingsContainer")
  const addToOrderButton = document.getElementsByName("addToOrder")[0];
  const addToFavButton = document.getElementsByName("addToFav")[0];
  const orderFavButton = document.getElementsByName("orderFav")[0];
  const placeOrderButton = document.getElementsByName("placeOrder")[0];


  const allItems = document.getElementById("allItems")
  orderFavButton.style.display = "none";
  addToFavButton.style.display = "none";

  let selectedSize = "";
  let sizePrice = 2.50;
  let currentDrinkPrice = 2.50;
  let toppingCount = 0;

  let orderText = "";
  
  let drinkName = "";
  let baseName = "";
  let totalCost = 0;

  if(localStorage.getItem('favOrder') != undefined){
    orderFavButton.style.display = "block";
  }


  
  function saveFavourite(order, cost){
    localStorage.setItem('favOrder', order);
    localStorage.setItem('favPrice', cost);
  }
  
  toppingsContainer.style.display = "none"
  

  function updateCurrentDrinkPrice(){
    currentDrinkPrice = sizePrice + 0.75*toppingCount;
    updatePriceText()

  }

  function changeQuestion(drink){
    addToFavButton.style.display = "block";
    if(drink === "smoothie"){
      baseName="apple"
      base.innerHTML = `
      <label for="base">Select a base:</label>
      <label>
      <input type="radio" name="base" value="apple" checked> Apple Juice
      </label>
      <label>
      <input type="radio" name="base" value="orange"> Orange Juice
      </label>
      `
      toppingsContainer.style.display = "none"
      toppings.forEach(function(topping) {
        topping.checked = false;
      });
      toppingCount = 0;
      updateCurrentDrinkPrice()
      drinkName = "smoothie"
            const baseRadioButtons = document.querySelectorAll('input[name="base"]');
      baseRadioButtons.forEach(function (radioButton) {
        radioButton.addEventListener("change", function () {
          const selectedBase = document.querySelector('input[name="base"]:checked').value;
          baseName = selectedBase;

        });
      });
    }
    else{
      baseName = "semi"
      drinkName = "milkshake"
      base.innerHTML = `
      <label for="base">Select a base:</label>
      <label>
        <input type="radio" name="base" value="whole"> Whole Milk
      </label>
      <label>
        <input type="radio" name="base" value="semi" checked> Semi-skimmed Milk
      </label>
      <label>
        <input type="radio" name="base" value="skimmed"> Skimmed Milk
      </label>
      <label>
        <input type="radio" name="base" value="soya"> Soya Milk
      </label>
      <label>
        <input type="radio" name="base" value="oat"> Oat Milk
      </label>
      
      `;
      toppingsContainer.style.display = "block";

      const baseRadioButtons = document.querySelectorAll('input[name="base"]');
      baseRadioButtons.forEach(function (radioButton) {
        radioButton.addEventListener("change", function () {
          const selectedBase = document.querySelector('input[name="base"]:checked').value;
          baseName = selectedBase;

        });
      });
    

  }}

  drinkType.forEach(function(drinkType){
    
    drinkType.addEventListener("change", function(){
      changeQuestion(this.value)
    });
  });

  toppings.forEach(function(topping){
    topping.addEventListener("change",function(){
      toppingCount = 0;


      toppings.forEach(function(topping) {
        if (topping.checked) {
          toppingCount++;
        }
      });
      updateCurrentDrinkPrice()




    })
  })

  size.forEach(function(size) {
    size.addEventListener("change", function(){
      selectedSize = this.value;
      if(selectedSize === "small"){
        sizePrice = 2.50
      }else if(selectedSize =="medium"){
        sizePrice = 3.00
      }else if(selectedSize =="large"){
        sizePrice = 3.55
      }else{
        sizePrice = 4.20
      }



      updateCurrentDrinkPrice()
      
    })
  })
  function updatePriceText(){
    
    priceTextElement.textContent = `current drink cost: £${currentDrinkPrice}`;
  }
  function updateTotalCost(){
    totalCostElement.textContent = `Order total: £${totalCost}`
  }

  updatePriceText()
  

  addToOrderButton.addEventListener("click", function() {
    event.preventDefault();

    switch(size.value){
      case "small":
        orderText += "Small ";
        break;
      case "medium":
        orderText += "Medium ";
        break;
      case "large":
        orderText += "Large ";
        break;
      case "extraLarge":
        orderText += "Extra Large "
        break;
    }

    switch(drinkName){
      case "smoothie":
        orderText += "smoothie: "
        break;
      case "milkshake":
        orderText += "milkshake: "
        break;  
      default:
        alert("please select either a smoothie or a milkshake")
        return;
    }
    const allIngredients = document.querySelectorAll('input[name="ingredients"]');
    const checkedIngredients = Array.from(allIngredients)
      .filter(function(ingredient) {
        return ingredient.checked;
      })
      .map(function(ingredient) {
        return ingredient.value;
      });
      checkedIngredients.forEach(function(ingredient) {
        orderText += `${ingredient} `
      })

      console.log(baseName)
      if(drinkName === "smoothie"){
        if(baseName === "apple"){
          orderText += "with apple juice";
        }
        else{
          orderText += "with orange juice"
        }
      }
      else{
        if(drinkName === "whole"){
          orderText += "with whole milk"
        }
        else if(drinkName === "semi"){
          orderText += "with semi-skimmed milk"
        }
        else if(drinkName === "skimmed"){
          orderText += "with skimmed milk"
        }
        else if(drinkName === "soya"){
          orderText += "with soya milk"
        }
        else{
          orderText += "with oat milk"
        }
        if(toppingCount > 0){

          const allToppings = document.querySelectorAll('input[name="toppings"]');
          const checkedToppings = Array.from(allToppings)
            .filter(function(topping) {
              return topping.checked;
            })
            .map(function(topping) {
              return topping.value;
            });
            checkedToppings.forEach(function(topping) {
              orderText += ` and ${topping} `
            })
        }
      }

      totalCost += currentDrinkPrice;
      orderText += ` £${currentDrinkPrice}`



      allOrderText.push(orderText)
      orderText = "";
      currentDrinkPrice = 2.5;
      form.reset();
      base.innerHTML = ``
      drinkName = ""
      toppingsContainer.style.display = "none"
      toppings.forEach(function(topping) {
        topping.checked = false;
      });
      toppingCount = 0;
      updateTotalCost()
      updatePriceText()


      allItems.innerHTML =``;
      allOrderText.forEach(function(item){
        const listItem = document.createElement("li");
        listItem.textContent = item;
        allItems.appendChild(listItem);
      })




      addToFavButton.style.display = "none";

      




  });

  orderFavButton.addEventListener("click", function(){
    event.preventDefault();
    const favOrder = localStorage.getItem('favOrder');
    const favPrice = localStorage.getItem('favPrice');
    allOrderText.push(`${favOrder} £${favPrice}`);
    totalCost += parseFloat(favPrice);
    updateTotalCost()
    allItems.innerHTML =``;
    allOrderText.forEach(function(item){
      const listItem = document.createElement("li");
      listItem.textContent = item;
      allItems.appendChild(listItem);
    })
  })


  addToFavButton.addEventListener("click", function() {
    event.preventDefault();

    switch(size.value){
      case "small":
        orderText += "Small ";
        break;
      case "medium":
        orderText += "Medium ";
        break;
      case "large":
        orderText += "Large ";
        break;
      case "extraLarge":
        orderText += "Extra Large "
        break;
    }

    switch(drinkName){
      case "smoothie":
        orderText += "smoothie: "
        break;
      case "milkshake":
        orderText += "milkshake: "
        break;  
      default:
        alert("please select either a smoothie or a milkshake")
        return;
    }
    const allIngredients = document.querySelectorAll('input[name="ingredients"]');
    const checkedIngredients = Array.from(allIngredients)
      .filter(function(ingredient) {
        return ingredient.checked;
      })
      .map(function(ingredient) {
        return ingredient.value;
      });
      checkedIngredients.forEach(function(ingredient) {
        orderText += `${ingredient} `
      })

      console.log(baseName)
      if(drinkName === "smoothie"){
        if(baseName === "apple"){
          orderText += "with apple juice";
        }
        else{
          orderText += "with orange juice"
        }
      }
      else{
        if(drinkName === "whole"){
          orderText += "with whole milk"
        }
        else if(drinkName === "semi"){
          orderText += "with semi-skimmed milk"
        }
        else if(drinkName === "skimmed"){
          orderText += "with skimmed milk"
        }
        else if(drinkName === "soya"){
          orderText += "with soya milk"
        }
        else{
          orderText += "with oat milk"
        }
        if(toppingCount > 0){

          const allToppings = document.querySelectorAll('input[name="toppings"]');
          const checkedToppings = Array.from(allToppings)
            .filter(function(topping) {
              return topping.checked;
            })
            .map(function(topping) {
              return topping.value;
            });
            checkedToppings.forEach(function(topping) {
              orderText += ` and ${topping} `
            })
        }
      }




      saveFavourite(orderText,currentDrinkPrice);

      orderText = "";
      currentDrinkPrice = 2.5;
      form.reset();
      base.innerHTML = ``
      drinkName = ""
      toppingsContainer.style.display = "none"
      toppings.forEach(function(topping) {
        topping.checked = false;
      });
      toppingCount = 0;
      updateTotalCost()



      allItems.innerHTML =``;
      allOrderText.forEach(function(item){
        const listItem = document.createElement("li");
        listItem.textContent = item;
        allItems.appendChild(listItem);
      })

      

      orderFavButton.style.display = "block";
      addToFavButton.style.display = "none";




  });

  placeOrderButton.addEventListener("click",function(){
    alert("your order has been placed")
  })










})