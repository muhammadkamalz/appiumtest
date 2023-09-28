const boot = require('../util/bootDriver')
const inven = require('../pageobjects/halamanitem')
const carte = require('../pageobjects/halamancart')
const {expect} = require('chai')

describe('Melakukan pengujian terhadap fungsi - fungsi untuk inventory', async() => {
    before(async() => {
        /**@type {WebdriverIO.Browser} */driver = await boot()
        /**@type {inven} */ item = new inven(driver)
        /**@type {carte} */ cart = new carte(driver)
    })

    beforeEach(async() => {
        await item.openitem1()
        await driver.pause(500)
        await driver.touchAction([
            { action: 'press', x: 348, y: 886 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 202 },
            'release'
        ])
        await driver.pause(500)
    })
    
    after(async() => {
        await driver.deleteSession()
    })

    afterEach(async()=> {
        await driver.reloadSession()
    }) 

    it.skip('Memberikan star rating langsung dari catalog', async() => {
        await item.review()
        await driver.pause(500)
        const check = await item.notification()
        expect(check).to.equal('Thank you for submitting your review!')
    })

    it('Memberikan star rating melalui laman item', async() => {

        await item.review()
        await driver.pause(500)
        const box = driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup')
        await box.waitForExist()
        const check = await item.notification()
        expect(check).to.equal('Thank you for submitting your review!')
    })

    it('Testing - Button', async() => {
 
        await item.retract()
        await driver.pause(500)
        const check = await item.checkCounter()
        expect(check).to.exist.and.to.equal('0')
    })

    it('Testing + Button', async () => {

        await item.increase()
        await driver.pause(500)
        const check = await item.checkCounter()
        expect(check).to.exist.and.to.equal('2')
    })

    it('Cek apakah item yang ditambahkan ke dalam cart berjumlah sesuai dengan yang ditambahkan', async () => {
        
        await item.increase()
        await item.increase()
        await driver.pause(500)
        await item.add()
        await item.openCart()
        await driver.pause(500)
        const check = await cart.counterCheck()
        expect(check).to.exist.and.to.equal('3')
    })

    it('Menguji tombol remove yang ada di cart', async () => {

        await item.add()
        await item.openCart()
        await driver.pause(500)
        const car = await driver.$('~cart screen')
        await car.waitForExist()
        await cart.remove()
        await driver.pause(1000)
        const check = await cart.cartCheck()
        expect(check).to.equal(false)
    })

})