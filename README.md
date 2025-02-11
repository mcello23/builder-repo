<p align="center">
    <img src="https://github.com/facephi/identity-platform-builder-qa/blob/master/assets/images/imagen.jpeg" align="center" width="40%">
</p>
<p align="center"><h1 align="center">IDENTITY PLATFORM BUILDER QA</h1></p>
<p align="center">
    <em>Automate, Validate, Excel: Testing Made Effortless</em>
</p>
<p align="center">
 <a href="https://github.com/facephi/identity-platform-builder-qa/actions/workflows/nightly-tests.yml"><img src="https://github.com/facephi/identity-platform-builder-qa/actions/workflows/nightly-tests.yml/badge.svg" alt="Nightly Tests"></a>
 <a href="https://facephi.github.io/identity-platform-builder-qa/"><img src="https://img.shields.io/badge/E2E_Tests_Report-Mochawesome-red" alt="E2E Report Link"></a>
</p>

<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
    <!-- default option, no dependency badges. -->
</p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

The Identity Platform Builder QA project streamlines end-to-end testing for Builder's QA repository. It automates nightly regression tests, Docker setup, and GitHub Actions for consistent testing. With features like custom commands for API interactions and robust test coverage, it ensures a reliable and efficient testing environment for seamless project development. Targeted at QA teams and developers seeking streamlined testing workflows.

---

##  Features

|      | Feature         | Summary       |
| :--- | :---:           | :---          |
| ⚙️  | **Architecture**  | <ul><li>Modular architecture with clear separation of concerns.</li><li>Microservices-based design for scalability.</li><li>Utilizes central services clients API for integration.</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>Follows best practices with consistent coding standards.</li><li>Includes linting with ESLint and Prettier.</li><li>Uses testing frameworks like Mocha and Cypress for quality assurance.</li></ul> |
| 📄 | **Documentation** | <ul><li>Comprehensive documentation in JavaScript with a mix of JSON and YAML files.</li><li>Includes detailed feature files for behavior-driven development.</li><li>Package management with Yarn is well-documented.</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Integrates with GitHub Actions for CI/CD.</li><li>Utilizes Docker for containerization.</li><li>Includes various JSON files for configuration and data exchange.</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Highly modular structure with separate modules for different functionalities.</li><li>Encourages reusability and maintainability.</li><li>Follows a component-based approach for building.</li></ul> |
| 🧪 | **Testing**       | <ul><li>Extensive testing coverage with unit tests and end-to-end tests using Cypress.</li><li>Includes test scripts for different scenarios and workflows.</li><li>Uses Mocha for test execution and reporting.</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimized performance with efficient code implementation.</li><li>Utilizes ESBuild for fast bundling and transpilation.</li><li>Includes performance testing scenarios for benchmarking.</li></ul> |
| 🛡️ | **Security**      | <ul><li>Prioritizes security with secure coding practices.</li><li>Includes security-related linting rules.</li><li>Follows best practices for data handling and authentication.</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Manages dependencies using Yarn with lock files for version control.</li><li>Includes a wide range of dependencies for testing, linting, and development.</li><li>Ensures dependency updates for security and stability.</li></ul> |

---

##  Project Structure

```sh
└── identity-platform-builder-qa/
    ├── .github
    │   ├── actions
    │   └── workflows
    ├── Dockerfile
    ├── README.md
    ├── cypress
    │   ├── e2e
    │   ├── fixtures
    │   ├── plugins
    │   └── support
    ├── cypress.config.js
    ├── cypress.env.example.json
    ├── package.json
    └── yarn.lock
```


