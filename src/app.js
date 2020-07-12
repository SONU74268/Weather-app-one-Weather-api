const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const port = process.env.PORT || 9000

//----------express Function call------------
const app = express()


//------------Define directry---------------
const IndexDirectry = path.join(__dirname , '../public')
const EnginePath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

//--------------use satic express-----------
app.use(express.static(IndexDirectry))

//------------set views with hbs------------
app.set('view engine','hbs')
app.set('views',EnginePath)

//-------register partial dynamically--------
hbs.registerPartials(partialPath)


//--------client side response---------

app.get('',(req,res) => {
    res.render('index',{
        title:'Home page !',
        name:'Lokesh'
    })
})

app.get('/help',(req , res) => {
    res.render('index_help',{
        title:'weather related',
        title1:'developer related ',
        name:'mukesh'
    })
})

app.get('/about',(req , res) => {
    res.render('index_about',{
        title:'Weather',
        name:'sonu',
        contact:'+917********5'
    })
})

app.get('/weather',(req , res) => {
    if(!req.query.address) {
            return res.send({
                error : 'address can not find!'
            })
    }
    else {
            geocode(req.query.address,(error ,{latitude,longitude,location} = {}) => {
                    if (error) {
                         return res.send({error})
                    }
                    forecast(latitude,longitude,(error,forecastData) => {
                        if (error) {
                            return res.send({error})
                        }
                        const forecastData_calsius =  forecastData - 273
                        res.send([{
                            location,
                            forecast : forecastData_calsius,
                            address: req.query.address
                        }])
                    })

            })    
    }    
})

app.get('*', (req, res) => {
    res.render('404_page',{
        errormsg : 'page Not found!',
        title : '404',
        name : 'sonu'

    })
})

app.get('/help/*',(req,res) => {
    res.render('404_page',{
        errormsg : 'help article not found!',
        title : '404',
        name : 'sonu'
    })
})
//-----------create the lister for the local Host--------------

app.listen(port,() => {
    console.log('server is up on port ' + port)
})
