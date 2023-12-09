"use strict";

// if  the user closing the browser and return to the page, the unfinished tasks will load on the screen.
displayTasks();

// Saving new task
function save() {


    //Getting HTML Elements
    const titleBox = document.getElementById("titleBox");
    const descriptionBox = document.getElementById("descriptionBox");
    const dateAndTimeBox = document.getElementById("dateAndTimeBox");


    // Getting values:
    const title = titleBox.value;
    const description = descriptionBox.value;
    const dateAndTime = dateAndTimeBox.value;

    //Check Validity  all the fields returns true if the form is valid and continue in the code 
    const validTasks = validatorSticky(title, description, dateAndTime);
    if (!validTasks) {
        return true;
    }

    // Create task object:
    const task = { title, description, dateAndTime };

    // Take data from storage: 
    let json = localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];

    // Add new task:
    tasks.push(task);

    // Save back: 
    json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);

    // Clear all boxes:
    titleBox.value = "";
    descriptionBox.value = "";
    dateAndTimeBox.value = "";

    displayTasks();

}

// Display the date in a dd/mm/yyyy format and time in a hh/mm format 
function displayDateAndTime(dateString) {
    const date = new Date(dateString);
    const printDate = { day: "2-digit", month: "2-digit", year: "numeric" };
    const printTime = { hour: "numeric", minute: "numeric" };
    const formattedDate = date.toLocaleDateString("he-IL", printDate);
    const formattedTime = date.toLocaleTimeString("he-IL", printTime);
    return formattedDate + " " + formattedTime;
}


// Display all tasks on the page:
function displayTasks() {

    // Take data from storage
    let json = localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];

    //remove tasks that the date ended
    const actualTime = new Date().getTime();
    for (let i = 0; i < tasks.length; i++) {
        const taskTime = new Date(tasks[i].dateAndTime).getTime();
        if (taskTime <= actualTime) {
            removeTasks(i);
        }
    }

    // Display the tasks with elements on the div (title,description,date and the x if the user hover on the tasks
    let stickyNoteData = '';
    for (let i = 0; i < tasks.length; i++) {

        stickyNoteData += `
    
                <div class="task">
                <button class="remove" onclick="removeTasks(${i})">  
                <span class="glyphicon glyphicon-remove"></span>
                </button> 
                <div class="stickyNoteTitle"> ${tasks[i].title} <br> </div>
                <div class="stickyNoteText"> ${tasks[i].description} <br> </div>
                <div class="stickyNoteDate">${displayDateAndTime(tasks[i].dateAndTime)} <br> </div> 
                </div>
            `;

    }
    const sectionTasks = document.getElementById("sectionTasks");
    sectionTasks.innerHTML = stickyNoteData;

}


function removeTasks(index) {

    //  get array from storage.
    let json = localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];


    // Remove the task at the specified index
    tasks.splice(index, 1);


    // Save back array to storage
    json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);


    // Remove the task at the specified index
    displayTasks();

}

//Check Validity  all the fields in form 
function validatorSticky(title, description, dateAndTime) {

    //if user click on the button "add" without filling the fields the alert swal appears 
    if (!title && !description && !dateAndTime) {
        event.preventDefault();
        swal(
            "Alert!",
            "Missing title, description and date and time!",
            "warning");
        return;
    }

    //if the user fill only description the alert swal appears
    if (!title && !dateAndTime) {
        event.preventDefault();
        swal(
            "Alert!",
            "Missing title and date and time!",
            "warning");
        return;
    }

    //if the user fill only title the alert swal appears 
    if (!description && !dateAndTime) {
        event.preventDefault();
        swal(
            "Alert!",
            "Missing description and date and time!",
            "warning");
        return;
    }

    //if the user fill  date and time the alert swal appears 
    if (!title && !description) {
        event.preventDefault();
        swal(
            "Alert!",
            "Missing title and description!",
            "warning");
        return;
    }

    //if the user fill only description and date time  the alert swal appears 
    if (!title) {
        event.preventDefault();
        swal(
            "Alert!",
            "Missing title!",
            "warning");
        return;
    }

    //if the user fill only title and datetime or the length is too short or too long the alert swal appears 
    if (!description) {
        event.preventDefault();
        swal(
            "Alert!",
            "Missing description!",
            "warning");
        return;
    }

    //if the user fill the length of text  too short or too long the alert swal appears 
    if (description.length < 3 || description.length > 700) {
        event.preventDefault();
        swal(
            "Alert!",
            "Description too short or too long!",
            "warning");
        return;
    }

    //if the user fill only title and description the alert swal appears 
    if (!dateAndTime) {
        event.preventDefault();
        swal(
            "Alert!",
            "Missing date and time!",
            "warning");
        return;
    }

    //block the possibility to choose the date passed 
    const isDateFuture = new Date(dateAndTime);
    if (isDateFuture < new Date()) {
        event.preventDefault();
        swal("Alert",
            "Please enter a future date",
            "warning");
        return;
    }

    return true;
}




