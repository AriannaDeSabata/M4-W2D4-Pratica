
const detailsBox = document.getElementById("detailsBook")
const bookEndPoint = 'https://striveschool-api.herokuapp.com/books'

const query = window.location.search
const params = new URLSearchParams(query)
const bookId = params.get("q")

function fetchDetailsBook(){
    fetch(`${bookEndPoint}/${bookId}`)
    .then(responde => responde.json())
    .then(book => renderDetailsBook(book))
    .catch(err => console.log(err))
}

function renderDetailsBook({img, title, category, price}){

    let contImg = document.createElement("div")
    contImg.classList.add("col-12", "col-md-6","col-lg-4", "d-flex" , "justify-content-center")

    let imgDetails = document.createElement("img")
    imgDetails.setAttribute("src", `${img}`)
    imgDetails.classList.add("imgDetails","cardHeader")

    let contDetails = document.createElement("div")
    contDetails.classList.add("col-12","col-md-6","col-lg-4","p-2","p-sm-5", "contDetails")

    let titleDetails = document.createElement("h3")
    titleDetails.classList.add("m-0")
    titleDetails.innerText = title

    let categoryDetails = document.createElement("p")
    categoryDetails.innerText = category

    let priceDetails = document.createElement("span")
    priceDetails.innerText = price + " €"


    contDetails.append(titleDetails, categoryDetails, priceDetails)
    contImg.appendChild(imgDetails)
    detailsBox.append(contImg, contDetails)
    

}



fetchDetailsBook()

