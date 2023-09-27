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
        'appium:appActivity': '.MainActivity'

    },
}


describe('Tes login tanpa username / password', async() => {
    it ('Tanpa username & gagal login', async () => {
        //data buka halaman login
        const driver = await remote(options)
        const tombolbar = driver.$('//android.view.ViewGroup[@content-desc="open menu"]/android.widget.ImageView')
        const kliklogin = driver.$('//android.view.ViewGroup[@content-desc="menu item log in"]')
        const submit = driver.$('//android.view.ViewGroup[@content-desc="Login button"]')
        const cekusername = driver.$('//android.view.ViewGroup[@content-desc="Username-error-message"]/android.widget.TextView')

        //proses login
        await tombolbar.click()
        await driver.pause(1000)
        await kliklogin.click()
        await driver.pause(1000)
        await submit.click()
        await driver.pause(1000)
        await expect(cekusername).to.exist
        await driver.pause(1000)
    })
    it('Tanpa password & gagal login', async () => {
        //data untuk cek error password
        const driver = await remote(options)
        const tombolbar = driver.$('//android.view.ViewGroup[@content-desc="open menu"]/android.widget.ImageView')
        const kliklogin = driver.$('//android.view.ViewGroup[@content-desc="menu item log in"]')
        const username = driver.$('//android.widget.EditText[@content-desc="Username input field"]') 
        const cekpassword = driver.$('//android.view.ViewGroup[@content-desc="Password-error-message"]/android.widget.TextView')
        const submit = driver.$('//android.view.ViewGroup[@content-desc="Login button"]')

        //proses cek error password
        await tombolbar.click()
        await driver.pause(1000)
        await kliklogin.click()
        await username.setValue('ddos')
        await driver.pause(1000)
        await submit.click()
        await driver.pause(1000)
        await expect(cekpassword).to.exist
        await driver.pause(1000)
        await driver.deleteSession()
    })
    it('Login dengan username & password yg salah', async () => {
        
        //data untuk login gagal
        const driver = await remote(options)
        const tombolbar = driver.$('//android.view.ViewGroup[@content-desc="open menu"]/android.widget.ImageView')
        const kliklogin = driver.$('//android.view.ViewGroup[@content-desc="menu item log in"]')
        const username = driver.$('//android.widget.EditText[@content-desc="Username input field"]') 
        const password = driver.$('~Password input field')
        const submit = driver.$('//android.view.ViewGroup[@content-desc="Login button"]')
        const errormsg = driver.$('//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView')

        //proses gagallogin
        await tombolbar.click()
        await driver.pause(1000)
        await kliklogin.click()
        await driver.pause(1000)
        await username.setValue('203')
        await password.setValue('404')
        await driver.pause(1000)
        await submit.click()
        await driver.pause(1000)
        await expect(errormsg).to.exist
    })
})