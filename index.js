const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");


// Enumerate questions for the user to answer via Inquirer
const questions = [

  {
    type: "input",
    message: `Project title: `,
    name: `projectTitle`,
  },

  {
    type: "input",
    message: `Project description: `,
    name: `projectDescription`,
  },

  {
    type: "input",
    message: `Installation instructions:`,
    name: `projectInstructions`,
  },

  {
    type: "input",
    message: `Usage information: `,
    name: `projectUsage`,
  },

  {
    type: "input",
    message: `Contribution guidelines: `,
    name: `projectContributionGuidelines`,
  },

  {
    type: "input",
    message: `Test instructions: `,
    name: `projectTestInstructions`,
  },

  {
    type: "list",
    message: `Select project license: `,
    name: `projectLicense`,
    choices: LICESNSE_TYPES.map((element) => element.name),
  },

  {
    type: "input",
    message: "Github username: ",
    name: "projectGithub",
  },

  {
    type: "input",
    message: "Email: ",
    name: "projectEmail",
  },
];

// Write the actual README.md file to disk after formatting its contents
function writeToFile(fileName, answers) {

  // Write the file to disk and console log a confirmation
  fs.writeFile(`./output/${fileName}`, generateMarkdown(answers), (err) => {
    err
      ? console.log(`Failed to write ${fileName}`)
      : console.log(`Successfully written to ./output/${fileName}`);
  });
}

// Prompt the user with questions and format the answers in a file written to disk
function init() {
  inquirer.prompt(questions).then((answers) => {
    writeToFile("README.md", answers);
  });
}

// Function call to initialize app
init();
