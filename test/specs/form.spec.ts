import FormPage from '../pageobjects/form.page.js'
import data from "../data/data.json" assert {type:"json"}

describe('Retirement Savings Calculator Form', async () => {
        beforeEach(async () => {
                FormPage.open()
        })

        it('submit form with all fields filled in along with Social Security Field toggle', async () => {

                await FormPage.submitFormWithAllFieldsFilled(data.age, data.retirementAge, data.currentIncome, data.spouseIncome, data.currentTotalSavings, data.currentAnnualSavings, data.savingsIncreaseRate, data.socialSecurityBenefit, data.maritalStatus, data.ssAmount)
                await FormPage.clickCalculateButton()
                const finalResult = FormPage.getFinalResult();

                await expect(await finalResult).toBeTruthy()
                console.log("The Final Result is "+ await finalResult)
        })

        it('submit form with only Mandatory fields filled in along with Social Security Field toggle', async () => {

                await FormPage.submitFormWithRequiredFields(data.age, data.retirementAge, data.currentIncome, data.currentTotalSavings, data.currentAnnualSavings, data.savingsIncreaseRate, data.socialSecurityBenefit, data.maritalStatus)
                await FormPage.clickCalculateButton()

                const finalResult = FormPage.getFinalResult();

                await expect(await finalResult).toBeTruthy()
                console.log("The Final Result is "+ await finalResult)
        })

        it('Adjusting default calculator values', async () => {

                await browser.pause(3000);
                await FormPage.updateDefaultCalculatorValues(data.otherIncome, data.duration, data.inflationOption, data.expectedRate, data.retirementIncome, data.preRoi, data.postRoi);
                await FormPage.clickDefaultValueLink()

                const expectedOtherIncome = await FormPage.getOtherIncome()
                const expectedDuration = await FormPage.getRetirementIncomeDurationField()
                const expectedRetirementIncome = await FormPage.getRetirementAnnualIncome()
                const expectedPreRoi = await FormPage.getPreRetirementRoiField()
                const expectedPostRoi = await FormPage.getPostRetirementRoiField()

                await expect("$"+String(data.otherIncome)).toEqual(expectedOtherIncome)
                await expect(String(data.duration)).toEqual(expectedDuration)
                await expect(String(data.retirementIncome)+"%").toEqual(expectedRetirementIncome)
                await expect(String(data.preRoi)+"%").toEqual(expectedPreRoi)
                await expect(String(data.postRoi)+"%").toEqual(expectedPostRoi)
        })
})