const inquirer = require("inquirer");
const fs = require("fs");

// License types are from https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
LICESNSE_TYPES = [
  {
    name: "Apache 2.0",
    mdText: `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
  },
  {
    name: "Boost Software 1.0",
    mdText: `[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`,
  },
  {
    name: "BSD 3-Clause",
    mdText: `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`,
  },
  {
    name: "BSD 2-Clause",
    mdText: `[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`,
  },
  {
    name: "CC0",
    mdText: `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)`,
  },
  {
    name: "Attribution 4.0 International",
    mdText: `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)`,
  },
  {
    name: "Attribution-ShareAlike 4.0 International",
    mdText: `[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)`,
  },
  {
    name: "Attribution-NonCommercial 4.0 International",
    mdText: `[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)`,
  },
  {
    name: "Attribution-NoDerivates 4.0 International",
    mdText: `[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)`,
  },
  {
    name: "Attribution-NonCommmercial-ShareAlike 4.0 International",
    mdText: `[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)`,
  },
  {
    name: "Attribution-NonCommercial-NoDerivatives 4.0 International",
    mdText: `[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)`,
  },
  {
    name: "Eclipse Public 1.0",
    mdText: `[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`,
  },
  {
    name: "GNU GPL v3",
    mdText: `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`,
  },
  {
    name: "GNU GPL v2",
    mdText: `[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`,
  },
  {
    name: "GNU AGPL v3",
    mdText: `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`,
  },
  {
    name: "GNU LGPL v3",
    mdText: `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)`,
  },
  {
    name: "GNU FDL v1.3",
    mdText: `[![License: FDL 1.3](https://img.shields.io/badge/License-FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)`,
  },
  {
    name: "Hippocratic 2.1",
    mdText: `[![License: Hippocratic 2.1](https://img.shields.io/badge/License-Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)`,
  },
  {
    name: "Hippocratic 3.0",
    mdText: `[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)`,
  },
  {
    name: "IBM Public 1.0",
    mdText: `[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)`,
  },
  {
    name: "ISC",
    mdText: `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`,
  },
  {
    name: "MIT",
    mdText: `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
  },
  {
    name: "Mozilla Public 2.0",
    mdText: `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`,
  },
  {
    name: "Attribution (BY)",
    mdText: `[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)`,
  },
  {
    name: "Open Database (ODbL)",
    mdText: `[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)`,
  },
  {
    name: "Public Domain Dedication and License (PDDL)",
    mdText: `[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)`,
  },
  {
    name: "Perl",
    mdText: `[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)`,
  },
  {
    name: "Artistic 2.0",
    mdText: `[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)`,
  },
  {
    name: "SIL Open Font 1.1",
    mdText: `[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)`,
  },
  {
    name: "Unlicense",
    mdText: `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`,
  },
  {
    name: "Do What the Fuck You Want to Public License",
    mdText: `[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)`,
  },
  {
    name: "zlib/libpng",
    mdText: `[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)`,
  },
];

// Enumerate questions for the user to answer via Inquirer
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
      output = element.mdText;
    }
  });
  return output;
}

// Write the actual README.md file to disk after formatting its contents
function writeToFile(fileName, answers) {
  // Setting up the mother of all template literals for the actual body of the file
  const readmeContent = `# ${answers.projectTitle}
${lic2badge(answers.projectLicense)}

## Description

${answers.projectDescription}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Tests](#tests)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

${answers.projectInstructions}

## Usage

${answers.projectUsage}

## Credits

MANUALLY LIST COLLABORATORS HERE

## License

Licensed under the ${answers.projectLicense} license.

## Tests

${answers.projectTestInstructions}

## Contributing

${answers.projectContributionGuidelines}

## Questions

[Github: ${answers.projectGithub}](https://github.com/${
    answers.projectGithub
  })<br>
Email: ${answers.projectEmail}

`;

  // Write the file to disk and console log a confirmation
  fs.writeFile(`./output/${fileName}`, readmeContent, (err) => {
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
