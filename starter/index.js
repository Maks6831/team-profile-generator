//----------------------------------------------------- importing scripts & packages -----------------------------------------------------//

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
//--------------------------------------------------------- input validation  ------------------------------------------------------------//

// check if input is empty
const validateEmpty = (value) => {
    if(value === ''){
        return 'Input was empty! try again!'
    }
    return true;
}

// checks if email address is valid
const validateEmail = (value) => {
    // regex variable which will test to see if email input is in this format (section)@(section).(section)[.(optionalsection)] 
    const regex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,7})(\.[a-z]{2,8})?$/;
    // if email input is not in regex format
    if(!regex.test(value)){
        return 'Please enter a valid email address'
    }
    return true
}

const validateNumber = (value) => {
    // if value is not a number or is empty string...
    if(isNaN(value) || validateEmpty(value) === 'Input was empty! try again!'){
        return 'Please enter a valid number';
    }
    return true;
}

//----------------------------------------------------- objects for inquire prompts -----------------------------------------------------//

// the following objects will be used in the inquirer.prompt method
const enterName = {name: 'name', message: 'Enter name', validate: validateEmpty};
const emailAdd = {name: "emailAdd", message: "Enter email address", validate: validateEmail};
const employeeID = {name: 'employeeID', message: "Enter employee ID", validate: validateEmpty};
const officeNumber = {name: "officeNumb", message: "Enter office number", validate: validateNumber};
const ID = {name: 'ID', message: 'Enter ID', validate: validateEmpty};
const githubUsername = {name: 'github', message: 'Enter your username', validate: validateEmpty};
const school = {name: 'school', message: 'Enter your most recent school', validate: validateEmpty};
const menu = {
    type: 'list',
    name: 'choice',
    message: 'please choose an option',
    choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
}

//----------------------------------------------------------- Create HTML page ---------------------------------------------------------//

// writes file to team.html
const createHtml = (team) => {
    fs.writeFile(outputPath, render(team), (err) => err? console.log(err): console.log('Thank you for using the Team Profile Generator, your html file should be located in the output folder!'));
}
// checks what end user chooses and then executes functions for required output
const menuOption = (choice, team) => {
    switch (choice) {
        case 'Add an engineer':
            // create engineer object
            engineerPrompt(team);
            break;
        case 'Add an intern':
            // create intern object
            internPrompt(team);
            break;
        case 'Finish building the team':
            // calls write file function
            createHtml(team);
    }

}
// gathers information for creating intern 
const internPrompt = (team) => {
    inquirer.prompt([enterName, ID, emailAdd, school, menu]).then((data)=>{
        // create object using class Intern
        const intern = new Intern(data.name, data.ID, data.emailAdd, data.school);
        // push intern object to team (team acquired from startingprompts or engineerprompts function)
        team.push(intern);
        // carry out choice of end user
        menuOption(data.choice, team); 
    })
    
}
// gathers information for creating engineer 
const engineerPrompt = (team) => {
    inquirer.prompt([enterName, ID, emailAdd, githubUsername, menu]).then((data) => {
        // creating object using class Engineer
        const engineer = new Engineer(data.name, data.ID, data.emailAdd, data.github, data.choice);
        // push engineer object to team 
        team.push(engineer);
        // carry out choice of end user 
        menuOption(data.choice, team);
    })
}
// gathers information for creating manager 
const startingPrompts = () => {
    inquirer.prompt([enterName, employeeID, emailAdd, officeNumber, menu]).then((data) => {
        // creating object using class Manager
        const manager = new Manager(data.name, data.employeeID, data.emailAdd, data.officeNumb);
        // create team array and add manager object to it
        const team = [manager];
        // carry out choice of end user 
        menuOption(data.choice, team);
    })

    }



// initializes program
function init(){
    console.log('Thank you for using the Team Profile Generator program');
    console.log('Please enter the manager information...');
    startingPrompts();
}
// start program
init();