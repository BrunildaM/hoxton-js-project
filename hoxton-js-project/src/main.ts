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
  selectedFilter: '', 
  selectedProduct: null
}



function getMenuProducts() {
  return fetch ('http://localhost:3005/menu') .then (resp => resp.json())
 }



  // const addItems = document.querySelector('.add-items');
  // const itemsList = document.querySelector('.plates');
  // const checkBtn = document.querySelector('.check-btn');
  // const deleteAllBtn = document.querySelector('.delete-all-btn');
  // const orderBtn = document.querySelector('.order-btn');
  
  


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
      getItemsToDisplay()
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
  aHeaderEl.href= '#'
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





function renderSingleProduct(mainEl:HTMLElement){

  let sectionSingleProduct = document.createElement("section");
  sectionSingleProduct.className = "single-product-section";

  


  let singleElWrapper = document.createElement('div')
  singleElWrapper.setAttribute("class", "single-product-div")

  let singleImageProduct = document.createElement('img')
  singleImageProduct.setAttribute("class", "single-image-product")
  //@ts-ignore
  singleImageProduct.src= state.selectedProduct.image

  let h3El = document.createElement('h3')
  h3El.setAttribute ("class", "product-header-name")
  //@ts-ignore
  h3El.textContent= state.selectedProduct.name


  let singleProductPrice = document.createElement('span')
  singleProductPrice.setAttribute("class", "product-price")
  //@ts-ignore
  singleProductPrice.textContent= `£${state.selectedProduct.price}`

  let orderButtonEl = document.createElement("button");
  orderButtonEl.className = "order-button-El";
  orderButtonEl.textContent= 'ORDER'
  orderButtonEl.addEventListener ('click', function () {
        // event.preventDefault(); 
    
        //   renderOrderForm ()
    render()

  })  

  h3El.append(singleProductPrice, orderButtonEl)

  let singleParagraphEl = document.createElement('p')
  singleParagraphEl.setAttribute("class","single-paragraph")
  //@ts-ignore
  singleParagraphEl.textContent= state.selectedProduct.description

  singleElWrapper.append(singleImageProduct, h3El, singleParagraphEl)


  
  sectionSingleProduct.append(singleElWrapper)
  mainEl.append(sectionSingleProduct)
}


function renderMenuProducts(product: Product, productList:any) {

     
   let divEl = document.createElement('div')
   divEl.className = 'main-product-container'


   let productWrapper = document.createElement('div')
   productWrapper.className = 'product-container'

   productWrapper.addEventListener('click', function() {
    state.selectedProduct = product
    render()
  })


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
  const mainEl = document.createElement('main')

  if (state.selectedProduct !== null){

    renderSingleProduct(mainEl)

  }else  {

    renderProductList(mainEl)

  }

  
  document.body.append(mainEl)
}




// function renderOrderForm () {

//   let backgroundImg = document.createElement('img')
//   backgroundImg.src = 'https://www.vectorstock.com/royalty-free-vector/restaurant-background-vector-400201'
//   backgroundImg.className = 'background-image'

//   let orderWrapper = document.createElement('div')
//   orderWrapper.className = 'wrapper'

//   let titleEl = document.createElement('h2')
//   titleEl.textContent = 'Hox-Restro'
//   titleEl.className = 'name'

//   let dishesList = document.createElement('ul')
//   dishesList.className = 'plates'

//   let dishesListItems = document.createElement('li')
//   dishesListItems.textContent = 'Loading Dishes...'

//   dishesList.append(dishesListItems)

//   let formEl = document.createElement('form')
//   formEl.className = 'add-items'

//   let addItemInput = document.createElement('input')
//   addItemInput.placeholder = 'Item Name'
//   addItemInput.type = 'text'
//   addItemInput.required = true

//   let submitInput = document.createElement('input')
//   submitInput.type = 'submit'
//   submitInput.value = '+ Add Item'

//   formEl.append(addItemInput, submitInput)

//   let checkBttn = document.createElement('button')
//   checkBttn.className = 'check-btn'
//   checkBttn.textContent = 'Check'

//   let deleteBttn = document.createElement('button')
//   deleteBttn.className = 'delete-all-btn'
//   deleteBttn.textContent = 'Delete All'

//   let orderNowDiv = document.createElement('div')

//   let OrderNowBttn = document.createElement('button')
//   OrderNowBttn.className = 'order-btn'
//   OrderNowBttn.textContent = 'Order Now'

//   orderNowDiv.append(OrderNowBttn)

//   orderWrapper.append(titleEl, dishesList, formEl, checkBttn, deleteBttn, orderNowDiv)

//   document.body.append(orderWrapper)

// }



// function renderFooter () {

//   let footerEl = document.createElement('footer')
//   footerEl.className = 'footer'

//   let orderButton = document.createElement('button')
//    orderButton.className = 'order-button'
//    orderButton.textContent = 'ORDER'

//    orderButton.addEventListener('click', function (event) {
//     event.preventDefault(); 

//       renderOrderForm ()

//    })

//    footerEl.append(orderButton)

//    document.body.append(footerEl)

// }


function changeMode() {
      
  var element = document.body;
  element.classList.toggle("dark-mode");
}


