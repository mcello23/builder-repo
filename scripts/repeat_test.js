const { exec } = require('child_process');

const repetitions = 5;

function runCypressTest(iteration) {
  if (iteration >= repetitions) {
    cy.log('All testes were executed successfully.');
    return;
  }

  cy.log(`Executing test ${iteration + 1} of ${repetitions}...`);

  exec('yarn cy run', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      console.error(`stderr: ${stderr}`);
      console.error(`stdout: ${stdout}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    cy.log(`stdout: ${stdout}`);
    runCypressTest(iteration + 1);
  });
}

runCypressTest(0);
