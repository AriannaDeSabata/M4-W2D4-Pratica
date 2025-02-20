
let bookSection = document.getElementById("bookSection")
let inputSearch = document.getElementById("inputSearch")
let buttonSearch = document.getElementById("buttonSearch")
let row = document.getElementById("rowBooks")
const baseEndPoint = 'https://striveschool-api.herokuapp.com/books'
let cart = document.getElementById("cartListBooks")
let totalCart = document.getElementById("totalCart")
let notification = document.querySelector("#notification .bi")


inputSearch.addEventListener("keyup", searchBook)
let allBook = []


function fetchBook(){
  fetch(baseEndPoint)
    .then(response => response.json())
    .then(listBook => {
      allBook = listBook
      console.log(allBook)
      renderBooks(listBook)
    })

    .catch(err=> console.log(err))
}


function renderBooks(list){
    row.innerHTML = ""
    const listCards= list.map((books)=> createCardBook(books))
    row.append(...listCards)
}

function createCardBook({category, img, price, title, asin}){

  let card = createDiv()
  card.classList.add("card", "col-6", "col-md-3","col-lg-2","my-4")

  let cardHeader = createDiv()
  cardHeader .classList.add("cardHeader")

  let imgCard = document.createElement("img")
  imgCard.classList.add("card-img-top")
  imgCard.setAttribute("src", `${img}`)
  imgCard.setAttribute("alt", "image book")
  
  let cardBody = createDiv()
  cardBody.classList.add("card-body")

  let titleCard = document.createElement("h6")
  titleCard.classList.add("card-title")
  titleCard.innerText = title

  let categoryCard =document.createElement("p")
  categoryCard.innerText = category
  categoryCard.classList.add("card-text")

  let details = document.createElement("a")
  details.innerText ="Details"
  details.setAttribute("href", `details.html?q=${asin}`)
  details.classList.add("card-text")


  let priceCard = document.createElement("span")
  priceCard.innerText = price + " €"
  priceCard.classList.add("price")

  
  let cardFooter = createDiv()
  cardFooter .classList.add("card-footer", "d-flex", "justify-content-between", "align-items-end")
  cardFooter.classList.add("d-flex")

  let contButton = createDiv()

  let cartButton = document.createElement("button")
  cartButton.classList.add("cartButton")
  cartButton.innerHTML = "<i class='bi bi-cart'></i>"
  cartButton.addEventListener("click", ()=>{
    addBookCart(title, img, price)
    notification.classList.remove("d-none")}

  )

  let skipButton = document.createElement("button")
  skipButton.classList.add("skipButton")
  skipButton.innerText ="SKIP"
  skipButton.addEventListener("click", ()=>{
    card.remove()
  })


  cardHeader.appendChild(imgCard)
  cardBody.append(titleCard, categoryCard, details)
  contButton.append( cartButton, skipButton)
  cardFooter.append(priceCard, contButton)
  card.append(cardHeader, cardBody, cardFooter)


  return card
}

function createDiv(){
   return document.createElement("div")
}


function searchBook(){

  let searchValue = inputSearch.value
  let val = searchValue.toLowerCase()
  const filterBook = allBook.filter((list) => {

    if(
      list.title.toLowerCase().includes(val)
    ){
      return true
    } else {
      return false
    }


  })

  if(filterBook.length === 0){
    row.innerHTML ="<h3 class='text-center mt-5'>Not Found</h3>"

  } else {  
    renderBooks(filterBook)
  }
}

let cartItems = []

function addBookCart(title, img, price){
  
  if(cartItems.includes(title)){
    alert("This book is already in your cart")
    return
  }
  cartItems.push(title)
  
  let liCart = document.createElement("li")

  let cont = createDiv()
  cont.classList.add("d-flex", "gap-2")

  let imgCart = document.createElement("img")
  imgCart.setAttribute("src", `${img}`)
  imgCart.classList.add("imgCart")
  
   let contnInfoBook = createDiv()
   contnInfoBook.classList.add("d-flex", "flex-column", "justify-content-center")

  let  titleCart = document.createElement("p")
  titleCart.innerText = title

  let priceCart= document.createElement("span")
  priceCart.classList.add("price")
  priceCart.innerText = price

  let btnRemove = document.createElement("button")
  btnRemove.innerHTML= "<i class='bi bi-x'></i>"
  btnRemove.classList.add("btnRemove")
  btnRemove.addEventListener("click", ()=>{
    liCart.remove() 
    currentTotal = parseFloat(totalCart.innerText)
    totalCart.innerText = (currentTotal - parseFloat(price)).toFixed(2)
  })


  contnInfoBook.append( titleCart, priceCart)
  cont.append(imgCart, contnInfoBook )
  liCart.append(cont, btnRemove)
  cart.prepend(liCart)

  let currentTotal = parseFloat(totalCart.innerText)
  totalCart.innerText = (currentTotal + parseFloat(price)).toFixed(2)


}




function showCart(){
  cart.classList.toggle("d-none")
}





fetchBook()