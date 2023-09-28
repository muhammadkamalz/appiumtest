const {expect} = require('chai')
const loguin = require('../pageobjects/halamanlogin')
const boot = require('../util/bootDriver')


describe('Tes login tanpa username / password', async() => {
    before(async () => {
        driver = await boot()
        login = new loguin(driver)
    })


    beforeEach(async() => {
        await login.open()
        await driver.pause(1000)
        await login.openlogin()
        await driver.pause(1000)
    })

    afterEach(async() => {
        await driver.reloadSession()
    })

    after(async() => {
        await driver.deleteSession()
    })

    it ('Tanpa username & gagal login', async () => {

        await login.input("","10203040")
        await driver.pause(1000)

        const err = await login.usereror()
        await expect(err).to.exist.and.to.equal('Username is required')
        await driver.pause(1000)
    })
    it('Tanpa password & gagal login', async () => {

        await login.input("bob@example.com","")
        await driver.pause(1000)
        
        const err = await login.passeror()
        await expect(err).to.exist.and.to.equal('Password is required')
        await driver.pause(1000)

    })
    it('Login dengan username & password yg salah', async () => {
        
        await login.input('101','202')
        await driver.pause(1000)

        const err = await login.erormsg()
        await expect(err).to.exist.and.to.equal('Provided credentials do not match any user in this service.')
    })

})