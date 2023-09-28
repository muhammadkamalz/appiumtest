const {remote} = require('webdriverio')
const options = require('../config/options')

async function bootDriver()  {
    const driver = await remote(options)
    return driver
}

module.exports = bootDriver