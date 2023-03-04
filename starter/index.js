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

const startingPrompts = () => {
    inquirer.prompt([{
        name: 'tmName',
        message: "Enter name"
    },{
        name: 'employeeID',
        message: "Enter employee ID"
    },{
        name: "emailAdd",
        message: "Enter email address"
    },{
        name: "officeNumb",
        message: "Enter office number"
    },{
        type:'list',
                name: 'choice',
                message: 'Please choose an option',
                choices: ['Add an Engineer', 'Add an intern', 'Finish building the team']
    }]).then((data) => {
        const manager = new Manager(data.tmName, data.employeeID, data.emailAdd, data.officeNum);
        switch (data.choices) {
            case 'Add an Engineer':
                engineerPrompt();
                break;
            case 'Add an intern':
                internPrompt();
                break;
            case 'Finish building the team':
                render()
        }
        console.log(data);
    })

    }








const init = () => {
    startingPrompts()

}




init()