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

describe('Proses Fungsi Utama', async() => {

    it('Berhasil login', async() => {

        const driver = await remote(options)
   
        
        await driver.$('//android.view.ViewGroup[@content-desc="open menu"]/android.widget.ImageView').click()
        await driver.pause(1000)

        await driver.$('//android.view.ViewGroup[@content-desc="menu item log in"]').click()
        await driver.pause(1000)


        await driver.$('//android.widget.EditText[@content-desc="Username input field"]').setValue('bob@example.com')
        await driver.pause(1000)
        await driver.$('~Password input field').setValue('10203040')
        await driver.pause(1000)
        await driver.$('//android.view.ViewGroup[@content-desc="Login button"]').click()
        await expect (driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView')).to.exist
    })
    it('Berhasil memassukkan barang ke keranjang', async() => {
        //data yang ingin diverif dan di klik
        
        const driver = await remote(options)
   
        const item1 = await driver.$('(//android.view.ViewGroup[@content-desc="store item"])[1]')
        const tambah = await driver.$('~Add To Cart button')
        const keranjang = await driver.$('//android.view.ViewGroup[@content-desc="cart badge"]/android.widget.ImageView')
        const halkeranjang = await driver.$('~cart screen')
        //proses input barang
        await item1.click()
        await driver.pause(1000)
        await driver.touchAction([
            { action: 'press', x: 348, y: 1136 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 202 },
            'release'
        ])
        await driver.pause(1000)
        await tambah.click()

        //proses cek hal keranjang terbuka atau tidak
        await driver.pause(1000)
        await keranjang.click()
        await driver.pause(1000)

        await expect(halkeranjang).to.exist
    })
    it('Berhasil isi data shipment', async() => {
        //data dan button untuk checkout
        const driver = await remote(options)
   
        const lanjutchekout = driver.$('~Proceed To Checkout button')
        const cekcheckout = driver.$('~checkout address screen')
        const namalengkap = driver.$('//android.widget.EditText[@content-desc="Full Name* input field"]')
        const alamat1 = driver.$('//android.widget.EditText[@content-desc="Address Line 1* input field"]')
        const kota = driver.$('//android.widget.EditText[@content-desc="City* input field"]')
        const kodepost = driver.$('//android.widget.EditText[@content-desc="Zip Code* input field"]')
        const negara = driver.$('//android.widget.EditText[@content-desc="Country* input field"]')
        const selesaicheckout =driver.$('~To Payment button')
        const halamanpembayaran =driver.$('~checkout payment screen')

        //proses checkout
        await lanjutchekout.click()
        await driver.pause(1000)
        await expect(cekcheckout).to.exist
        await driver.pause(1000)
        await namalengkap.setValue('Jason')
        await driver.pause(1000)
        await alamat1.setValue('13rd Elm Street')
        await driver.pause(1000)
        await driver.touchAction([
            { action: 'press', x: 348, y: 909 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 248 },
            'release'
        ])

        await kota.setValue('New York')
        await driver.pause(1000)
        await kodepost.setValue('20714')
        await driver.pause(1000)
        await negara.setValue('U.S')
        await driver.pause(1000)
        await selesaicheckout.click()
        await driver.pause(1000)
        await expect(halamanpembayaran).to.exist
        await driver.pause(1000)
    })

    it('Berhasil selesai checkout', async() => {
        const driver = await remote(options)
   
        const fullname = driver.$('//android.widget.EditText[@content-desc="Full Name* input field"]')
        const nokredit = driver.$('~Card Number* input field')
        const masaberlaku = driver.$('~Expiration Date* input field')
        const kodekeamanan = driver.$('~Security Code* input field')
        const review = driver.$('~Review Order button')
        const halreview = driver.$('~checkout review order screen')
        const cekitem = driver.$('~product label')
        const cektotal = driver.$('~checkout footer')
        const selesaicheckout =driver.$('~Place Order button')
        const selesaisemua = driver.$('//android.view.ViewGroup[@content-desc="checkout complete screen"]/android.widget.ScrollView/android.view.ViewGroup')
        const cekcheckoutnya = driver.$('//android.view.ViewGroup[@content-desc="checkout complete screen"]/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[1]')

        await fullname.setValue('Jason')
        await driver.pause(500)
        await driver.touchAction([
            { action: 'press', x: 348, y: 909 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 248 },
            'release'
        ])
        await driver.pause(500)
        await nokredit.setValue('409723185555123')
        await driver.pause(500)
        await masaberlaku.setValue('08/27')
        await driver.pause(500)
        await kodekeamanan.setValue(917)
        await driver.pause(500)
        await review.click()
        await driver.pause(500)
        await expect(halreview).to.exist
        await driver.pause(500)
        await expect(cekitem).to.exist
        await driver.pause(500)
        await expect(cektotal).to.exist
        await driver.pause(500)
        await selesaicheckout.click()
        await driver.pause(500)
        await expect(selesaisemua).to.exist
        await driver.pause(500)
        await expect(cekcheckoutnya).to.exist
        await driver.deleteSession()
    })
})
