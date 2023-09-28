const {expect} = require('chai')
const boot = require('../util/bootDriver')
const loguin = require('../pageobjects/halamanlogin')




describe('logout tanpa login', () => {
    before(async() => {
        driver = await boot()
        login = new loguin(driver)
    })

    after(async() => {
        await driver.deleteSession()
    })

    it('Gagal Logout', async() => {

    
        await login.open()
        await driver.pause(1000)
        await driver.touchAction([
            { action: 'press', x: 208, y: 1026 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 208, y: 254 },
            'release'
        ])
        await driver.pause(1000)
        await login.kliklogout()
        await driver.pause(1000)
        await login.confirmbutton()
        await driver.pause(1000)
        const err = await login.logoutmesg()
        await expect(err).to.not.exist.and.to.not.equal('You are successfully logged out.')
        await driver.deleteSession()
    })
})
