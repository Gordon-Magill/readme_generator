// TODO: Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    // WHEN I enter my project title
    // THEN this is displayed as the title of the README
    {
        type: 'input',
        message: `Project title: `,
        name: `projectTitle`
    },

    // WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
    // THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
    {
        type: 'input',
        message: `Project description: `,
        name: `projectDescription`

    },
    {
        type: 'input',
        message: `Installation instructions:`,
        name: `projectInstructions`

    },
    {
        type: 'input',
        message: `Usage information: `,
        name: `projectUsage`

    },
    {
        type: 'input',
        message: `Contribution guidelines: `,
        name: `projectContributionGuidelines`

    },
    {
        type: 'input',
        message: `Test instructions: `,
        name: `projectTestInstructions`

    },

    // WHEN I choose a license for my application from a list of options
    // THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered unde
    {
        type: 'list',
        message: `Select project license: `,
        name: `projectLicense`,
        choices: [
            'LicenseA','LicenseB','LicenseC'
        ],

    },

    // WHEN I enter my GitHub username
    // THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
    {
        type: 'input',
        message: 'Github username: ',
        name: 'projectGithub'
    },
    
    // WHEN I enter my email address
    // THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
    {
        type: 'input',
        message: 'Email: ',
        name: 'projectEmail'
    },

];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    const readmeContent = `# ${data.projectTitle}

## Description

${data.projectDescription}

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

${data.projectIntructions}

## Usage

${data.projectUsage}

## Credits

List your collaborators, if any, with links to their GitHub profiles.


## License

${data.projectLicense} 

## Badges

${data.projectGithub}

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

## Features

If your project has a lot of features, list them here.

## How to Contribute

${data.projectContributionGuidelines}

## Tests

Go the extra mile and write tests for you`
    

    fs.writeFile(fileName,readmeContent,(err) => {
        err ? console.log('Failed to write readme.md') : console.log("Readme written to file")
    })

}

// TODO: Create a function to initialize app
function init() {

    inquirer.prompt(questions)
        .then((answers) => {
            writeToFile('testreadme.md',answers)
        })
    
}

// Function call to initialize app
init();
