const {remote} = require('webdriverio')

class cart {

    constructor(driver) {
        /**@type {WebdriverIO.Browser} */
        this.driver = driver
    }

    get cartCounter() {return driver.$('//android.view.ViewGroup[@content-desc="counter amount"]/android.widget.TextView')}
    get removeItem() {return driver.$('//android.view.ViewGroup[@content-desc="remove item"]/android.widget.TextView')}
    get cartList() {return driver.$('~product row')}


    async counterCheck() {
        return await this.cartCounter.getText()
    }

    async remove() {
        return await this.removeItem.click()
    }

    async cartCheck() {
        return await this.cartList.isDisplayed()
    }


}

module.exports = cart