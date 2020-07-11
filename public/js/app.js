
console.log('Enter Weather location to find the weather!')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg_1')
const msgTwo = document.querySelector('#msg_2')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''


    fetch('http://localhost:9000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                msgOne.textContent = data.error
            }
            else {
                msgOne.textContent = data[0].forecast
                msgTwo.textContent = data[0].location
            // console.log('current weather for this location : ' + data[0].forecast)
            // console.log('current weather for this location : ' + data[0].location)
            
            }
        })

    })
})
