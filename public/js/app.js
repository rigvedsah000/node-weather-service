console.log('Welcome to client side javascript!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const address = search.value
    
    fetch("http://localhost:3000/weather?address=" + encodeURIComponent(address)).then((response) => {
    response.json().then((data) => {
        const error = data.error
        if(error){
            return messageOne.textContent = error
        }

        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    })
})
})