###  Project Index
<details open>
	<summary><b><code>IDENTITY-PLATFORM-BUILDER-QA/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/package.json'>package.json</a></b></td>
				<td>- Facilitates running and managing Cypress tests for the QA repository of Builder<br>- Includes scripts for cleaning screenshots, running tests, generating reports, and more<br>- Dependencies cover testing tools like Mocha and ESLint plugins<br>- The file also configures Cypress plugins and preprocessor for Cucumber tests.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress.config.js'>cypress.config.js</a></b></td>
				<td>- Configures Cypress test settings, including viewport dimensions, timeouts, project ID, screenshot and video settings, reporter options, and memory management<br>- Defines E2E test configurations such as base URL, setup events, and spec pattern for running Cucumber features<br>- Integrates plugins for high-resolution screenshots, collecting failing tests, and generating Mochawesome reports.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress.env.example.json'>cypress.env.example.json</a></b></td>
				<td>Define environment variables for API and Hasura configurations in the project.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/Dockerfile'>Dockerfile</a></b></td>
				<td>- Facilitates setting up a Docker environment for running Cypress E2E tests<br>- Installs necessary dependencies, configures Chrome, and sets up the project for testing<br>- Streamlines the process of running Cypress tests in a consistent and isolated environment.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- .github Submodule -->
		<summary><b>.github</b></summary>
		<blockquote>
			<details>
				<summary><b>workflows</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/.github/workflows/nightly-tests.yml'>nightly-tests.yml</a></b></td>
						<td>- Automates nightly end-to-end regression tests for the project<br>- Checks code, installs dependencies, runs tests, uploads artifacts, deploys reports to GitHub Pages, and sends email notifications upon completion.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/.github/workflows/test-local.yml'>test-local.yml</a></b></td>
						<td>- Orchestrates end-to-end regression tests on push and pull requests for the project's master branch<br>- Utilizes GitHub Actions to set up Node.js, cache dependencies, run tests in a staging environment, and deploy reports to GitHub Pages<br>- Ensures continuous testing and reporting for code changes.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/.github/workflows/test-docker.yml'>test-docker.yml</a></b></td>
						<td>- Automates end-to-end regression testing on Docker images<br>- Sets up Node.js, installs dependencies, builds Docker image, runs Cypress tests, and uploads artifacts<br>- Facilitates seamless testing and deployment workflows for the project.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>actions</b></summary>
				<blockquote>
					<details>
						<summary><b>install</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/.github/actions/install/action.yml'>action.yml</a></b></td>
								<td>Facilitates caching and installing dependencies for the project using GitHub Actions.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>testing-cypress</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/.github/actions/testing-cypress/action.yml'>action.yml</a></b></td>
								<td>- Enables Cypress testing with required environment variables and dependencies setup<br>- Integrates with GitHub Actions for automated testing.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- cypress Submodule -->
		<summary><b>cypress</b></summary>
		<blockquote>
			<details>
				<summary><b>plugins</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/plugins/index.js'>index.js</a></b></td>
						<td>- Configures language settings for different browsers before launching in the Cypress test environment<br>- Integrates the Cypress-Cucumber preprocessor to handle feature files.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>support</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/support/api_builder_commands.js'>api_builder_commands.js</a></b></td>
						<td>- The code file `api_builder_commands.js` provides Cypress commands to interact with the API for clearing user and client databases, as well as returning specific tag information<br>- These commands facilitate automated testing by handling database cleanup and data retrieval operations, ensuring a clean and predictable testing environment.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/support/puppeteer.js'>puppeteer.js</a></b></td>
						<td>- Automate browser interactions using Puppeteer to launch a headless browser, navigate to a specific URL, and manipulate video elements<br>- This code file enhances testing capabilities by simulating user behavior on web pages within the project's testing framework.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/support/repeat_test.js'>repeat_test.js</a></b></td>
						<td>- The code in `repeat_test.js` iterates through Cypress tests multiple times to ensure robustness<br>- It executes tests sequentially, handling errors and providing feedback for each iteration<br>- This script enhances test reliability by running the tests repeatedly, aiding in identifying intermittent failures and improving overall test coverage.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/support/e2e.js'>e2e.js</a></b></td>
						<td>- Integrates custom commands and test setup for end-to-end testing using Cypress<br>- Registers Mochawesome reporter, injects custom styles, clears user database before and after tests, captures screenshots, and ensures visibility of elements<br>- Enhances test automation and reporting capabilities for a robust testing framework.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/support/gui_commands.js'>gui_commands.js</a></b></td>
						<td>- Enables custom commands for user authentication, SDK creation, and camera stubbing in the Cypress test suite<br>- Facilitates seamless testing of user roles, SDK configurations, and camera functionalities within the project's end-to-end testing framework.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/support/api_centralservices_commands.js'>api_centralservices_commands.js</a></b></td>
						<td>- The code file `cypress/support/api_centralservices_commands.js` contains Cypress custom commands for interacting with the Central Services API<br>- These commands enable the removal of a specific client and the retrieval of client information from the API<br>- This file plays a crucial role in facilitating automated testing of the Central Services API within the project's testing framework.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/support/api_mobile_sdk_creations.js'>api_mobile_sdk_creations.js</a></b></td>
						<td>Enables creation of mobile SDK instances with various configurations and statuses via API requests to facilitate testing and development workflows within the project architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/support/api_landing_commands.js'>api_landing_commands.js</a></b></td>
						<td>- Implement Cypress custom commands for API testing unique URLs with different time parameters<br>- The commands send POST requests to specific endpoints, validate responses, and perform additional checks based on the time parameter provided<br>- The code enhances API testing capabilities within the project's test suite.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/support/api_landing_creations.js'>api_landing_creations.js</a></b></td>
						<td>- Summary:
