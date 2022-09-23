const inquirer = require("inquirer");
const fs = require("fs");

LICESNSE_TYPES = [
  {
    name: "License0",
    description: "Description of License0",
    mdText: `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
  },
  {
    name: "License1",
    description: "Description of License1",
    mdText: `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
  },
  {
    name: "License2",
    description: "Description of License2",
    mdText: `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
  },
  {
    name: "License3",
    description: "Description of License3",
    mdText: `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
  },
  {
    name: "License4",
    description: "Description of License4",
    mdText: `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
  },
];

// TODO: Create an array of questions for user input
const questions = [
  // WHEN I enter my project title
  // THEN this is displayed as the title of the README
  {
    type: "input",
    message: `Project title: `,
    name: `projectTitle`,
  },

  // WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
  // THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
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

  // WHEN I choose a license for my application from a list of options
  // THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered unde
  {
    type: "list",
    message: `Select project license: `,
    name: `projectLicense`,
    choices: LICESNSE_TYPES.map((element) => element.name),
  },

  // WHEN I enter my GitHub username
  // THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
  {
    type: "input",
    message: "Github username: ",
    name: "projectGithub",
  },

  // WHEN I enter my email address
  // THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
  {
    type: "input",
    message: "Email: ",
    name: "projectEmail",
  },
];

// Takes in a string describing a license type
// and returns the corresponding MD text for that license's badge
function lic2badge(licenseType) {
  // Could be done with switch/case, but this is more compact
  let output;
  LICESNSE_TYPES.forEach((element) => {
    if (element.name === licenseType) {
      console.log("Found matching license type, adding MD:");
      console.log(element.mdText);
      output = element.mdText;
    };
  });
  return output;
};

// TODO: Create a function to write README file
function writeToFile(fileName, answers) {
    console.log(answers.projectLicense)
    console.log(lic2badge(answers.projectLicense))
  const readmeContent = `# ${answers.projectTitle}
${lic2badge(answers.projectLicense)}

## Description

${answers.projectDescription}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [Tests](#tests)
- [Contributing](#contributing)

## Installation

${answers.projectInstructions}

## Usage

${answers.projectUsage}

## Credits

MANUALLY LIST COLLABORATORS HERE

## License

${answers.projectLicense} 

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

## Tests

${answers.projectTestInstructions}

## Contributing

${answers.projectContributionGuidelines}

## Questions

${answers.projectGithub}
// TODO Add actual link to the github
${answers.projectEmail}

`;

  fs.writeFile(`./output/${fileName}`, readmeContent, (err) => {
    err
      ? console.log("Failed to write readme.md")
      : console.log("Readme written to file");
  });
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    writeToFile("README.md", answers);
  });
}

// Function call to initialize app
init();
