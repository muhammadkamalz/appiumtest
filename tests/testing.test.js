const boot = require('../util/bootDriver')
const loguin = require('../pageobjects/halamanlogin')
const inven = require('../pageobjects/halamanitem')
const shipping = require('../pageobjects/halamanshipping')
const checkout = require('../pageobjects/halamancheckout')
const {expect} = require('chai')

describe('Proses Fungsi Utama', async() => {

    before(async() => {
        driver = await boot()
        /**@type {loguin} */ login = new loguin(driver)
        /**@type {inven} */ item = new inven(driver)
        /**@type {shipping} */ ship = new shipping(driver)
        /**@type {checkout} */ cekout = new checkout(driver)
    })

    after(async() => {
        await driver.deleteSession()
    })

    it.skip('Login dengan locked user', async() => {
        await login.open()
        await driver.pause(500)

        await login.openlogin()
        await driver.pause(500)

        await login.input('alice@example.com','10203040')
        await driver.pause(500)
        const err = await login.erormsg()
        expect(err).to.exist.and.to.equal('Sorry, this user has been locked out.')
    })

    it('Berhasil login', async() => {

        
        await login.open()
        await driver.pause(500)

        await login.openlogin()
        await driver.pause(500)

        await login.input('bob@example.com', '10203040')
        await driver.pause(500)
        const check = await login.header()
        await expect (check).to.exist.and.to.equal("Products")
    })

    it('Berhasil memassukkan barang ke keranjang', async() => {

        await item.openitem1()
        await driver.pause(500)
        await driver.touchAction([
            { action: 'press', x: 348, y: 1136 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 202 },
            'release'
        ])
        await driver.pause(500)
        await item.add()

        //proses cek hal keranjang terbuka atau tidak
        await driver.pause(500)
        await item.openCart()
        await driver.pause(500)
        const check = await item.checkItem()
        const check2 = await item.checkLabel()
        const checkScreen = await item.checkCartScreen()
        await expect(checkScreen).to.equal(true)
        await expect(check).to.equal(true)
        await expect(check2).to.exist.and.to.equal('Sauce Labs Backpack')
    })

    it('Berhasil isi data shipment', async() => {

 
        //proses checkout
        await ship.open()
        await driver.pause(500)
        await ship.input1('Jason','Jl.Malioboro')
        await driver.touchAction([
            { action: 'press', x: 348, y: 909 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 248 },
            'release'
        ])
        
        await ship.input2('Indonesia', '50214','SEA')
        await driver.pause(500)
        const check = await ship.checkPay()
        await expect(check).to.equal(true)
        await driver.pause(500)
    })

    it('Melanjutkan proses heckout', async() => {

        await cekout.input1('Jason')
        await driver.pause(500)
        await driver.touchAction([
            { action: 'press', x: 348, y: 909 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 248 },
            'release'
        ])
        await driver.pause(500)
        await cekout.input2('609844935280','0325', '484')
        await driver.pause(500)

        const cek1 = await cekout.checkItem()
        const cek2 = await cekout.checkTotal()
        await expect(cek1).to.exist.and.to.equal('Sauce Labs Backpack')
        await expect(cek2).to.exist.and.to.equal('1 item')

        await driver.pause(500)
        await cekout.continue()
        await driver.pause(500)
        
        const cek3 = await cekout.check()
        await expect(cek3).to.equal(true)
    })
})
