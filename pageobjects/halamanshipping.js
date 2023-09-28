const {remote} = require('webdriverio')

class ship {
    constructor(driver) {
        this.driver = driver
    }

    get checkoutButton() {return driver.$('~Proceed To Checkout button')}
    
    //input data
    get name() {return driver.$('//android.widget.EditText[@content-desc="Full Name* input field"]')}
    get address() {return driver.$('//android.widget.EditText[@content-desc="Address Line 1* input field"]')}
    get city() {return driver.$('//android.widget.EditText[@content-desc="City* input field"]')}
    get zipcode() {return driver.$('//android.widget.EditText[@content-desc="Zip Code* input field"]')}
    get state() {return driver.$('//android.widget.EditText[@content-desc="Country* input field"]')}
    //---------------
    get submit() {return driver.$('~To Payment button')}
    get paymentPage() {return driver.$('~checkout payment screen')}

    async open() {
        await this.checkoutButton.click()
    }

    async input1(nama,alamat) {
        await this.name.setValue(nama)
        await this.address.setValue(alamat)
    }

    async input2(kota, kodepos,negara){
        await this.city.setValue(kota)
        await this.zipcode.setValue(kodepos)
        await this.state.setValue(negara)
        await this.submit.click()
    }

    async checkPay() {
        return await this.paymentPage.isDisplayed()
    }
}

module.exports = ship