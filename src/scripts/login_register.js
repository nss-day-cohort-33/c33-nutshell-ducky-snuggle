
//this builds the dom for registration form//
function registerUserForm (){
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
function loginUserForm () {
return `
<div class="login">
<h1 id="login-header"><strong class="strong">Welcome, Snuggle Ducks, to Nutshell</strong></h1>
<fieldset class="login-field">
<div id="login-field-stuff">
    <label for="login">Login:</label>
    <input id="login" type="text" placeholder="Your Username">
    <br><br>
    <label for="password">Password:</label>
    <input id="password" type="password" placeholder="Your Password">
    <br><br>
    <button id="login-btn">Login</button>
    <div class="register-link"><a id="register-link" href="">Register</a></div>
</div>
</fieldset>
</div>
`
}


export {registerUserForm, loginUserForm}
