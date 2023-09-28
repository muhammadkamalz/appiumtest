const {expect} = require('chai')
const boot = require('../util/bootDriver')
const inven = require('../pageobjects/halamanitem')

describe('Menguji fungsi sorting', async() => {
    before(async() => {
        /**@type {WebdriverIO.Browser} */ driver = await boot()
        /**@type {inven} */ item = new inven(driver)
    })

    beforeEach(async() => {
        await item.openSorts()
        const tunggu = await driver.$('~priceDesc')
        await tunggu.waitForExist()
    })

    after (async() => {
        await driver.deleteSession()
    })

    afterEach(async() => {
        await driver.reloadSession()
    })

    it('Melakukan sorting dari harga terendah ke tertinggi', async() => {
        await item.sortLowPrice()
        await driver.pause(500)
        const check = await item.returnPrices()
        expect(check[0]).to.satisfy(test => check[0] < check[1])
    })

    it('Melakukan sorting dari harga tertinggi ke terendah', async() => {
        await item.sortHighPrice()
        await driver.pause(500)
        const check = await item.returnPrices()
        expect(check[0]).to.satisfy(test => check[0] > check[1])
    })

    it('Melakukan sorting berdasarkan nama Desc', async() => {
        await item.sortNameDesc()
        await driver.pause(500)
        const check = await item.returnNames()
        expect(check[0]).to.satisfy(test => check[0] > check[1])
    })
})