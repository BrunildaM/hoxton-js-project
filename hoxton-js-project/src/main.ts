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
  selectedFilter: string,
  selectedProduct: Product | null
}



let state: State = {
  menu: [],
  typeFilters: ['All', 'Breakfast', 'Lunch', 'Dinner', 'Shakes'],
  selectedFilter: 'All', 
  selectedProduct: null

}



function selectProduct (Products:Product){
  state.selectedProduct = Products
}

function deselectProduct (Products:Product){
  state.selectedProduct = null
}

function getMenuProducts() {
  return fetch ('http://localhost:3005/menu') .then (resp => resp.json())
 }



//  function getFilterTypes() {
//   return ['All', ...new Set(state.menu.map(item => item.type))]
// }

// getFilterTypes()

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

  headerEl.addEventListener('click', function () {
    state.selectedFilter = 'All'
    state.selectedProduct = null
    render ()
  })


  let navheaderEl = document.createElement("nav");
  navheaderEl.className = 'header-nav"';

  let ulEl = document.createElement("ul");
  ulEl.className = "header-list";


for (const filter of state.typeFilters) {

  let liEl = document.createElement("li");
  liEl.className = "header-list-elements";

  const aHeaderEl = document.createElement("a");
  aHeaderEl.className = "header-links";
  aHeaderEl.href= filter
  aHeaderEl.textContent = filter

  aHeaderEl.addEventListener('click', function () {
    state.selectedFilter = filter
    state.selectedProduct = null
    render ()
  })

  liEl.append(aHeaderEl)
  ulEl.append(liEl,)
}
  navheaderEl.append(ulEl);

  headerEl.append(h1HeaderEl, navheaderEl)
  document.body.append(headerEl)
}


function renderSingleProduct(product:Product){

let mainEl = document.querySelector('main')

if (mainEl === null ) return
mainEl.textContent = ''
console.log(mainEl)

   let sectionSingleProduct = document.createElement("section");
  sectionSingleProduct.className = "single-movie-section";

  let buttonBack = document.createElement("button");
  buttonBack.className = "back-button";
  buttonBack.textContent= '⬅Back'
  buttonBack.addEventListener ('mouseenter', function (){

    deselectProduct(product)

    render()

  })  


let singleElWrapper = document.createElement('div')
singleElWrapper.setAttribute("class", "single-product-div")

let singleImageProduct = document.createElement('img')
singleImageProduct.setAttribute("class", "single-image-product")
singleImageProduct.src= state.selectedProduct.image
singleImageProduct.addEventListener('click', function(){
  selectProduct(product)
  render()
  })

let h3El = document.createElement('h3')
h3El.setAttribute ("class", "h3-title")

h3El.textContent= state.selectedProduct.name



let singleProductPrice = document.createElement('span')
singleProductPrice.setAttribute("class", "single-product-price")
singleProductPrice.textContent= state.selectedProduct.price

let singleParagraphEl = document.createElement('p')
singleParagraphEl.setAttribute("class","single-paragraph")
singleParagraphEl.textContent= state.selectedProduct?.description


mainEl.append(sectionSingleProduct)
sectionSingleProduct.append(singleElWrapper, singleImageProduct,h3El, singleProductPrice, singleParagraphEl)

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
   productNameEl.className = 'product-header-name'
   productNameEl.textContent= product.name

   let productPriceEl = document.createElement('span')
   productPriceEl.className = 'product-price'
   productPriceEl.textContent = `£${product.price}`

   productNameEl.append(productPriceEl)

   

  let productDescriptionEl = document.createElement('p')
  productDescriptionEl.className = 'product-description'
  productDescriptionEl.textContent= product.description

  productDetailsSpan.append(productNameEl, productDescriptionEl )

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
   renderSingleProduct()

}

render()

 

getMenuProducts() .then(function(menu){
  state.menu = menu 
  render()
})


// KJO DUHET PO SDI KU TA FUS KETU *8**8****
// function render(){
// if(state.selectedProduct) renderSingleProduct()
//   else renderMenuProducts()

// }