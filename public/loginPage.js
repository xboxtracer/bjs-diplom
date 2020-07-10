'use strict'

const newUser = new UserForm();
newUser.loginFormCallback = data => ApiConnector.login(data, response => {
    response.success ? location.reload() : newUser.setLoginErrorMessage(response.data), newUser.loginErrorMessageBox;
});
newUser.registerFormCallback = data => ApiConnector.register(data, response => {
    response.success ? location.reload() : newUser.setRegisterErrorMessage(response.data), newUser.registerErrorMessageBox;
});

