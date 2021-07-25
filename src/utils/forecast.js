const request = require('request')

const forecast = (lat , long , callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?' + 'lat='+ lat + '&lon=' + long + '&APPID=a7eee274cb4de2154413e3acb070304f'
    request({url,json : true},(error,{body}) => {
      if (error) {
        callback("unable to connect to the network!",undefined)
      } else if (body.message) {
          callback('unable to load location . please try with diff latitude and longitude! ', undefined )
      } else {
        callback(undefined,(body.main.temp - 273) + '℃.' + body.weather[0].description)
      }
    })
}

module.exports = forecast