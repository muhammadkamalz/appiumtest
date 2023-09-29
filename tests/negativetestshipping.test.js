const{expect} = require('chai')
const boot = require('../util/bootDriver')
const shipping = require('../pageobjects/halamanshipping')
const loguin = require('../pageobjects/halamanlogin')
const inven = require('../pageobjects/halamanitem')

describe.only('negative testing fungsi shipping page', async () => {
    before(async() => {
        /**@type {WebdriverIO.Browser} */ driver = await boot()
       /**@type {shipping} */ ship = new shipping(driver)
       /**@type {loguin} */ login = new loguin(driver)
       /**@type {inven} */ item = new inven(driver)
    })

    beforeEach(async() => {
        await login.open()
        await driver.pause(500)

        await login.openlogin()
        await driver.pause(500)

        await login.input('bob@example.com', '10203040')

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
        await item.openCart()
        
        await ship.open()
        await driver.pause(500)
    })
    afterEach(async() => {
        await driver.reloadSession()
    })

    after(async() => {
        await driver.deleteSession()
    })

    it('hanya memasukkan full name & alamat', async() => {
        await ship.input1('Jason', '13 Palm Street')
        await driver.pause(500)
        await driver.touchAction([
            { action: 'press', x: 348, y: 909 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 248 },
            'release'
        ])
        await ship.confirm()
        const check1 = await ship.err3()
        const check2 = await ship.err4()
        const check3 = await ship.err5()
        expect(check1).to.exist.and.to.equal('Please provide your city.') 
        expect(check2).to.exist.and.to.equal('Please provide your zip code.')
        expect(check3).to.exist.and.to.equal('Please provide your country.')
    })

    it('hanya memasukkan city, zip code, & negara', async() => {
        await driver.touchAction([
            { action: 'press', x: 348, y: 909 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 248 },
            'release'
        ])
        await ship.input2('Indonesia', '50214','SEA')
        await driver.pause(500)
        await driver.touchAction([
            { action: 'press', x: 348, y: 248 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 909 },
            'release'
        ])

        const check1 = await ship.err1()
        const check2 = await ship.err2()
        expect(check1).to.exist.and.to.equal('Please provide your full name.')
        expect(check2).to.exist.and.to.equal('Please provide your address.')

        //  
    })

    it('langsung menekan tombol payment tanpa memasukkan data', async() => {
        await ship.confirm()
        await driver.pause(500)
        const check1 = await ship.err1()
        expect(check1).to.exist.and.to.equal('Please provide your full name.')
    })

    it('hanya memasukkan bagian yang tidak harus diinput', async() => {
        await driver.touchAction([
            { action: 'press', x: 348, y: 909 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 248 },
            'release'
        ])
        await ship.input3('Jl. Bajaj','Malang')
        await driver.pause(500)
        const check = await ship.err6()
        expect(check).to.equal(false)
    })
})