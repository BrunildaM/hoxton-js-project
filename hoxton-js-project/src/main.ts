import "./style.css";


type Product = {
  id: number,
  type: string,
  name: string,
  image: string,
  price: number,
  description: string
  amountInCart: number
}

type State = {
  menu: Product[],
  typeFilters: string[],
  selectedFilter: string,
  selectedProduct: Product | null
  cart: Product[]
  cartOpen: boolean
}



let state: State = {
  menu: [],
  typeFilters: ['All', 'Breakfast', 'Lunch', 'Dinner', 'Shakes'],
  selectedFilter: '',
  selectedProduct: null,
  cart: [],
  cartOpen: false
}



function getMenuProducts() {
  return fetch('http://localhost:3005/menu').then(resp => resp.json())
}

function getInCart(){

  return state.menu.filter(product => product.amountInCart > 0)
}

function getTotalPrice(){

  let total = 0
  for (const product of getInCart()){
    total += product.amountInCart * product.price
    
    
  }

  return total

  
}

function addProductToCart(product:Product){

product.amountInCart++

}

function removeProductFromCart(product:Product){

  if (product.amountInCart > 0)
  product.amountInCart--


}




//  function getFilterTypes() {
//   return ['All', ...new Set(state.menu.map(item => item.type))]
// }

// getFilterTypes()

function getItemsToDisplay() {

  let itemsToDisplay = state.menu

  if (state.selectedFilter === 'Breakfast') {
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
    getItemsToDisplay()
    state.selectedProduct = null
    render()
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
    aHeaderEl.href = '#'
    aHeaderEl.textContent = filter

    aHeaderEl.addEventListener('click', function () {
      state.selectedFilter = filter
      state.selectedProduct = null
      render()
    })

    liEl.append(aHeaderEl)
    ulEl.append(liEl,)
  }
  navheaderEl.append(ulEl);

  headerEl.append(h1HeaderEl, navheaderEl)
  document.body.append(headerEl)
}





function renderSingleProduct(mainEl: HTMLElement) {

  let sectionSingleProduct = document.createElement("section");
  sectionSingleProduct.className = "single-product-section";


  let singleElWrapper = document.createElement('div')
  singleElWrapper.setAttribute("class", "single-product-div")

  let singleImageProduct = document.createElement('img')
  singleImageProduct.setAttribute("class", "single-image-product")
  //@ts-ignore
  singleImageProduct.src = state.selectedProduct.image

  let h3El = document.createElement('h3')
  h3El.setAttribute("class", "product-header-name")
  //@ts-ignore
  h3El.textContent = state.selectedProduct.name


  let singleProductPrice = document.createElement('span')
  singleProductPrice.setAttribute("class", "product-price")
  //@ts-ignore
  singleProductPrice.textContent = `£${state.selectedProduct.price}`

  let orderButtonEl = document.createElement("button");
  orderButtonEl.className = "order-button-El";
  orderButtonEl.textContent = 'ORDER'
  orderButtonEl.addEventListener('click', function () {


    //@ts-ignore

    state.cart.push(state.selectedProduct)
    // getInCart()

    render()


  })

  h3El.append(singleProductPrice, orderButtonEl)

  let singleParagraphEl = document.createElement('p')
  singleParagraphEl.setAttribute("class", "single-paragraph")
  //@ts-ignore
  singleParagraphEl.textContent = state.selectedProduct.description

  singleElWrapper.append(singleImageProduct, h3El, singleParagraphEl)



  sectionSingleProduct.append(singleElWrapper)
  mainEl.append(sectionSingleProduct)
}


function renderMenuProducts(product: Product, productList: any) {


  let divEl = document.createElement('div')
  divEl.className = 'main-product-container'


  let productWrapper = document.createElement('div')
  productWrapper.className = 'product-container'

  productWrapper.addEventListener('click', function () {
    state.selectedProduct = product
    render()
  })


  let imgEl = document.createElement('img')
  imgEl.className = 'product-image'
  imgEl.src = product.image
  imgEl.alt = product.name


  let productDetailsSpan = document.createElement('span')
  productDetailsSpan.className = 'text'

  let productNameEl = document.createElement('h3')
  productNameEl.className = 'product-header-name'
  productNameEl.textContent = product.name

  let productPriceEl = document.createElement('span')
  productPriceEl.className = 'product-price'
  productPriceEl.textContent = `£${product.price}`



  productNameEl.append(productPriceEl)



  let productDescriptionEl = document.createElement('p')
  productDescriptionEl.className = 'product-description'
  productDescriptionEl.textContent = product.description

  productDetailsSpan.append(productNameEl, productDescriptionEl)

  productWrapper.append(imgEl, productDetailsSpan)
  divEl.append(productWrapper)
  productList.append(productWrapper)

}


