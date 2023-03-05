const Manager = require("./lib/Manager");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


console.log('Sucess!!')


// TODO: Write Code to gather information about the development team members, and render the HTML file.


const enterName = {name: 'name', message: 'Enter Name'};
const emailAdd = {name: "emailAdd", message: "Enter email address"};
const employeeID = {name: 'employeeID', message: "Enter employee ID"};
const officeNumber = {name: "officeNumb", message: "Enter office number"};
const ID = {name: 'ID', message: 'Enter ID'};
const githubUsername = {name: 'github', message: 'Enter your username'};
const school = {name: 'school', message: 'Enter School'};
const menu = {
    type: 'list',
    name: 'choice',
    message: 'please choose an option',
    choices: ['Add an Engineer', 'Add an intern', 'Finish building the team']
}



const createHtml = (team) => {
    fs.writeFile(outputPath, render(team), (err) => err? console.log(err): console.log('success'));
}

const menuOption = (choice, team) => {
    switch (choice) {
        case 'Add an Engineer':
            engineerPrompt(team);
            break;
        case 'Add an intern':
            internPrompt(team);
            break;
        case 'Finish building the team':
            console.log('switch statement is working');
            createHtml(team);
    }

}

const internPrompt = (team) => {
    inquirer.prompt([enterName, ID, emailAdd, school, menu]).then((data)=>{
        const intern = new Intern(data.name, data.ID, data.emailAdd, data.school);
        team.push(intern);
        menuOption(data.choice, team); 
    })
    
}

const engineerPrompt = (team) => {
    inquirer.prompt([enterName, ID, emailAdd, githubUsername, menu]).then((data) => {
        const engineer = new Engineer(data.name, data.ID, data.emailAdd, data.github, data.choice);
        team.push(engineer);
        menuOption(data.choice, team);
    })
}

const startingPrompts = () => {
    inquirer.prompt([enterName, employeeID, emailAdd, officeNumber, menu]).then((data) => {
        const manager = new Manager(data.name, data.employeeID, data.emailAdd, data.officeNumb);
        const team = [manager];
        menuOption(data.choice, team);
        console.log(data);
        console.log('this is the manager class object ---');
        console.log(manager);
    })

    }








const init = () => {
    startingPrompts()

}




init()