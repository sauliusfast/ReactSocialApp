export function passwordValidation(passOneValue, passTwoValue) {
    let invalid;
    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const specialCharRegExp = /(?=.*?[!@#$%^&*_+])/;

    if (passOneValue.length < 4 || passOneValue.length > 20) invalid = "pass is too short or too long"
    if (passOneValue !== passTwoValue) invalid = "passwords should match"
    if (!uppercaseRegExp.test(passOneValue)) invalid = "upper case letter should be included"
    if (!specialCharRegExp.test(passOneValue)) invalid = "special symbol should be included"

    return invalid;
}