function renderProductList(mainEl: HTMLElement) {
  const productList = document.createElement('ul')
  productList.className = "product-list"

  for (const product of getItemsToDisplay()) {
    renderMenuProducts(product, productList)
  }

  mainEl.append(productList)
}



function renderMain() {
  const mainEl = document.createElement('main')

  if (state.selectedProduct !== null) {

    renderSingleProduct(mainEl)

  } else {

    renderProductList(mainEl)

  }

  renderCart(mainEl)


  document.body.append(mainEl)
}



function changeMode() {

  var element = document.body;
  element.classList.toggle("dark-mode");
}


function renderCart(mainEl: HTMLElement) {

  if (state.cartOpen) {

    let cartContentDiv = document.createElement('div')
    cartContentDiv.className = 'cart-content'

    let cartDiv = document.createElement('div')
    cartDiv.className = 'cart-wrapper'

    let cartHeader = document.createElement('div')
    cartHeader.className = 'cart__header'

    let cartTitle = document.createElement('h2')
    cartTitle.textContent = 'Products in cart'
    cartHeader.append(cartTitle)




    let cartBodyDiv = document.createElement('div')
    cartBodyDiv.className = 'cart__body'

    let bodyList = document.createElement('ul')
    bodyList.className = 'product-list'

    for (const product of state.cart) {

      let bodyListItem = document.createElement('li')
      bodyListItem.className = 'cart__product'


      let productImageCart = document.createElement('img')
      productImageCart.className = 'product-cart-image'
      productImageCart.src = product.image
      productImageCart.alt = product.name



      let cartProductName = document.createElement('h3')
      cartProductName.textContent = product.name


      let productPriceSpan = document.createElement('span')
      productPriceSpan.className = 'cart__price'
      productPriceSpan.textContent = `£${product.price}`



      let deleteProductDiv = document.createElement('div')
      deleteProductDiv.className = 'cart__actions'

      let deleteProductLink = document.createElement('a')
      deleteProductLink.href = '#0'
      deleteProductLink.className = 'cart__delete-item'
      deleteProductLink.textContent = 'Delete'

      deleteProductDiv.append(deleteProductLink)

      deleteProductDiv.addEventListener('click', function () {
        console.log('mos harro te fshish produktin nga cart')
      })

      let productQuantity = document.createElement('div')
      productQuantity.className = 'cd-cart__quantity'

      let labelQuantity = document.createElement('label')
      labelQuantity.className = 'product-productId'
      labelQuantity.textContent = 'Quantity'

      productQuantity.append(labelQuantity)

      bodyListItem.append(productImageCart, cartProductName, productPriceSpan, deleteProductDiv, productQuantity)
      bodyList.append(bodyListItem)

      cartBodyDiv.append(bodyList)




      let cartFotter = document.createElement('div')
      cartFotter.className = 'cart__footer'

      let cartPrice = document.createElement('h2')
      cartPrice.className = 'cart__total-price'
      cartPrice.textContent = `Total Price £0`

      

      let cartButton = document.createElement('button')
      cartButton.className = 'close-button'
      cartButton.textContent = 'X'
      cartButton.addEventListener('click', function () {
        state.cartOpen = false
        render()
      })


      cartFotter.append(cartPrice, cartButton)


      cartDiv.append(cartHeader, cartBodyDiv, cartFotter)

      cartContentDiv.append(cartDiv)

      mainEl.append(cartContentDiv)
    }

  }

  else {
    let cartIcon = document.createElement('img')
    cartIcon.src = 'https://cdn-icons-png.flaticon.com/512/4290/4290854.png'
    cartIcon.className = 'carticon-image'

    cartIcon.addEventListener('click', function () {
      state.cartOpen = true

      render()
    })

    mainEl.append(cartIcon)
  }

}




function renderFooter() {

  let footerEl = document.createElement('footer')

  let darkModeDiv = document.createElement('div')
  darkModeDiv.id = 'container'

  let titleEl = document.createElement('h2')
  titleEl.textContent = 'Change Light / Dark mode'

  let labelEl = document.createElement('label')
  labelEl.className = "switch"

  let inputEl = document.createElement('input')
  inputEl.type = 'checkbox'

  inputEl.addEventListener('click', function () {
    changeMode()
  })

  let spanEl = document.createElement('span')
  spanEl.className = 'slider'

  labelEl.append(inputEl, spanEl)

  darkModeDiv.append(titleEl, labelEl)

  footerEl.append(darkModeDiv)

  document.body.append(footerEl)


}




function render() {

  document.body.innerHTML = ''

  renderHeader()
  renderMain()
  renderFooter()

}

render()



getMenuProducts().then(function (menu) {
  state.menu = menu
  render()
})

