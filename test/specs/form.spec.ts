import FormPage from '../pageobjects/form.page.js'
import data from "../data/data.json" assert {type:"json"}

describe('Retirement Savings Calculator Form', async () => {
        beforeEach(async () => {
                FormPage.open()
        })

        it('Validating that the user is able to submit all fields in the Pre-Retirement Calculator form', async () => {

                await FormPage.populateFormWithAllFieldsFilled(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.spouseIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus, data.valid.ssAmount)
                await FormPage.clickCalculateButton()

                //Capturing the final result based on the Pre-Retirement Calculator decision
                const finalResult = FormPage.getFinalResult();

                //Verifying if the final result is displayed once the form is submitted
                await expect(await finalResult).toBeTruthy()

                //printing the final result
                console.log("The Final Result is "+ await finalResult)
        })

        it('Validating that the user is able to submit only the mandatory fields in the Pre-Retirement Calculator form', async () => {

                await FormPage.populateFormWithRequiredFields(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)
                await FormPage.clickCalculateButton()

                const finalResult = FormPage.getFinalResult();

                await expect(await finalResult).toBeTruthy()
                console.log("The Final Result is "+ await finalResult)
        })

        it('Validating that the user is able to update the Adjusting default calculator values', async () => {

                //populating data to the "Default Calculator Form"
                await FormPage.updateDefaultCalculatorValues(data.otherIncome, data.duration, data.inflationOption, data.expectedRate, data.retirementIncome, data.preRoi, data.postRoi);
                await FormPage.clickDefaultValueLink()

                //Once the default calculator is submitted, capturing the updated values
                const expectedOtherIncome = await FormPage.getOtherIncome()
                const expectedDuration = await FormPage.getRetirementIncomeDurationField()
                const expectedRetirementIncome = await FormPage.getRetirementAnnualIncome()
                const expectedPreRoi = await FormPage.getPreRetirementRoiField()
                const expectedPostRoi = await FormPage.getPostRetirementRoiField()

                //verifying if the captured field valaues are same as the values populated
                await expect("$"+String(data.otherIncome)).toEqual(expectedOtherIncome)
                await expect(String(data.duration)).toEqual(expectedDuration)
                await expect(String(data.retirementIncome)+"%").toEqual(expectedRetirementIncome)
                await expect(String(data.preRoi)+"%").toEqual(expectedPreRoi)
                await expect(String(data.postRoi)+"%").toEqual(expectedPostRoi)
        })

        it('Validating that the user is not allowed to submit the form if Age field is missing', async () => {
                //populating the required fields to the Pre-Retirement Calculator form
                await FormPage.populateFormWithRequiredFields(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)

                //clearing the Age field which is a required field
                await FormPage.ageField.clearValue()
                await FormPage.clickCalculateButton()

                //Capuring the error messages which are displayed as part of Mandatory field check
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();

                //validating the actual error message with the expected error message store in data.json file
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldError)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)
                
        })

        it('Validating that the user is not allowed to submit the form if Retirement Age field is missing', async () => {                
                await FormPage.populateFormWithRequiredFields(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)

                //clearing the Retirement Age field which is a required field
                await FormPage.retirementAgeField.clearValue()
                await FormPage.clickCalculateButton()

                //Capuring the error messages which are displayed as part of Mandatory field check
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();

                //Validating the error messages
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldError)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)                
        })

        it('Validating that the user is not allowed to submit the form if Current Income field is missing', async () => {
                await FormPage.populateFormWithRequiredFields(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)

                //clearing the Current Income field which is a required field
                await FormPage.currentIncomeField.clearValue()
                await FormPage.clickCalculateButton()

                //Capuring the error messages which are displayed as part of Mandatory field check
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();

                //Validating the error messages
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldError)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)                
        })

        it('Validating that the user is not allowed to submit the form if Current Retirement Savings field is missing', async () => {
                await FormPage.populateFormWithRequiredFields(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)

                //clearing the Current Retirement Savings field which is a required field
                await FormPage.currentTotalSavingsField.clearValue()
                await FormPage.clickCalculateButton()

                //Capuring the error messages which are displayed as part of Mandatory field check
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();

                //Validating the error messages
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldError)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)                
        })

        it('Validating that the user is not allowed to submit the form if Current Annual Savings field is missing', async () => {
                await FormPage.populateFormWithRequiredFields(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)

                //clearing the Current Annual Savings field which is a required field
                await FormPage.currentAnnualSavingsField.clearValue()
                await FormPage.clickCalculateButton()

                //Capuring the error messages which are displayed as part of Mandatory field check
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();

                //Validating the error messages
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldError)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)                
        })

        it('Validating that the user is not allowed to submit the form if Savings Increase Rate field is missing', async () => {
                await FormPage.populateFormWithRequiredFields(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)

                //clearing the Savings Increase field which is a required field
                await FormPage.savingsIncreaseRateField.clearValue()
                await FormPage.clickCalculateButton()

                //Capuring the error messages which are displayed as part of Mandatory field check
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();

                //Validating the error messages
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldError)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)                
        })

        it('Validating that the Social Security Fields are not displayed when the Social Security Toggle is OFF', async () => {
                //Toggle is set to OFF
                const socialSecurityBenefit = "No";

                //populating all the fields in the Pre-Retirement Calculator form
                await FormPage.populateFormWithRequiredFields(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, socialSecurityBenefit, data.valid.maritalStatus)
                
                //Checking if the Marital Status and Social Security fields are not displayed
                const maritalStatusFieldCheck = await FormPage.isMaritalStatusFieldDisplayed()
                const socialSecurityFieldCheck = await FormPage.isSocialSecurityFieldDisplayed()
                
                //Verifing if both the fields are not displayed
                await expect(maritalStatusFieldCheck).toBe(false); 
                await expect(socialSecurityFieldCheck).toBe(false);
        })

        it('Validating that the user is not allowed to enter Current Age more than 120', async () => {
                //populating the Pre-Retirement Calculator form with the current age more than 120
                await FormPage.populateFormWithRequiredFields(data.invalid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)
                await FormPage.clickCalculateButton()

                //Capturing the error message received
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();
                
                //Verifing the error message
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldValidationMessage)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)  
        })

        it('Validating that the user is not allowed to enter Retirement Age more than 120', async () => {
                //populating the Pre-Retirement Calculator form with the Retirement Age more than 120
                await FormPage.populateFormWithRequiredFields(data.valid.age, data.invalid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)
                await FormPage.clickCalculateButton()

                //Capturing the error message received
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();
                
                //Verifing the error message
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldValidationMessage)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)  
        })

        it('Validating that the user is not allowed to enter Current Age more than the Retirement Age', async () => {
                //populating the Pre-Retirement Calculator form with the Current Age more than the Retirement Age
                await FormPage.populateFormWithRequiredFields(data.invalid.age2, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)
                await FormPage.clickCalculateButton()

                //Capturing the error message received
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();
                
                //Verifing the error message
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldValidationMessage2)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)  
        })

        it('Validating that the user is not allowed to enter Current Age as 0', async () => {
                //populating the Pre-Retirement Calculator form with the Current Age as 0
                const age = "0";
                await FormPage.populateFormWithRequiredFields(age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)
                await FormPage.clickCalculateButton()

                //Capturing the error message received
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();
                
                //Verifing the error message
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldValidationMessage3)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)  
        })

        it('Validating that the user is not allowed to enter Retirement Age as 0', async () => {
                //populating the Pre-Retirement Calculator form with the Retirement Age as 0
                const retirementAge = "0";
                await FormPage.populateFormWithRequiredFields(data.valid.age, retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)
                await FormPage.clickCalculateButton()

                //Capturing the error message received
                const actualFieldError = FormPage.getInvalidFieldErrorMessage();
                const actualMainError = FormPage.getMainErrorMessage();
                
                //Verifing the error message
                await expect(await actualFieldError).toEqual(data.errorMessages.fieldValidationMessage3)
                await expect(await actualMainError).toEqual(data.errorMessages.mainError)
        })

        it('Validating that the user is able to clear all the updated values using Clear All Button', async () => {
                //populating the Pre-Retirement Calculator form
                await FormPage.populateFormWithRequiredFields(data.valid.age, data.valid.retirementAge, data.valid.currentIncome, data.valid.currentTotalSavings, data.valid.currentAnnualSavings, data.valid.savingsIncreaseRate, data.valid.socialSecurityBenefit, data.valid.maritalStatus)

                //Clearing all the entered data
                await FormPage.clickClearFormButton()

                //Capturing the updated field values
                const ageValue = await FormPage.getCurrentAge()
                const retirementAge = await FormPage.getRetirementAge()
                const currentIncomeValue = await FormPage.getCurrentIncome()
                const currentTotalSavingsValue = await FormPage.getCurrentTotalSavings()
                const currentAnnualValue = await FormPage.getCurrentAnnualSavings()
                const savingsIncreaseRateValue = await FormPage.getSavingsIncreaseRate()
                
                //Verifing the field values to be Null/Empty
                await expect(ageValue).toBeFalsy()
                await expect(retirementAge).toBeFalsy()
                await expect(currentIncomeValue).toBeFalsy()
                await expect(currentTotalSavingsValue).toBeFalsy()
                await expect(currentAnnualValue).toBeFalsy()
                await expect(savingsIncreaseRateValue).toBeFalsy()
        })
})