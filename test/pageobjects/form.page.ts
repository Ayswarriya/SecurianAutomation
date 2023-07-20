import Page from './page.js'
import { ChainablePromiseElement } from 'webdriverio'

class FormPage extends Page{
    /**
     * define elements
     */
    public get ageField ():ChainablePromiseElement<WebdriverIO.Element> { 
        return $('#current-age')
     }

    public get retirementAgeField ():ChainablePromiseElement<WebdriverIO.Element> { 
        return $('#retirement-age') 
    }
    public get currentIncomeField ():ChainablePromiseElement<WebdriverIO.Element> { 
        return $('#current-income') 
    }

    public get spouseIncomeField ():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//input[@id='spouse-income']")
    }

    public get currentTotalSavingsField ():ChainablePromiseElement<WebdriverIO.Element>{
        return $('#current-total-savings')
    }

    public get currentAnnualSavingsField ():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//input[@id='current-annual-savings']")
    }

    public get savingsIncreaseRateField ():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//input[@id='savings-increase-rate']")
    }

    public get calculateButton ():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//button[@onclick='calculateResults();']")
    }

    public get resultMessage():ChainablePromiseElement<WebdriverIO.Element> {
        return $("//p[@id='result-message']")
    }

    public get socialSecurityAmounField():ChainablePromiseElement<WebdriverIO.Element> {
        return $("//input[@id='social-security-override']")
    }

    public SocialSecurityRadioButton(option:string): ChainablePromiseElement<WebdriverIO.Element> {
        return $("//label[contains(@for, 'social-benefits')][text()='" + option + "']");
    }

    public selectMaritalStatusRadioButton(option: string): ChainablePromiseElement<WebdriverIO.Element> {
        return $("//ul[contains(@id, 'status')]//label[text()='" + option + "']");
    }

    public get adjustDefaultValuesLink():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//a[text()='Adjust default values']");
    }

    public get adjustDefaultValuesSection():ChainablePromiseElement<WebdriverIO.Element>{
        return $("(//div[@class='dsg-alert-box-info'])[1]");
    }

    public get otherIncomeField():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//input[@id='additional-income']");
    }

    public get retirementIncomeDurationField():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//input[@id='retirement-duration']");
    }

    public inflationOptionRadioButton(option:string):ChainablePromiseElement<WebdriverIO.Element>{
        return $("//label[contains(@for, 'lude-inflation')][text()='" + option + "']");
    }

    public get expectedInflationRateField():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//input[@id='expected-inflation-rate']");
    }

    public get retirementAnnualIncomeField():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//input[@id='retirement-annual-income']");
    }

    public get preRetirementRoiField():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//input[@id='pre-retirement-roi']");
    }

    public get postRetirementRoiField():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//input[@id='post-retirement-roi']");
    }

    public get defaultCalculatedSaveButton():ChainablePromiseElement<WebdriverIO.Element>{
        return $("//button[@onclick='savePersonalizedValues();']");
    }

    /**
     * define or overwrite page methods
     */
    public async open (): Promise<string> {
        browser.maximizeWindow()
        return super.open('retirement-calculator.html');
    }

    public async retirementSavingCanculatorForm(age:string, retirementAge:string, currentIncome:number, currentTotalSavings:number, currentAnnualSavings:number, savingsIncreaseRate:number, option:string, maritalStatus:string):Promise<void>{
        await this.ageField.setValue(age)
        await this.retirementAgeField.setValue(retirementAge)
        await this.currentIncomeField.waitForEnabled()
        await this.currentIncomeField.click()
        await this.currentIncomeField.setValue(currentIncome)
        await this.currentTotalSavingsField.click()
        await this.currentTotalSavingsField.setValue(currentTotalSavings)
        await this.currentAnnualSavingsField.click()
        await this.currentAnnualSavingsField.setValue(currentAnnualSavings)
        await this.savingsIncreaseRateField.click()
        await this.savingsIncreaseRateField.setValue(savingsIncreaseRate)

        if(option=='Yes'){
            await this.SocialSecurityRadioButton(option).scrollIntoView()
            this.SocialSecurityRadioButton(option).waitForClickable()
            this.SocialSecurityRadioButton(option).click()
            await this.selectMaritalStatusRadioButton(maritalStatus).waitForClickable()
            await this.selectMaritalStatusRadioButton(maritalStatus).click()
        }
    }

    public async submitFormWithAllFieldsFilled(age:string, retirementAge:string, currentIncome:number, spouseIncome:number, currentTotalSavings:number, currentAnnualSavings:number, savingsIncreaseRate:number, option:string, maritalStatus:string, ssAmount:number):Promise<void>{
        await this.retirementSavingCanculatorForm(age, retirementAge, currentIncome, currentTotalSavings, currentAnnualSavings, savingsIncreaseRate, option, maritalStatus)
        await this.spouseIncomeField.scrollIntoView()
        await this.spouseIncomeField.waitForClickable()
        await this.spouseIncomeField.click()
        await this.spouseIncomeField.setValue(spouseIncome)
    
        if (await this.socialSecurityAmounField.isDisplayed()){
            this.socialSecurityAmounField.waitForClickable()
            await this.socialSecurityAmounField.click()
            await this.socialSecurityAmounField.setValue(ssAmount)
        }          
    }

    public async submitFormWithRequiredFields(age:string, retirementAge:string, currentIncome:number, currentTotalSavings:number, currentAnnualSavings:number, savingsIncreaseRate:number, option:string, maritalStatus:string):Promise<void>{
        await this.retirementSavingCanculatorForm(age, retirementAge, currentIncome, currentTotalSavings, currentAnnualSavings, savingsIncreaseRate, option, maritalStatus)
    }

    public async clickCalculateButton ():Promise<void> {
        await this.calculateButton.click()
    }

    public async getFinalResult():Promise<string>{
        await this.resultMessage.waitForDisplayed({timeout: 100000})
        return await this.resultMessage.getText()
    }

    public async clickDefaultValueLink():Promise<void>{
        await this.adjustDefaultValuesSection.scrollIntoView()
        this.adjustDefaultValuesLink.waitForClickable({timeout:70000});
        await this.adjustDefaultValuesLink.click()
    }

    public async updateDefaultCalculatorValues(otherIncome:number, duration:number, option:string, expectedRate:number, retirementIncome:number, preRoi:number, postRoi:number ):Promise<void>{
        
        await this.clickDefaultValueLink()
        await this.otherIncomeField.waitForClickable({timeout:30000})
        await this.otherIncomeField.clearValue()
        await this.otherIncomeField.doubleClick()
        await this.otherIncomeField.setValue(otherIncome)

        await this.retirementIncomeDurationField.setValue(duration)

        if(option=='Yes'){
        await this.inflationOptionRadioButton(option).waitForClickable()
        await this.inflationOptionRadioButton(option).click()

        await this.expectedInflationRateField.click()
        await this.expectedInflationRateField.setValue(expectedRate)
        }      

        await this.retirementAnnualIncomeField.click()
        await this.retirementAnnualIncomeField.setValue(retirementIncome)  
           
        await this.preRetirementRoiField.click()
        await this.preRetirementRoiField.setValue(preRoi)

        await this.postRetirementRoiField.click()
        await this.postRetirementRoiField.setValue(postRoi)

        await this.defaultCalculatedSaveButton.click()
    }

    public async getOtherIncome():Promise<string>{
        await this.otherIncomeField.waitForDisplayed()
        return await this.otherIncomeField.getValue()
    }

    public async getRetirementIncomeDurationField():Promise<string>{
        await this.retirementIncomeDurationField.waitForDisplayed()
        return await this.retirementIncomeDurationField.getValue()
    } 

    public async getRetirementAnnualIncome():Promise<string>{
        await this.retirementAnnualIncomeField.waitForDisplayed()
        return await this.retirementAnnualIncomeField.getValue()
    }

    public async getPreRetirementRoiField():Promise<string>{
        await this.preRetirementRoiField.waitForDisplayed()
        return await this.preRetirementRoiField.getValue()
    }

    public async getPostRetirementRoiField():Promise<string>{
        await this.postRetirementRoiField.waitForDisplayed()
        return await this.postRetirementRoiField.getValue()
    }

}
export default new FormPage()