/*  TODO:
****Create input field DOM component and slap it into the DOM
**** Make sure there is task/date due and a button to save
****Create DOM component to post CURRENT information onto the DOM 
This DOM needs to populate an ID to the text input that has the ID number
****Create Factory function to create task API object
-Create click event that grabs inputs, slaps them into dom, and create API component
-****Create DOM component that replaces text with input field
that populates the text into the field
-Create event listener key press to update API component and refresh using the enter key (keyup)
-Creat event listener that, when checkbox is clicked, changes the complete boolean to false and deletes the task
THIS NEEDS TO BE WRAPPED IN SET TIME OUT to allow for a click

You need to add save and checkbox after append child?
*/



const taskComp = {
    addTaskForm: function () {
        return `
        <h1> Task Manager <h1>
        <form>
            <fieldset> 
            <label for="taskName">Task:</label>
            <input type="text" name="taskName"/>
            </fieldset>
            <fieldset> 
            <label for="taskDate">Date Due:</label>
            <input type="date" name="taskDate"/>
            </fieldset>
        </form>
        `
    },

//FIXME:
    createTaskComp: function (id, task, date) {
        let taskName = `
        <h3> To Do: <h3>
        <div id = "indvTask">
            <p id="taskComp-${id}" value="${task}"> ${task} </p> 
            <p> ${date} </p>
        </div>
        `
        // let taskEl = document.querySelector(`#taskComp-${id}`).value
        // console.log("html", taskEl)
        // let taskDiv = document.querySelector("#indvTask")
        // taskEl.addEventListener("keyup", () => {
        //     if(event.keycode === 13){
        //         taskDiv = ""
        //         addTaskEditForm(taskEl.value)
        //     }
        // })
        return taskName
    },

    addTaskEditForm: function (text) {
        return `
        <input type="text" name="newTaskName" value="${text}"/>
        `
    },
}

export { taskComp };