The code file `cypress/support/api_landing_creations.js` provides a Cypress custom command `api_createLandingEmpty` to programmatically create a new empty landing page via an API request<br>- This functionality allows for automated testing of landing page creation workflows within the project's testing suite.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>fixtures</b></summary>
				<blockquote>
					<details>
						<summary><b>camera_stub</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/camera_stub/camera_stub.json'>camera_stub.json</a></b></td>
								<td>Defines a camera stub JSON file for onboarding events, including session and tenant IDs, event details, and payload information.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>manual_validations</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/manual_validations/landings.json'>landings.json</a></b></td>
								<td>Provide data for manual validations of various landing pages in the project.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/manual_validations/landing_workflows.json'>landing_workflows.json</a></b></td>
								<td>- The code file `landing_workflows.json` in the `cypress/fixtures/manual_validations` directory defines the initial workflow for the landing page<br>- It specifies the actions and configurations for the START node, setting the foundation for the user journey within the application<br>- This file plays a crucial role in orchestrating the user interactions and guiding the flow of the landing page experience in the overall project architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/manual_validations/media.json'>media.json</a></b></td>
								<td>- Provides sample media data for manual validations, containing details like name, creation/update timestamps, unique IDs, and associated user IDs<br>- This data is crucial for testing and verifying manual validation processes within the project architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/manual_validations/landing_configurations.json'>landing_configurations.json</a></b></td>
								<td>- Defines landing configurations for various onboarding processes, including titles, API keys, and creation dates<br>- Captures settings like video recording and callback URLs<br>- Supports customization for different onboarding scenarios within the project.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/manual_validations/landing_themes.json'>landing_themes.json</a></b></td>
								<td>- Define manual validations for landing themes in the JSON file, capturing primary, secondary, and tertiary colors, along with font and logo IDs<br>- Each theme entry includes creation and update timestamps, reflecting user-specific configurations.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/manual_validations/landing_modules.json'>landing_modules.json</a></b></td>
								<td>- The code file `landing_modules.json` in the `cypress/fixtures/manual_validations` directory contains configurations for landing modules, including details such as the callback URL and whether the module is active or valid<br>- This file serves as a reference for setting up manual validations related to landing modules within the project architecture.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>auto_validations</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/auto_validations/landings.json'>landings.json</a></b></td>
								<td>Provides sample data for auto validations of various landing pages within the project architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/auto_validations/landing_workflows.json'>landing_workflows.json</a></b></td>
								<td>- The code file `landing_workflows.json` in the `cypress/fixtures/auto_validations` directory defines the initial workflow for the landing page<br>- It specifies the actions and configurations for the START widget, setting the foundation for the user journey within the application<br>- This file plays a crucial role in orchestrating the user experience flow and interactions on the landing page within the project's architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/auto_validations/media.json'>media.json</a></b></td>
								<td>- Provides sample media data for auto-validations in the project, containing details like name, creation/update timestamps, ID, and user ID<br>- This data is crucial for testing and ensuring the accuracy of automated validation processes within the project architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/auto_validations/landing_configurations.json'>landing_configurations.json</a></b></td>
								<td>Define landing configurations for onboarding processes with various titles, URLs, and API keys.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/auto_validations/landing_themes.json'>landing_themes.json</a></b></td>
								<td>Define landing page themes with customizable colors and assets for user personalization.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/fixtures/auto_validations/landing_modules.json'>landing_modules.json</a></b></td>
								<td>- Define landing modules with active and valid states, containing specific values for client, tenant, and platform version<br>- Each module has unique identifiers and timestamps<br>- These modules are associated with different landing pages and users within the project architecture.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>e2e</b></summary>
				<blockquote>
					<details>
						<summary><b>cucumber</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/06 - Validation of SDK and Landing CRUDs with Happy Paths.feature'>06 - Validation of SDK and Landing CRUDs with Happy Paths.feature</a></b></td>
								<td>- Validate customization and connection of Landings and SDKs via API and UI, ensuring successful saves<br>- Manually configure URLs, customize colors, and connect SDKs, verifying properties like Automatic and Tracking<br>- Confirm correct display of status variations for Landings and SDKs.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/09 - Validation of Landing Unique URL and Time Validity.feature'>09 - Validation of Landing Unique URL and Time Validity.feature</a></b></td>
								<td>Validate Landing API for URL uniqueness and time validity based on different expiration times.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/07 - Validation of SDK CRUD Flows with Widgets with Mandatory Configuration.feature'>07 - Validation of SDK CRUD Flows with Widgets with Mandatory Configuration.feature</a></b></td>
								<td>- Validates CRUD operations for SDK widgets with mandatory configuration via UI and API<br>- Covers creating, updating, and deleting flows, ensuring data integrity across both levels.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/10 - Validation of Builder CRUDs with Buttons and Widgets enabled through Central Services Clients API.feature'>10 - Validation of Builder CRUDs with Buttons and Widgets enabled through Central Services Clients API.feature</a></b></td>
								<td>- Validates Builder services by enabling buttons and widgets through Central Services API, ensuring proper functionality on UI and API calls<br>- Tests scenarios for different button and widget configurations, confirming correct behavior and API interactions.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/05 - Validation of SDK customization and CRUDs.feature'>05 - Validation of SDK customization and CRUDs.feature</a></b></td>
								<td>- Validate CRUD operations and SDK customizations via API and UI, ensuring color options, button roundness, and dark themes are correctly displayed and saved<br>- The scenarios cover editing, previewing, creating, updating, and saving SDK customizations, with validations through both UI and API.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/01 - Builder and Landing Basic Functionalities.feature'>01 - Builder and Landing Basic Functionalities.feature</a></b></td>
								<td>Validate various user interactions and functionalities in Builder, including login/logout, tutorial flows, landing and SDK buttons, tag selection, search field behavior, Design Studio display, SDK version validation, and owner/user role permissions.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/03 - Validation of Landing Community Templates.feature'>03 - Validation of Landing Community Templates.feature</a></b></td>
								<td>- Validate and play various landing templates through UI and API, ensuring specific properties are met<br>- This feature focuses on creating, playing, and verifying different types of landings like Onboarding, Forms, and Video Contracting<br>- It ensures seamless user interactions with the platform's diverse landing templates.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/04 - Validation of Landing Actions and other Regressions.feature'>04 - Validation of Landing Actions and other Regressions.feature</a></b></td>
								<td>- Validate Landing Actions and Regressions through UI and API<br>- Includes scenarios for QR code testing, Query Selector validation, and actions like Publish, Unpublish, Duplicate, and Delete<br>- Also covers bug fixes for SelphID country arrays<br>- This file ensures comprehensive testing and validation of various landing page functionalities.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/08 - Validation of Tags associated with Landings and SDKs.feature'>08 - Validation of Tags associated with Landings and SDKs.feature</a></b></td>
								<td>- Facilitates validation of tags for mobile SDKs and Landings via API and UI<br>- Allows users to search, add, and remove tags, validating changes through both interfaces<br>- Enhances user experience by ensuring seamless tag management within the Builder platform.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/02 - Design Studio basics and CRUDs.feature'>02 - Design Studio basics and CRUDs.feature</a></b></td>
								<td>- Validates Builder and SDK user flows by testing Design Studio widgets creation, updates, and validations via API and UI<br>- Covers scenarios for creating and viewing Landing and SDK flows, ensuring successful creation and validation<br>- Deletes occur at the API level post-test.</td>
							</tr>
							</table>
							<details>
								<summary><b>08 - Validation of Tags associated with Landings and SDKs</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/08 - Validation of Tags associated with Landings and SDKs/08 - Validation of Tags associated with Landings and SDKs.js'>08 - Validation of Tags associated with Landings and SDKs.js</a></b></td>
										<td>- Validates tags associated with Landings and SDKs by performing login, searching, adding, and removing tags<br>- Verifies tag presence through UI and API, ensuring proper functionality and visibility<br>- Supports testing and validation of tag-related features within the project's end-to-end testing suite.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>06 - Validation of SDK and Landing CRUDs with Happy Paths</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/06 - Validation of SDK and Landing CRUDs with Happy Paths/06 - Validation of SDK and Landing CRUDs with Happy Paths.js'>06 - Validation of SDK and Landing CRUDs with Happy Paths.js</a></b></td>
										<td>- Summary:
