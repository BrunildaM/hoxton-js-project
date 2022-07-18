import "./style.css";


type Product ={
  id: number,
  type: string,
  name: string,
  image: string,
  price: number,
  description: string
}

type State = {
  menu: Product[],
  typeFilters: string[],
  selectedFilter: string
}



let state: State = {
  menu: [],
  typeFilters: ['All', 'Breafast', 'Lunch', 'Dinner', 'Shakes'],
  selectedFilter: 'All', 

}


function getMenuProducts() {
  return fetch ('http://localhost:3005/menu') .then (resp => resp.json())
 }


 function getItemsToDisplay() {

  let itemsToDisplay = state.menu

  if(state.selectedFilter === 'Breakfast') {
    itemsToDisplay = itemsToDisplay.filter(item => item.type === 'Breakfast')
  }

  if (state.selectedFilter === 'Lunch') {
    itemsToDisplay = itemsToDisplay.filter(item => item.type === 'Lunch')
  }

  if (state.selectedFilter === 'Dinner') {
    itemsToDisplay = itemsToDisplay.filter(item => item.type === 'Dinner')
  }

  if (state.selectedFilter === 'Shakes') {
    itemsToDisplay = itemsToDisplay.filter(item => item.type === 'Shakes')
  }

  return itemsToDisplay

 }





function renderHeader() {

  let headerEl = document.createElement("header");
  let h1HeaderEl = document.createElement("h1");
  h1HeaderEl.className = "header-title";
  h1HeaderEl.textContent = "Our Menu";

  let navheaderEl = document.createElement("nav");
  navheaderEl.className = 'header-nav"';

  let ulEl = document.createElement("ul");
  ulEl.className = "header-list";

  ////// we can use filter here

  let liEl = document.createElement("li");
  liEl.className = "header-list-elements";

  const aHeaderEl = document.createElement("a");
  aHeaderEl.className = "header-links";
  aHeaderEl.setAttribute('src', '#')
  aHeaderEl.textContent = 'All'

  liEl.append(aHeaderEl)
  ulEl.append(liEl,)
  navheaderEl.append(ulEl);



  let li2El = document.createElement("li");
  li2El.className = "header-list-elements";

  const a2HeaderEl = document.createElement("a");
  a2HeaderEl.className = "header-links";
  a2HeaderEl.setAttribute('src', '#')
  a2HeaderEl.textContent = 'Breakfast'

  li2El.append(a2HeaderEl)
  ulEl.append(li2El,)
  navheaderEl.append(ulEl);
  

  let li3El = document.createElement("li");
  li3El.className = "header-list-elements";

  const a3HeaderEl = document.createElement("a");
  a3HeaderEl.className = "header-links";
  a3HeaderEl.setAttribute('src', '#')
  a3HeaderEl.textContent = 'Lunch'

  li3El.append(a3HeaderEl)
  ulEl.append(li3El,)
  navheaderEl.append(ulEl);
  
  headerEl.append(h1HeaderEl, navheaderEl)
  document.body.append(headerEl)
}





function renderMenuProducts(product: Product, productList:any) {

     
   let divEl = document.createElement('div')
   divEl.className = 'main-product-container'


   let productWrapper = document.createElement('div')
   productWrapper.className = 'product-container'

   let imgEl = document.createElement('img')
   imgEl.className = 'product-image'
   imgEl.src= product.image
   imgEl.alt= product.name


   let productDetailsSpan = document.createElement('span')
   productDetailsSpan.className = 'text'

   let productNameEl = document.createElement('h3')
   productNameEl.textContent= product.name

   let productPriceEl = document.createElement('span')
   productPriceEl.className = 'product-price'
   productPriceEl.textContent = `£${product.price}`

   

  let productDescriptionEl = document.createElement('p')
  productDescriptionEl.className = 'product-description'
  productDescriptionEl.textContent= product.description

  productDetailsSpan.append(productNameEl, productPriceEl, productDescriptionEl )

  productWrapper.append(imgEl, productDetailsSpan)
  divEl.append(productWrapper)
  productList.append(productWrapper)

}


function renderProductList(mainEl:HTMLElement) {
  const productList = document.createElement('ul')
  productList.className = "product-list"

  for (const product of getItemsToDisplay()){
    renderMenuProducts(product, productList)
  }

  mainEl.append(productList)
  

}


function renderMain () {
  let mainEl = document.createElement('main')
     if(mainEl=== null) return

    renderProductList(mainEl)
  
  document.body.append(mainEl)

}


function render() {

  document.body.innerHTML = ''

   renderHeader()
   renderMain()

}

render()


getMenuProducts() .then(function(menu){
  state.menu = menu 
  render()
})


