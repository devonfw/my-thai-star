const cypress = require('cypress');
const fse = require('fs-extra');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

const runTests= async ()=>{
  await fse.remove('mochawesome-report');
  await fse.remove('cypress/report');
  const {totalFailed} = await cypress.run();
  const reporterOptions = {
    files: ["cypress/report/*.json"]
  };
  await generateReport(reporterOptions);
};
const generateReport = (options)=> {
  return merge(options).then((jsonReport)=>{
    generator.create(jsonReport).then(()=>{
      process.exit();
    });
  });
};

runTests()