The provided code file implements end-to-end tests using Cypress and Cucumber for validating SDK and Landing CRUD operations with happy paths in the project's architecture<br>- It leverages predefined steps for login and flow creation, ensuring smooth execution and verification of key functionalities<br>- The file enhances the project's testing suite by automating scenario validations and maintaining test context for comprehensive testing coverage.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>02 - Design Studio basics and CRUDs</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/02 - Design Studio basics and CRUDs/02 - Design Studio basics and CRUDs.js'>02 - Design Studio basics and CRUDs.js</a></b></td>
										<td>- Facilitates end-to-end testing of Design Studio functionalities by simulating user interactions to create various types of flows with widgets<br>- Validates successful creation and customization of flows via UI and API<br>- Ensures proper functionality and integration of SDK widgets for Android and iOS platforms<br>- Maintains a structured approach to testing and verifying key features within the Design Studio environment.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>09 - Validation of Landing Unique URL and Time Validity</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/09 - Validation of Landing Unique URL and Time Validity/09 - Validation of Landing Unique URL and Time Validity.js'>09 - Validation of Landing Unique URL and Time Validity.js</a></b></td>
										<td>- Implements validation of landing URL uniqueness and time validity by interacting with Hasura database and executing API calls<br>- Handles insertion of various data fixtures and test context management<br>- Supports testing scenarios for Builder login and different time validity checks.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>07 - Validation of SDK CRUD Flows with Widgets with Mandatory Configuration</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/07 - Validation of SDK CRUD Flows with Widgets with Mandatory Configuration/07 - Validation of SDK CRUD Flows with Widgets with Mandatory Configuration.js'>07 - Validation of SDK CRUD Flows with Widgets with Mandatory Configuration.js</a></b></td>
										<td>- Validate and create SDK flows with widgets, ensuring mandatory configurations are set<br>- Login to Builder, select widgets, fill mandatory fields, save the flow, and validate through UI and API<br>- Delete flows, confirm deletion, and save flows<br>- This code file orchestrates end-to-end testing of SDK CRUD flows with widgets and mandatory configurations, crucial for maintaining application integrity.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>10 - Validation of Builder CRUDs with Buttons and Widgets enabled through Central Services Clients API</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/10 - Validation of Builder CRUDs with Buttons and Widgets enabled through Central Services Clients API/10 - Validation of Builder CRUDs with Buttons and Widgets enabled through Central Services Clients API.js'>10 - Validation of Builder CRUDs with Buttons and Widgets enabled through Central Services Clients API.js</a></b></td>
										<td>- The provided code file is responsible for validating Builder CRUD operations with buttons and widgets enabled through the Central Services Clients API in an end-to-end testing scenario using Cypress and Cucumber<br>- It sets up test steps for logging in with a user having 'Mobile SDK Android' enabled on Central Services and verifies the presence of specific buttons on the homepage while validating API calls<br>- The file ensures the smooth execution of these test cases within the project's testing framework.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>05 - Validation of SDK customization and CRUDs</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/05 - Validation of SDK customization and CRUDs/05 - Validation of SDK customization and CRUDs.js'>05 - Validation of SDK customization and CRUDs.js</a></b></td>
										<td>- Validate SDK customization and CRUD operations through UI and API calls<br>- The code file orchestrates login, color customization, theme mode toggling, and flow updates in the Builder platform<br>- It ensures seamless validation of SDK features and interactions, reflecting changes visually and confirming them via API responses.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>03 - Validation of Landing Community Templates</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/03 - Validation of Landing Community Templates/03 - Validation of Landing Community Templates.js'>03 - Validation of Landing Community Templates.js</a></b></td>
										<td>- Validate and insert various configurations, workflows, media, themes, modules, and landings into Hasura before and after each test scenario<br>- Implement login and specific property checks for different types of landing pages via API calls<br>- This file sets up and verifies landing page properties for different scenarios in the project's end-to-end testing suite.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>04 - Validation of Landing Actions and other Regressions</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/04 - Validation of Landing Actions and other Regressions/04 - Validation of Landing Actions and other Regressions.js'>04 - Validation of Landing Actions and other Regressions.js</a></b></td>
										<td>- The code file validates and interacts with various landing configurations, workflows, media, themes, modules, and URLs through API calls<br>- It covers actions like creating, publishing, duplicating, and deleting landing pages, ensuring UI and API responses align<br>- Additionally, it includes regression tests for specific scenarios related to dropdown countries and HTML code properties.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>01 - Builder and Landing Basic Functionalities</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/facephi/identity-platform-builder-qa/blob/master/cypress/e2e/cucumber/01 - Builder and Landing Basic Functionalities/01 - Builder and Landing Basic Functionalities.js'>01 - Builder and Landing Basic Functionalities.js</a></b></td>
										<td>- The provided code file in the project's Cypress test suite focuses on testing the basic functionalities of the Builder and Landing pages using Cucumber syntax<br>- It defines test steps for actions like opening the login page, entering valid credentials, and verifying successful login in both the UI and API<br>- The file contributes to ensuring the functionality and user experience of the Builder and Landing pages are working as expected within the project's test automation framework.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with identity-platform-builder-qa, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Yarn
