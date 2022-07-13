let events = []
let arr = []

const eventName = document.querySelector("#eventName")
const eventDate = document.querySelector("#eventDate")
const buttonAdd = document.querySelector("#bAdd")
const eventsContainer = document.querySelector("#eventsContainer")

const json = load()

try {
    arr = JSON.parse(json)
} catch (error) {
    arr = []
}

events = arr ? [...arr] : []

renderEvents()

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    addEvent()
})

buttonAdd.addEventListener("click", e => {
    e.preventDefault()
    addEvent()
})

function addEvent() {
    if(eventName.value === '' || eventDate.value === '') return
    if(dateDiff(eventDate.value) < 0) return

    const newEvet = {
        id : (Math.random() * 100).toString(36).slice(3),
        name : eventName.value ,
        date : eventDate.value
    }

    events.unshift(newEvet)
    save(JSON.stringify(events))
    eventName.value = ''
    renderEvents()
}

function dateDiff(dates){
    const dateUser = new Date(dates)
    const dateToday = new Date()
    const difference = dateUser.getTime() - dateToday.getTime()
    const days = Math.ceil(difference / (1000 * 3600 * 24))
    return days
}

function renderEvents(){
    const eventsHTML = events.map(event => {
        return `
            <div class="event">
                <div class="days">
                    <p class="days-number">${dateDiff(event.date)}</p>
                    <p class="days-text">dias</p>
                </div>
                <p class="event-name">${event.name}</p>
                <p class="event-date">${event.date}</p>
                <div class="actions">
                    <button class="bDelete" data-id="${event.id}">Eliminar</button>
                </div>
            </div>
        `
    })
    eventsContainer.innerHTML = eventsHTML.join("")
    document.querySelectorAll(".bDelete").forEach(button => {
        button.addEventListener("click", e => {
            const id = button.getAttribute("data-id")
            events = events.filter(event => event.id !== id )
            save(JSON.stringify(events))
            renderEvents()
        })
    })
}

function save(data) {
    localStorage.setItem("items", data)
}

function load(){
    return localStorage.getItem("items")
}