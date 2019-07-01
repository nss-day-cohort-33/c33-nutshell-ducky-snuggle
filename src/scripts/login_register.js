//this builds the dom for registration form
function registerUser (){
return `
<h1>Registration</h1>
<fieldset>
<div>
    <label for="userName">Username:</label>
    <input id="userName" type="text" placeholder="ex: joeshep123">
    <label for="email">Username:</label>
    <input id="email" type="text" placeholder="ex: joeshep@hotmail.com">
    <button id="submit-reg-btn">Submit</button>
</div>
</fieldset>
`
}


export {registerUser}
