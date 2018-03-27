#!/usr/bin/env node

const path = require('path');

const fse = require('fs-extra');
const chalk = require('chalk');
const commander = require('commander');
const Confirm = require('prompt-confirm');

const packageJson = require('./package.json');

const program = new commander.Command(packageJson.name)
.version(packageJson.version)
.usage('[options]')
.option('-p, --public [value]', 'path to public folder with the manifest file')
.parse(process.argv);

const publicFolder = path.resolve(program.public || 'public');
const publicFiles = fse.readdirSync(publicFolder);

if(publicFiles.indexOf('manifest.json') === -1) {
  console.log(chalk.red('There must be a manifest.json file in the public folder'));
  process.exit(1);
}

Promise.resolve()
.then(checkOverwriteFile.bind(null, publicFiles, 'background.js'))
.then(checkOverwriteFile.bind(null, publicFiles, 'entry.js'))
.then(() => {
  copyFile(publicFolder, 'background.js');
  copyFile(publicFolder, 'entry.js');

  const manifestJson = fse.readFileSync(path.join(publicFolder, 'manifest.json'));
  const manifest = JSON.parse(manifestJson);

  const newManifest = {
    manifest_version: 2,
    version:          '1.0.0',
    short_name:       manifest.short_name,
    name:             manifest.name,
    background:       {
      scripts:    ['background.js'],
      persistent: true,
    },
    web_accessible_resources: ['index.html'],
    browser_action:           {
      default_icon: 'favicon.ico',
    },
    permissions: [
      '*://*/*',
    ],
  };

  fse.writeFileSync(
    path.join(publicFolder, 'manifest.json'),
    JSON.stringify(newManifest, null, 2)
  );
});

function checkOverwriteFile(publicFiles, filename) {
  if(publicFiles.indexOf(filename) !== -1) {
    const prompt = new Confirm({ name: filename, message: `Overwrite ${filename} file?`, default: false });

    return prompt.run()
    .then((answer) => {
      if(!answer) process.exit(0);
    });
  }

  return Promise.resolve();
}

function copyFile(publicFolder, filename) {
  try {
    const copyFilepath = path.resolve(__dirname, 'templates', filename);
    const outputFilepath = path.join(publicFolder, filename);

    fse.copySync(copyFilepath, outputFilepath);
  } catch(err) {
    console.log(chalk.red(`There was an error copying ${filename}`));
    console.log(err);

    process.exit(1);
  }
}
