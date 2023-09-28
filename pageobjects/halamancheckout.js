const {remote} = require('webdriverio')

class checkout {
    constructor (driver) {
        this.driver = driver
    }
    
    //input data
    get fullname() {return driver.$('//android.widget.EditText[@content-desc="Full Name* input field"]')}
    get creditcard() {return driver.$('~Card Number* input field')}
    get expiredate() {return driver.$('~Expiration Date* input field')}
    get securitycode() {return driver.$('~Security Code* input field')}
    get reviewButton() {return driver.$('~Review Order button')}
  
    //check if item still the same
    get cekitem() {return driver.$('~product label')}
    get cektotal() {return driver.$('~total number')}
    
    //finish
    get continueButton() {return driver.$('~Place Order button')}
    get finishButton() {return driver.$('~Continue Shopping button')}
    get checkFinish() {return driver.$('//android.view.ViewGroup[@content-desc="checkout complete screen"]/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[1]')}

    async input1(nama) {
        await this.fullname.setValue(nama)
    }

    async input2(cc, date, kode){
        await this.creditcard.setValue(cc)
        await this.expiredate.setValue(date)
        await this.securitycode.setValue(kode)
        await this.reviewButton.click()
    }

    async checkItem() {
        return await this.cekitem.getText()
    }

    async checkTotal() {
        return await this.cektotal.getText()
    }

    async continue() {
        await this.continueButton.click()
    }

    async finish(){
        await this.finishButton.click()
    }

    async check(){
        return await this.checkFinish.isDisplayed()
    }
}

module.exports = checkout