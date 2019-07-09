
const taskComp = {
    // SN- All of this is your task stuff

    addTaskForm: function () { //SN
        return `
        <h1> Task Manager <h1>
            <fieldset> 
            <label for="taskName">Task:</label>
            <input id="taskInput" type="text" name="taskName"/>
            </fieldset>
            <fieldset> 
            <label for="taskDate">Date Due:</label>
            <input id="taskDate" type="date" name="taskDate"/>
            </fieldset>
        `
    },


    createTaskComp: function (taskArray) { //SN
        let taskName = `
        <h3> To Do: </h3>
            <input id= "taskCheckbox-${taskArray.id}" type="checkbox" name="completed" value="true"> 
            <p id="taskComp-${taskArray.id}"> ${taskArray.task} </p> 
            <p id="taskCompDate-${taskArray.id}"> ${taskArray.date_due} </p>
        `
        return taskName
    },
    
    addTaskEditForm: function (taskArray) { //SN
        console.log("in function", taskArray)
        return `
        <h3> To Do: </h3>
        <input id = "editTaskInputText" type="text" name="newTask" value="${taskArray.task}"/>
        <input id = "editTaskInputDate" type="date" name="newTask" value="${taskArray.date_due}"/>
        <input id = "editTaskInputId" type="hidden" name="newTask" value="${taskArray.id}"/>
        `
    },

    //SN- Task components end here

}

export { taskComp };


