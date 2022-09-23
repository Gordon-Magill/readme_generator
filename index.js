// TODO: Include packages needed for this application
const inquirer = require('inquirer')

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
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
