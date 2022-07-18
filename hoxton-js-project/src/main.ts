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
  product: Product[],
  typeFilters: string[]
}



let state: State = {
  product: [],
  typeFilters: ['All', 'Breafast', 'Lunch', 'Dinner', 'Shakes']

}


function getMenuProducts() {
  return fetch ('http://localhost:3005/menu') .then (resp => resp.json())
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

  liEl.append(aHeaderEl)
  ulEl.append(liEl,)
  navheaderEl.append(ulEl);
  
  
  headerEl.append(h1HeaderEl, navheaderEl)
  document.body.append(headerEl)
}





function renderMenuProducts(){
let mainEl = document.querySelector('main')
if(mainEl=== null) return

mainEl.textContent= '';

let divEl = document.createElement('div')
divEl.className = 'main-product-container'
mainEl.append(divEl)

///// ketu mund te perdorim loop

let divProductContainer = document.createElement('div')
divProductContainer.className = 'product-container'

let imgEl = document.createElement('img')
imgEl.src= 'https://www.gordonramsayrestaurants.com/assets/Uploads/_resampled/CroppedFocusedImage108081050-50-TN-American-Style-Dirty-Burger.jpg'
imgEl.alt= ''


let spanMainEl = document.createElement('span')
spanMainEl.className = 'text'

let h3MainEl = document.createElement  ('h3')
h3MainEl.textContent= '';

let spanPriceEl = document.createElement('span')
spanPriceEl.className = 'product-price'

let pEl = document.createElement('p')
pEl.textContent= '';



divEl.append(divProductContainer)
divProductContainer.append(imgEl, spanMainEl,pEl)
spanMainEl.append(h3MainEl,spanPriceEl)

}


function render() {

  document.body.innerHTML = ''

   renderHeader()
   renderMenuProducts()

}

render()


