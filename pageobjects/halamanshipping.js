const {remote} = require('webdriverio')

class ship {
    constructor(driver) {
        this.driver = driver
    }

    get checkoutButton() {return driver.$('~Proceed To Checkout button')}
    
    //input data
    get name() {return driver.$('//android.widget.EditText[@content-desc="Full Name* input field"]')}
    get address() {return driver.$('//android.widget.EditText[@content-desc="Address Line 1* input field"]')}
    get address2() {return driver.$('~Address Line 2 input field')}
    get statetry() {return driver.$('~State/Region input field')}
    get city() {return driver.$('//android.widget.EditText[@content-desc="City* input field"]')}
    get zipcode() {return driver.$('//android.widget.EditText[@content-desc="Zip Code* input field"]')}
    get state() {return driver.$('//android.widget.EditText[@content-desc="Country* input field"]')}
    //---------------
    get submit() {return driver.$('~To Payment button')}
    get paymentPage() {return driver.$('~checkout payment screen')}

    //get error
    get errormsgfullname() {return driver.$('//android.view.ViewGroup[@content-desc="Full Name*-error-message"]/android.widget.TextView')}
    get errormsgaddres() {return driver.$('//android.view.ViewGroup[@content-desc="Address Line 1*-error-message"]/android.widget.TextView')}
    get errormsgcity() {return driver.$('//android.view.ViewGroup[@content-desc="City*-error-message"]/android.widget.TextView')}
    get errormsgpostcode() {return driver.$('//android.view.ViewGroup[@content-desc="Zip Code*-error-message"]/android.widget.TextView')}
    get errormsgcountry() {return driver.$('//android.view.ViewGroup[@content-desc="Country*-error-message"]/android.widget.TextView')}
    get erroropen() {return driver.$('~checkout payment screen')}

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

    async input3 (alamat2, kenegaraan){
        await this.address2.setValue(alamat2)
        await this.statetry.setValue(kenegaraan)
        await this.submit.click()
    }

    async confirm() {
        await this.submit.click()
    }

    async checkPay() {
        return await this.paymentPage.isDisplayed()
    }

    async err1() {
        return await this.errormsgfullname.getText()
    }
    
    async err2() {
        return await this.errormsgaddres.getText()
    }

    
    async err3() {
        return await this.errormsgcity.getText()
    }

    async err4() {
        return await this.errormsgpostcode.getText()
    }

    async err5() {
        return await this.errormsgcountry.getText()
    }

    async err6() {
        return await this.erroropen.isDisplayed()
    }
}

module.exports = ship