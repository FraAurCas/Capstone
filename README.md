<p align="center">
  <a href="http://materializecss.com/">
    <img src="http://materializecss.com/res/materialize.svg" width="150">
  </a>
</p>

<h3 align="center">MaterializeCSS</h3>

<p align="center">
  Materialize, a CSS Framework based on material design.
  <br>
  <a href="http://materializecss.com/"><strong>-- Browse the docs --</strong></a>
  <br>
  <br>
  <a href="https://travis-ci.org/Dogfalo/materialize">
    <img src="https://travis-ci.org/Dogfalo/materialize.svg?branch=master" alt="Travis CI badge">
  </a>
  <a href="https://badge.fury.io/js/materialize-css">
    <img src="https://badge.fury.io/js/materialize-css.svg" alt="npm version badge">
  </a>
  <a href="https://cdnjs.com/libraries/materialize">
    <img src="https://img.shields.io/cdnjs/v/materialize.svg" alt="CDNJS version badge">
  </a>
  <a href="https://david-dm.org/Dogfalo/materialize">
    <img src="https://david-dm.org/Dogfalo/materialize/status.svg" alt="dependencies Status badge">
    </a>
  <a href="https://david-dm.org/Dogfalo/materialize#info=devDependencies">
    <img src="https://david-dm.org/Dogfalo/materialize/dev-status.svg" alt="devDependency Status badge">
  </a>
  <a href="https://gitter.im/Dogfalo/materialize">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="Gitter badge">
  </a>
</p>

## Table of Contents
- [Project Setup](#setup)

Materialize README:
- [Quickstart](#quickstart)
- [Documentation](#documentation)
- [Supported Browsers](#supported-browsers)
- [Changelog](#changelog)
- [Testing](#testing)
- [Contributing](#contributing)
- [Copyright and license](#copyright-and-license)

## Project Setup:
This program requires hosting itself as well as a MySQL database.

The MySQL database must contain the following:
- A table named "stringData"
- stringdata must have columns "ID", "segment", "region", "industry", "hazardGroup", "revenue", "powerUnits", "insurableValue", "payroll", "catastrophe", "description"
- All columns should be varchar(255), except description, which should be varchar(65535)

To connect the MySQL database to the webserver, edit routs/database.js. Host should be changed to the domain name or IP of the hosted database. User and password should be changed to that of an authorized user of the database. Database should be changed to the name of the database.

## Authentication Setup
Login and authentication is set up through [Auth0](https://www.Auth0.com).
- [Create](https://auth0.com/signup?&signUpData=%7B%22category%22%3A%22docs%22%7D) an account
  - Select the "As a Company" option
- [Create](https://manage.auth0.com/dashboard) an application.
  - Name the application in the box at the top
  - Select "Regular Web Applications"
  - Click "Create"
  - Search and select "Node.js (Express)"
  - Select "Integrate Now" under "I want to integrate with my app" on the left side.
  - Replace the URL under "Allowed Callback URL" and "Allowed Logout URLs" with the URL of the hosted website.
  - Click "SAVE SETTINGS AND CONTINUE"
- Configure the web application
  - The following steps have already been done for a different Auth0 account. Information needs to be replaced with new information for this account.
  - Skip the install dependencies steps
  - Copy the code in the "Configure Router" section and paste it over the similar code that is already found in /app.js
  - Follow [this guide](https://docs.oracle.com/en/database/oracle/machine-learning/oml4r/1.5.1/oread/creating-and-modifying-environment-variables-on-windows.html#GUID-DD6F9982-60D5-48F6-8270-A27EC53807D0) and create an environment variable to replace the secret to avoid having it in plain text.
  - Click "NEXT: TEST YOUR LOGIN"
  - You can test that the login works here and see any outputted logs.
  - The next step is to verify that users are logged in. This has already been implemented into the project so this step is done.
- Add a rule to restrict access
  - [Return to the dashboard](https://manage.auth0.com/dashboard) and go to Auth Pipeline -> Rules
  - Click "Create"
  - Add the "Email domain whitelist" rule
  - Replace the line 7 in the "Script" section with demo const whitelist = ['willistowerswatson.com']; //authorized domains
  - Click "Save changes"
## Quickstart:
Read the [getting started guide](http://materializecss.com/getting-started.html) for more information on how to use materialize.

- [Download the latest release](https://github.com/Dogfalo/materialize/releases/latest) of materialize directly from GitHub. ([Beta](https://github.com/Dogfalo/materialize/releases/))
- Clone the repo: `git clone https://github.com/Dogfalo/materialize.git` (Beta: `git clone -b v1-dev https://github.com/Dogfalo/materialize.git`)
- Include the files via [cdnjs](https://cdnjs.com/libraries/materialize). More [here](http://materializecss.com/getting-started.html). ([Beta](https://cdnjs.com/libraries/materialize/1.0.0-beta))
- Install with [npm](https://www.npmjs.com): `npm install materialize-css` (Beta: `npm install materialize-css@next`)
- Install with [Bower](https://bower.io): `bower install materialize` ([DEPRECATED](https://bower.io/blog/2017/how-to-migrate-away-from-bower/))
- Install with [Atmosphere](https://atmospherejs.com): `meteor add materialize:materialize` (Beta: `meteor add materialize:materialize@=1.0.0-beta`)

## Documentation
The documentation can be found at <http://materializecss.com>. To run the documentation locally on your machine, you need [Node.js](https://nodejs.org/en/) installed on your computer.

### Running documentation locally
Run these commands to set up the documentation:

```bash
git clone https://github.com/Dogfalo/materialize
cd materialize
npm install
```

Then run `grunt monitor` to compile the documentation. When it finishes, open a new browser window and navigate to `localhost:8000`. We use [BrowserSync](https://www.browsersync.io/) to display the documentation.

### Documentation for previous releases
Previous releases and their documentation are available for [download](https://github.com/Dogfalo/materialize/releases).

## Supported Browsers:
Materialize is compatible with:

- Chrome 35+
- Firefox 31+
- Safari 9+
- Opera
- Edge
- IE 11+

## Changelog
For changelogs, check out [the Releases section of materialize](https://github.com/Dogfalo/materialize/releases) or the [CHANGELOG.md](CHANGELOG.md).

## Testing
We use Jasmine as our testing framework and we're trying to write a robust test suite for our components. If you want to help, [here's a starting guide on how to write tests in Jasmine](CONTRIBUTING.md#jasmine-testing-guide).

## Contributing
Check out the [CONTRIBUTING document](CONTRIBUTING.md) in the root of the repository to learn how you can contribute. You can also browse the [help-wanted](https://github.com/Dogfalo/materialize/labels/help-wanted) tag in our issue tracker to find things to do.

## Copyright and license
Code Copyright 2018 Materialize. Code released under the MIT license.
