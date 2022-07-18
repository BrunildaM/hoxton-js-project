import "./style.css";

// let state = {
//   menu: [],
//   typeFilters:['All', 'Breafast', 'Lunch', 'Dinner', 'Shakes']

// }

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

  navheaderEl.append(ulEl);
  ulEl.append(liEl,);
  liEl.append(aHeaderEl)
  headerEl.append(navheaderEl, ulEl,liEl)
  document.body.append(headerEl)
  

  render();
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
imgEl.src= ''
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


}

renderHeader()
renderMenuProducts()
