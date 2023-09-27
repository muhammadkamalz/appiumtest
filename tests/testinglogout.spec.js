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
        'appium:noReset' : 'true',
        'appium:fullReset' : 'false'
    },
}

describe ('Proses Login', () => {
    it('Berhasil Buka halaman login dan login', async() => {

        const driver = await remote(options)
        // tombol untuk buka halaman login
        const tombolbar = driver.$('//android.view.ViewGroup[@content-desc="open menu"]/android.widget.ImageView')
        const kliklogin = driver.$('//android.view.ViewGroup[@content-desc="menu item log in"]')
        
        //login

        const username = driver.$('//android.widget.EditText[@content-desc="Username input field"]') 
        const password = driver.$('~Password input field')
        const submit = driver.$('//android.view.ViewGroup[@content-desc="Login button"]')
        const ceklogined = driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView')

        
        
        await tombolbar.click()
        await driver.pause(1000)

        await kliklogin.click()
        await driver.pause(1000)


        await username.setValue('bob@example.com')
        await driver.pause(1000)
        await password.setValue('10203040')
        await driver.pause(1000)
        await submit.click()
        await expect (ceklogined).to.exist
    })
    it('Berhasil Logout', async() => {
        const driver = await remote(options)
        
        const tombolbar = driver.$('//android.view.ViewGroup[@content-desc="open menu"]/android.widget.ImageView')
        const logout = driver.$('~menu item log out')
        const lanjutlogout = driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[2]')
        const sukseslogout = driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView')
        const logoutbox = driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout')

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
        await expect(logoutbox).to.exist
        await driver.pause(1000)
        await lanjutlogout.click()
        await driver.pause(1000)
        await expect(sukseslogout).to.exist
        await driver.deleteSession()
    })

})
   