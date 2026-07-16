const successState = document.querySelector('.success-state');
const formContact = document.querySelector('#form-contact');
const allWrapperValue = document.querySelectorAll('.wrapper-value');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let saveData = {
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    agree: false,
}

formContact.addEventListener('submit', function (e) {
    e.preventDefault();
    allWrapperValue.forEach(element => {
        let firstNameElement = element.querySelector('input[type="text"]#first-name'); 
        let lastNameElement = element.querySelector('input[type="text"]#last-name'); 
        let emailElement = element.querySelector('input[type="text"]#email'); 
        let wrapperQueryElement = element.querySelector('.wrapper-query-content');
        let textareaElement = element.querySelector('textarea');
        let checkboxElement = element.querySelector('input[name="agree"]'); 
        if (firstNameElement) {
            validate(element, firstNameElement);
        } else if (lastNameElement) {
            validate(element, lastNameElement);
        } else if (emailElement) {
            validate(element, emailElement);
        } else if (wrapperQueryElement) {
            validate(element, wrapperQueryElement);
        } else if (textareaElement) {
            validate(element, textareaElement);
        } else if (checkboxElement) {
            validate(element, checkboxElement);
        }
    })
    validSuccess = true;
    for (const key in saveData) {
        if (!saveData[key]) {
            console.log(saveData[key])
            validSuccess = false;
        }
    }
    checkValidSuccess(validSuccess);
})

formContact.addEventListener('input', function (e) {
    handleError(e.target.closest('.wrapper-value'), false);
})

function validate (parentElement, validateElement) {   
    if (validateElement.type === 'text') {
        if (validateElement.value.trim()) {
            if (validateElement.id === 'email') {
                if (emailRegex.test(validateElement.value.trim())) {
                    handleError(parentElement, false, true);
                    saveData.email = validateElement.value.trim();
                } else {
                    handleError(parentElement, true, true);
                }
            } else {
                handleError(parentElement, false);
                if (validateElement.id === 'first-name') {
                    saveData.firstName = validateElement.value.trim();
                }
                if (validateElement.id === 'last-name') {
                    saveData.lastName = validateElement.value.trim();
                }
            }
        } 
        else {
            handleError(parentElement, true);
        }
    } 
    // else if (validateElement.type === 'email') {
    //     if (validateElement.value.trim()) {
    //         handleError(parentElement, false);
    //     } else if (emailRegex.test(validateElement.value.trim())) {
    //         handleError(parentElement, false, false);
    //     } else {
    //         handleError(parentElement, true);
    //     }
    // } 
    else if (validateElement.classList.contains('wrapper-query-content')) {
        console.log("check query type")
        if (validateElement.querySelector('input:checked')) {
            handleError(parentElement, false);
            saveData.queryType = validateElement.querySelector('input:checked').value;
        } else {
            handleError(parentElement, true);
        }
    } else if (validateElement.name === 'agree') {
        if (validateElement.checked) {
            handleError(parentElement, false);
            saveData.agree = true;
        } else {
            handleError(parentElement, true);
        }
    } else if (validateElement.name === 'message') {
        if (validateElement.value.trim()) {
            handleError(parentElement, false);
            saveData.message = validateElement.value.trim();
        } else {
            handleError(parentElement, true);
        }
    }

}

function handleError (element, isError, errorEmail) {
    let spanElementError = element.querySelector('.error-msg')
    let spanEmailElement = element.querySelector('.error-msg.error-msg-email')
    let elementShowError = null; 

    if (errorEmail) {
        elementShowError = spanEmailElement; 
    } else {
        elementShowError = spanElementError; 
    }

    let fieldTyping = element.querySelector('.field-typing')
    if (isError) {
        if (fieldTyping) {
            fieldTyping.classList.add('error-border');
        }
        elementShowError.classList.remove('hidden');
    } else {
        if (fieldTyping) {
            fieldTyping.classList.remove('error-border');
        }
        elementShowError.classList.add('hidden');
    }
}

function checkValidSuccess (result) {
    console.log('check valid success')
    if (result) {
        formContact.reset();
        successState.classList.remove('hidden');
        setTimeout(function () {
            successState.classList.add('hidden');
        }, 2000)
    } else {
        successState.classList.add('hidden');
    }
}
