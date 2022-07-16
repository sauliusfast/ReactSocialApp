export function usernameValidation(username) {
    let invalid;
    if (username.length < 4 || username.length > 20) invalid = "bad username provided"
    if (username.length < 4 || username.length > 20) invalid = "username is too short or too long"

    return invalid;
}