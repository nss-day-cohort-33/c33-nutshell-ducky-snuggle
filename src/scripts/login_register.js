
//this builds the dom for registration form//
    function registerUserForm(){ 
    return `
    <h1>Registration</h1>
    <fieldset>
    <div>
        <label for="userName">Username:</label>
        <input id="userName" type="text" placeholder="ex: joeshep123">
        <label for="email">Email:</label>
        <input id="email" type="text" placeholder="ex: joeshep@hotmail.com">
        <label for="password">Password:</label>
        <input id="password" type="text" placeholder="ex: password123">
        <button id="submit-reg-btn">Submit</button>
    </div>
    </fieldset>
    `
    }
//Builds intial Login Screen//
function loginUser () {
    return `
    <h1>Welcome, Snuggle Ducks, to Nutshell</h1>
    <fieldset>
    <div>
        <label for="login">Login:</label>
        <input id="login" type="text" placeholder="Your Username">
        <label for="password">Password:</label>
        <input id="password" type="password" placeholder="Your Password">
        <button id="login-btn">Login</button>
        <div class="register-link"><a id="register-link" href="">Register</a></div>
    </div>
    </fieldset>
    `
}


export {registerUserForm, loginUser}
