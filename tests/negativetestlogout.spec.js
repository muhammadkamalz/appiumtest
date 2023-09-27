const { remote } = require('webdriverio')
const {expect} = require('chai')

const path = require('path')

const options = {
    hostname : '0.0.0.0',

    port : 4723,

    logLevel : 'debug',

    capabilities: {
        // capabilities for local Appium web tests on an Android Emulator
        platformName: 'Android', // or "iOS"
        'appium:deviceName' : 'HP Galaxy',
        'appium:automationName' : 'UiAutomator2',
        'appium:app' :  path.join(process.cwd(), 'apk/dummy.apk'),
        'appium:appActivity': '.MainActivity',
    },
}

describe('logout tanpa login', () => {
    it('Gagal Logout', async() => {

        const driver = await remote(options)
        const tombolbar = driver.$('//android.view.ViewGroup[@content-desc="open menu"]/android.widget.ImageView')
        const logout = driver.$('~menu item log out')
        const lanjutlogout = driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[2]')
        const sukseslogout = driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView')
      
        await tombolbar.click()
        await driver.pause(1000)
        await driver.touchAction([
            { action: 'press', x: 208, y: 1026 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 208, y: 254 },
            'release'
        ])
        await driver.pause(1000)
        await logout.click()
        await driver.pause(1000)
        await lanjutlogout.click()
        await driver.pause(1000)
        await expect(sukseslogout).to.not.exist
        await driver.deleteSession()
    })
})
