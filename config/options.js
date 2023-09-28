const path = require('path')
const options = {
    hostname : '0.0.0.0',

    port : 4723,

    logLevel : 'error',

    capabilities: {
        // capabilities for local Appium web tests on an Android Emulator
        platformName: 'Android', // or "iOS"
        'appium:deviceName' : 'HP Galaxy',
        'appium:automationName' : 'UiAutomator2',
        'appium:app' :  path.join(process.cwd(), 'apk/dummy.apk'),
        'appium:appActivity': '.MainActivity',
        // 'appium:noReset' : 'true',
        // 'appium:fullReset' : 'false'
    },
}

module.exports = options