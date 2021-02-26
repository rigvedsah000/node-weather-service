const request = require('request')


const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=8a1e1714cacba96e2a3b38d6e5cc1fcf&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)
    
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback(body.error.info, undefined)
        }
        else {
            const actualTemp = body.current.temperature
            const apparentTemp = body.current.feelslike
            const weatherDesc = body.current.weather_descriptions[0]

            callback(undefined, weatherDesc + '. It is currently ' + actualTemp + ' degrees out. It feels like ' + apparentTemp + ' degrees out.')
        }   
    })
}



module.exports = forecast