const{remote} = require('webdriverio')

class halamanlogin {
    
    constructor(driver){
        /**@type {WebdriverIO.Browser} */
        this.driver = driver
    }

    //buka halaman login
    get tombolBar() {return driver.$('//android.view.ViewGroup[@content-desc="open menu"]/android.widget.ImageView')}
    get tombolLogin() {return driver.$('//android.view.ViewGroup[@content-desc="menu item log in"]')}

    //input
    get username()  {return driver.$('//android.widget.EditText[@content-desc="Username input field"]')} 
    get password()  {return driver.$('~Password input field')}
    get submit()  {return driver.$('//android.view.ViewGroup[@content-desc="Login button"]')}

    //error login

    get usererrormsg() {return driver.$('//android.view.ViewGroup[@content-desc="Username-error-message"]/android.widget.TextView')}
    get passerrormsg() {return driver.$('//android.view.ViewGroup[@content-desc="Password-error-message"]/android.widget.TextView')}
    get errormsg() {return driver.$('//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView')}
    
    //logout

    get barLogout() {return driver.$('~menu item log out')}
    get logoutButton() {return driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[2]')}
    get logoutmsg () {return driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView')}

    //checker
    get head()  {return driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView')}

    //proses
    async open() {
        await this.tombolBar.click()
    }

    async openlogin() {
        await this.tombolLogin.click()
    }

    async kliklogout() {
        await this.barLogout.click()
    }

    async confirmbutton() {
        await this.logoutButton.click()
    }
    async input(user, pass){
        await this.username.setValue(user)
        await this.password.setValue(pass)
        await this.submit.click()
    }

    async check () {
        return await this.header()
    }
    async pesanerror() {
        return await this.logoutmsg.getText()
    }

    async usereror() {
        return await this.usererrormsg.getText()
    }

    async passeror() {
        return await this.passerrormsg.getText()
    }

    async erormsg() {
        return await this.errormsg.getText()
    }

    async logoutmesg(){
        return await this.logoutmsg.getText()
    }

    async header() {
        return await this.head.getText()
    }
}

module.exports = halamanlogin