- **Container Runtime:** Docker


###  Installation

Install identity-platform-builder-qa using one of the following methods:

**Build from source:**

1. Clone the identity-platform-builder-qa repository:
```sh
❯ git clone https://github.com/facephi/identity-platform-builder-qa.git
```

2. Navigate to the project directory:
```sh
❯ cd identity-platform-builder-qa
```

3. Install the project dependencies:


**Using `yarn`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Yarn-2C8EBB.svg?style={badge_style}&logo=yarn&logoColor=white" />](https://yarnpkg.com/)

```sh
❯ yarn
```


**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker build -t facephi/identity-platform-builder-qa .
```




###  Usage
Run identity-platform-builder-qa using the following command:

**Using `yarn`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Yarn-2C8EBB.svg?style={badge_style}&logo=yarn&logoColor=white" />](https://yarnpkg.com/)

```sh
❯ yarn cy run
```


**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker run -it {image_name}
```


###  Testing in GUI
Run the test suite using the following command:


**Using `yarn`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Yarn-2C8EBB.svg?style={badge_style}&logo=yarn&logoColor=white" />](https://yarnpkg.com/)

```sh
❯ yarn co
```
---

##  Contributing

- **💬 [Join the Discussions](https://github.com/facephi/identity-platform-builder-qa/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/facephi/identity-platform-builder-qa/issues)**: Submit bugs found or log feature requests for the `identity-platform-builder-qa` project.
- **💡 [Submit Pull Requests](https://github.com/facephi/identity-platform-builder-qa/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/facephi/identity-platform-builder-qa
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

---

##  License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- Ask me for the cypress.env.json file that's not versioned through [Keeper](https://keepersecurity.eu/vault/#).

---
