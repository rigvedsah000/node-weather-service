const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views lcoation
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rigved Sah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rigved Sah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rigved Sah',
        message: 'This is a help message!'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            code: 555,
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, { location, latitude, longitude } = {}) => {
        if(error){
            return res.send({
                code: 556,
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    code: 557,
                    error
                })
            }

            res.send({
                address,
                location,
                forecast: forecastData
            })
        })
    })
    
})

app.get('/help/*', (req ,res) => {
    res.render('404', {
        title: 'Error 404',
        name: "Rigved Sah",
        error: 'Help article not found!'
    })
})

app.get('*', (req ,res) => {
    res.render('404', {
        title: 'Error 404',
        name: "Rigved Sah",
        error: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})