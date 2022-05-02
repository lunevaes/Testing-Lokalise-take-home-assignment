# Take Home Assignment - Testing Lokalise
This repository contains a test suite that is written in JS using Playwright and aims to test several functions on the Lokalise website:
- Creation of the first project
- Creation of the nth project
- Adding the first key to a project
- Adding translation to the key
- Adding a plural key with a translation of all forms

Also, there are some extra steps in the code, such as:
- Authentification before every step
- Deleting possible projects from previous runs of the script
- Adjusting preconditions (for example, in the third case, only one project is needed, but, following the test suite, there will be two projects, so the code will delete the second project)

## Usage

Before running the test, please make sure that NodeJS and npm are installed. You can download it from:
- https://nodejs.org/en/download/ (npm is optional for installation from the file as well)

or install by command line:
- https://nodejs.org/en/download/package-manager/

In order to run the test suite, you need to download the project, install Playwright and other dependencies by the command from the folder of the project: 

```sh
npm install
```
Add to test.spec.js relevant login and password from the stage site and execute:

```sh
npx playwright test
```

If it is required, you can run the test in headed browser by the command:

```sh
npx playwright test --headed
```

All 5 cases will be played one by one and will use https://app.stage.lokalise.cloud/ as a testing environment.
