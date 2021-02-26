const request = require('request')


const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibWlrZWZlcjI1NCIsImEiOiJja2xjbHRmeHgxdXR4MnducDN0NDBiMjZwIn0.lEEAbd4v-sm_rl8UZZHQeA&limit=1'
    
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback("Unable to get weather service!", undefined)
        }
        else if (body.features.length == 0) {
            callback("Invalid location parameter!", undefined)
        }
        else {
            const location = body.features[0].place_name
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]

            callback(undefined, {
                location: location,
                latitude: latitude,
                longitude: longitude
            })
        }
    })
}


module.exports = geocode