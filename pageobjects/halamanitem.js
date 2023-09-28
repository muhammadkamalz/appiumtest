const{remote} = require('webdriverio')

class inventory  {
    constructor(driver) {
        /**@type {WebdriverIO.Browser} */
        this.driver = driver
    }
    
    //adding an item test
    get tambah()   {return driver.$('~Add To Cart button')}
    get cartIcon()   {return driver.$('//android.view.ViewGroup[@content-desc="cart badge"]/android.widget.ImageView')}
    get item()  {return driver.$('(//android.view.ViewGroup[@content-desc="store item"])[1]')}
    get cartScreen() {return driver.$('~cart screen')}

    //check if the item were added or not
    get itemList() {return driver.$('(//android.view.ViewGroup[@content-desc="product row"])[1]')}
    get label() {return driver.$('(//android.widget.TextView[@content-desc="product label"])[1]')}
    
    //review test
    get reviewStar() {return driver.$('(//android.view.ViewGroup[@content-desc="review star 3"])[1]/android.widget.TextView')}
    get notifText() {return driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView')}
    
    //color test get
    get blackcolor() {return driver.$('~black circle')}
    get bluecolor() {return driver.$('~blue circle')}
    get graycolor() {return driver.$('~gray circle')}
    get redcolor() {return driver.$('~red circle')}

    //reduce and add more items
    get reduceButton() {return driver.$('//android.view.ViewGroup[@content-desc="counter minus button"]/android.widget.ImageView')}
    get addButton() {return driver.$('//android.view.ViewGroup[@content-desc="counter plus button"]/android.widget.ImageView')}
    get counter() {return driver.$('//android.view.ViewGroup[@content-desc="counter amount"]/android.widget.TextView')}

    //sorting test data
    get openSort() {return driver.$('//android.view.ViewGroup[@content-desc="sort button"]/android.widget.ImageView')}
    get prices() { return driver.$$('//*[@content-desc="store item price"]')}
    get itemnames() {return driver.$$('//*[@content-desc="store item text"]')}
    get sortLowestToHighestPrice() {return driver.$('~priceAsc')}
    get sortHighestToLowestPrice() {return driver.$('~priceDesc')}
    get sortNameDescending() {return driver.$('~nameDesc')}

    async openitem1() {
        await this.item.click()
    }

    async openCart() {
        await this.cartIcon.click()
    }

    async add() {
        await this.tambah.click()
    }

    //checking review process
    async review() {
        await this.reviewStar.click()
    }

    async notification(){
        return await this.notifText.getText()
    }

    //checking item on cartprocess
    async checkItem() {
        return await this.itemList.isDisplayed()
    }

    async checkLabel() {
        return await this.label.getText()
    }

    async checkCartScreen(){
        return await this.cartScreen.isDisplayed()
    }

    //+ - button testing process
    async retract() {
        await this.reduceButton.click()
    }

    async increase() {
        await this.addButton.click()
    }

    async checkCounter(){
        return await this.counter.getText()
    }

    //sort testing process
    async openSorts() {
        await this.openSort.click()
    }

    async returnPrices() {
        const harga = this.prices.map((harga) => harga.getText())
        return harga
    }

    async returnNames() {
        const nama = this.itemnames.map((neim) => neim.getText())
        return nama
    }

    async sortLowPrice() {
        await this.sortLowestToHighestPrice.click()
    }

    async sortHighPrice() {
        await this.sortHighestToLowestPrice.click()
    }

    async sortNameDesc() {
        await this.sortNameDescending.click()
    }
}


module.exports = inventory