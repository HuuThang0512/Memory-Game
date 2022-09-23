const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const delayTimeOut = 1000
const cardsArray = [
    {
        name: "burger",
        img: "img/burger.png"
    },
    {
        name: "fire",
        img: "img/fire.png"
    },
    {
        name: "flash",
        img: "img/flash.png"
    },
    {
        name: "gift",
        img: "img/gift.png"
    },
    {
        name: "plant",
        img: "img/plant.png"
    },
    {
        name: "tron",
        img: "img/tron.png"
    },
    {
        name: "ufo",
        img: "img/ufo.png"
    },
    {
        name: "youtube",
        img: "img/youtube.png"
    },
]

const grid = $(".grid")
function renderCards() {
    const cardsArrayMerge = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random())
    grid.textContent = ""
    cardsArrayMerge.forEach((item) => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute('data-name', item.name)
        const front = document.createElement('div')
        front.classList.add('front')
        const back = document.createElement('div')
        back.classList.add('back')
        back.style.backgroundImage = `url(./${item.img})`
        card.appendChild(front)
        card.appendChild(back)
        grid.appendChild(card)
    })
}
renderCards()
function matchingCard(name) {
    const selectedCards = $$(`.selected`);
    [...selectedCards].forEach((card) => {
        card.classList.add('matched')
    })
    const matchedCards = $$('.matched')
    const cardsLength = $$('.card').length
    if(matchedCards.length == cardsLength) {
        setTimeout(renderCards, delayTimeOut/2)
    }
}
let count = 0;
let previousClicked = ""
let firstCard = ""
let secondCard = ""
function resetClicked() {
    count = 0
    firstCard = ""
    secondCard = ""
    previousClicked = null
    const selectedCards = $$(`.selected`);
    [...selectedCards].forEach((card) => {
        card.classList.remove('selected')
    })
}
grid.addEventListener('click', (e) => {
    const clicked = e.target
    // console.log();
    if(clicked.nodeName === 'SECTION' 
    || clicked.parentNode === previousClicked 
    || !clicked.parentNode.classList.contains('card')
    || clicked.parentNode.classList.contains('matched')) {
        return;
    }

    if(count < 2) {
        count++;
        clicked.parentNode.classList.add('selected')
        if(count == 1) {
            firstCard = clicked.parentNode.dataset.name 
        } else {
            if(clicked.parentNode !== previousClicked) {
                secondCard = clicked.parentNode.dataset.name
            } else {
                count--
            }
        }
    }
    previousClicked = clicked.parentNode
    if(firstCard && secondCard) {
        if(firstCard === secondCard) {
            setTimeout(matchingCard,delayTimeOut/2)
        }
        setTimeout(resetClicked,delayTimeOut)
    }

}) 