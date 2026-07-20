const successState = document.querySelector('.success-state');
const formContact = document.querySelector('#form-contact');
const allWrapperValue = document.querySelectorAll('.wrapper-value');

const saveData = {
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    agree: false,
}

const fieldConfig = {
    email: {
        regex: /.+/,
        regexEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMsg: "This field is required",
        errorEmailMsg: "Please enter a valid email address", 
    },
    default: {
        regex: /.+/,
        errorMsg: "This field is required"
    },
    radio: {
        isValid: (fieldset) => !!fieldset.querySelector("input:checked"),
        errorMsg: "Please select a query type"
    },
    checkbox: {
        isValid: (input) => input.checked,
        errorMsg: "To submit this form, please consent to being contacted"
    }
}

function validateField (element) {
    const fieldType = element.dataset.validate || 'default';
    const config = fieldConfig[fieldType];
    const parentElement = element.closest('.wrapper-value');
    let isValid = false;
    let validEmail = false;
    let resultValid;

    if (config.isValid) {
        isValid = config.isValid(element); 
        resultValid = {
            isValid: isValid,
            msg: config.errorMsg
        }
    } else if (fieldType === 'email') {
        if (config.regex.test(element.value.trim())) {
            isValid = config.regexEmail.test(element.value.trim());
            resultValid = {
                isValid: isValid,
                msg: config.errorEmailMsg
            }
        } else {
            isValid = config.regex.test(element.value.trim());
            resultValid = {
                isValid: isValid,
                msg: config.errorMsg
            }
        }
    } else {
        isValid = config.regex.test(element.value.trim());
        resultValid = {
            isValid: isValid,
            msg: config.errorMsg
        }
    }

    handleError(parentElement, element, resultValid);

    return isValid;
}
 
formContact.addEventListener('submit', function (e) {
    e.preventDefault();
    let isFormValid = true;
    allWrapperValue.forEach(element => {
        const checkValid = validateField(element.querySelector('.value-validate'));
        isFormValid = isFormValid && checkValid;
    })
    checkValidSuccess(isFormValid);
})

formContact.addEventListener('input', function (e) {
    validateField(e.target.closest('.wrapper-value').querySelector('.value-validate'))
})

function handleError (element, validateElement, resultValid) {
    let spanElementError = element.querySelector('.error-msg')
    let elementShowError = null; 

    let fieldTyping = element.querySelector('.field-typing')
    if (!resultValid.isValid) {
        if (fieldTyping) {
            fieldTyping.classList.add('error-border');
        }
        spanElementError.classList.remove('hidden');
        spanElementError.textContent = `${resultValid.msg}`;
    } else {
        if (fieldTyping) {
            fieldTyping.classList.remove('error-border');
        }
        spanElementError.classList.add('hidden');
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