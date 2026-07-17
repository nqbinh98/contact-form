const successState = document.querySelector('.success-state');
const formContact = document.querySelector('#form-contact');
const allWrapperValue = document.querySelectorAll('.wrapper-value');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const saveData = {
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    agree: false,
}
let validSuccess;
formContact.addEventListener('submit', function (e) {
    e.preventDefault();
    allWrapperValue.forEach(element => {
        const firstNameElement = element.querySelector('input[type="text"]#first-name'); 
        const lastNameElement = element.querySelector('input[type="text"]#last-name'); 
        const emailElement = element.querySelector('input[type="text"]#email'); 
        const wrapperQueryElement = element.querySelector('.wrapper-query-content');
        const textareaElement = element.querySelector('textarea');
        const checkboxElement = element.querySelector('input[name="agree"]'); 
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
                    handleError(parentElement, validateElement, false, true);
                    saveData.email = validateElement.value.trim();
                } else {
                    handleError(parentElement, validateElement, true, true);
                }
            } else {
                handleError(parentElement, validateElement, false);
                if (validateElement.id === 'first-name') {
                    saveData.firstName = validateElement.value.trim();
                }
                if (validateElement.id === 'last-name') {
                    saveData.lastName = validateElement.value.trim();
                }
            }
        } 
        else {
            handleError(parentElement, validateElement, true);
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
        if (validateElement.querySelector('input:checked')) {
            handleError(parentElement, validateElement, false);
            saveData.queryType = validateElement.querySelector('input:checked').value;
        } else {
            handleError(parentElement, validateElement, true);
        }
    } else if (validateElement.name === 'agree') {
        if (validateElement.checked) {
            handleError(parentElement, validateElement, false);
            saveData.agree = true;
        } else {
            handleError(parentElement, validateElement, true);
        }
    } else if (validateElement.name === 'message') {
        if (validateElement.value.trim()) {
            handleError(parentElement, validateElement, false);
            saveData.message = validateElement.value.trim();
        } else {
            handleError(parentElement, validateElement, true);
        }
    }

}

function handleError (element, validateElement, isError, errorEmail) {
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
        validateElement.setAttribute('aria-invalid', true);
    } else {
        if (fieldTyping) {
            fieldTyping.classList.remove('error-border');
        }
        elementShowError.classList.add('hidden');
        validateElement.setAttribute('aria-invalid', false);
    }
}

function checkValidSuccess (result) {
    if (result) {
        formContact.reset();
        successState.classList.remove('hidden');
        setTimeout(function () {
            successState.classList.add('hidden');
        }, 5000)
    } else {
        successState.classList.add('hidden');
    }
}