function addToCart () {

  let cartDiv = document.createElement('div')
  cartDiv.className = 'cd-cart.cd-cart--empty.js-cd-cart'

  let cartLink = document.createElement('a')
  cartLink.href = '#0'
  cartLink.className = 'cd-cart__trigger.text-replace'
  cartLink.textContent = 'Cart'

  let cartList = document.createElement('ul')
  cartList.className = 'cd-cart__count'

  let cartListItem1 = document.createElement('li')
  cartListItem1.value = 0

  let cartListItem2 = document.createElement('li')
  cartListItem2.value = 0

  cartList.append(cartListItem1, cartListItem2)
  cartLink.append(cartList)


  let cartContentDiv = document.createElement('div')
  cartContentDiv.className = 'cd-cart__content'

  let cartLayoutDiv = document.createElement('div')
  cartLayoutDiv.className = 'cd-cart__layout'

  let cartHeader = document.createElement('div')
  cartHeader.className = 'cd-cart__header'

  let cartTitle = document.createElement('h2')
  cartTitle.textContent = 'Cart'

  let cartSpan = document.createElement('span')
  cartSpan.className = 'cd-cart__undo'
  cartSpan.textContent = 'Item removed.'

  let undoLink = document.createElement('a')
  undoLink.href = '#0'
  undoLink.textContent = 'Undo'

  cartSpan.append(undoLink)

  cartHeader.append(cartTitle, cartSpan)


  cartLayoutDiv.append(cartHeader)
  cartContentDiv.append(cartLayoutDiv)
  cartDiv.append(cartContentDiv)

  let cartBodyDiv = document.createElement('div')
  cartBodyDiv.className = 'cd-cart__body'

  let bodyList = document.createElement('ul')


  let bodyListItem = document.createElement('li')
  bodyListItem.className = 'cd-cart__product'


  let cartImageDiv = document.createElement('div')
  cartImageDiv.className = 'cd-cart__image'

  let imageLink = document.createElement('a')
  imageLink.textContent= '#0'

  let productImageCart = document.createElement('img')
  productImageCart.src = ''
  productImageCart.alt = ''

  imageLink.append(productImageCart)
  cartImageDiv.append(imageLink)




  let cartDetailsDiv = document.createElement('div')
  cartDetailsDiv.className = 'cd-cart__details'

  let productNameCart = document.createElement('h3')
  productNameCart.className = 'truncate'

  let productLinkCart = document.createElement('a')
  productLinkCart.href = '#0'
  productLinkCart.textContent = 'Product Name'

  let productPriceSpan = document.createElement('span')
  productPriceSpan.className = 'cd-cart__price'
  productPriceSpan.textContent = '$25.99'

  productNameCart.append(productLinkCart)

  let deleteProductDiv = document.createElement('div')
  deleteProductDiv.className= 'cd-cart__actions'

  let deleteProductLink = document.createElement('a')
  deleteProductLink.href = '#0'
  deleteProductLink.className = 'cd-cart__delete-item'
  deleteProductLink.textContent = 'Delete'

  let productQuantity = document.createElement('div')
  productQuantity.className = 'cd-cart__quantity'

  let labelQuantity = document.createElement('label')
  labelQuantity.className = 'cd-product-productId'
  labelQuantity.textContent = 'Qty'

  let selectProduct = document.createElement('span')
  selectProduct.className = 'cd-cart__select'
  
  

  /*
   <ul>
    <li class="cd-cart__product">
    
            <label for="cd-product-productId">Qty</label>

            <span class="cd-cart__select">
              <select class="reset" id="cd-product-productId" name="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <!-- ... -->
              </select>

              <svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg>
            </span>
          </div>
        </div>
      </div>
    </li>

    <!-- other products added to the cart -->
  </ul>
</div>

  */

  cartBodyDiv.append(bodyList)

/*
<footer class="cd-cart__footer">
        <a href="#0" class="cd-cart__checkout">
          <em>Checkout - $<span>0</span>
            <svg class="icon icon--sm" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><line stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="3" y1="12" x2="21" y2="12"/><polyline stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="15,6 21,12 15,18 "/></g>
            </svg>
          </em>
        </a>
      </footer>
    </div>
  </div> <!-- .cd-cart__content -->
</div> <!-- cd-cart -->

*/

let cartFotter = document.createElement('div')
cartFotter.className= 'cd-cart__footer'


let checkoutLink = document.createElement('a')
checkoutLink.href = '#0'
checkoutLink.className = 'cd-cart__checkout'
checkoutLink.textContent = 'Checkout - £'


let cartPrice = document.createElement('span')
cartPrice.textContent = '0'

let cartButton = document.createElement('button')
cartButton.textContent = 'X'

checkoutLink.append(cartPrice, cartButton)
cartFotter.append(checkoutLink)






}



function renderFooter () {

  let footerEl = document.createElement('footer')

  let darkModeDiv = document.createElement('div')
  darkModeDiv.id = 'container'

  let titleEl = document.createElement('h2')
  titleEl.textContent = 'Change Light / Dark mode'

  let labelEl = document.createElement('label')
  labelEl.className = "switch"

  let inputEl = document.createElement('input')
  inputEl.type = 'checkbox'

  inputEl.addEventListener('click', function() {
    changeMode()
  }) 

  let spanEl = document.createElement('span')
  spanEl.className = 'slider'

  labelEl.append(inputEl, spanEl)

  darkModeDiv.append(titleEl,labelEl)

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

 

getMenuProducts() .then(function(menu){
  state.menu = menu 
  render()
})

