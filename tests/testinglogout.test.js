const {expect} = require('chai')
const boot = require('../util/bootDriver')
const loguin = require('../pageobjects/halamanlogin')

describe('Proses Login', async () => {
    before (async() => {
        /**@type{WebdriverIO.Browser} */ driver = await boot()
        /**@type{halamanlogin} */ login = new loguin(driver)
    })

    after (async() => {
        await driver.deleteSession()
    })
    it('Berhasil Buka halaman login dan login', async() => {
        await login.open()
        await driver.pause(1000)

        await login.openlogin()
        await driver.pause(1000)

        await login.input("bob@example.com", "10203040")
        await expect (login.check()).to.exist
    })
    
    it('Berhasil Logout', async() => {

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
        const err = await login.logoutmesg();
        await expect(err).to.exist.and.to.equal('You are successfully logged out.')
    })

})
   