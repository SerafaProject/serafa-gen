#!/usr/bin/env node
import Inquirer from 'inquirer'
import fs from 'fs'

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Por favor, forneça um comando. Ex: seu-cli create');
  process.exit(1);
}

const command = args[0];

const createOptions = [
  'Project',
  'Package',
  'Model',
  'UseCase',
  'Controller',
];

console.log(process.argv0)
if (command === 'create') {
  Inquirer.prompt({
    type: 'list',
    name: 'value',
    message: 'Escolha uma opção:',
    choices: createOptions,
  },)
    .then(genOptionAnswer => {
      console.log(`You chose: ${genOptionAnswer.value}`);
      if (genOptionAnswer.value === "Package") {
        Inquirer.prompt({
          type: 'input',
          name: "name",
          message: `${genOptionAnswer.value} name:`
        }).then((res) => {
          const name = res.name
          console.log(name)
        })
      }
    })
    .catch(error => console.error(error));
} else if (command === 'init') {
  Inquirer.prompt({
    type: "input",
    name: "projectName",
    message: "Project name"
  }).then((projectNameRes) => {
    console.log(`Project name: ${projectNameRes.projectName}`)
    const filesStructure = [
      projectNameRes.projectName,
      `${projectNameRes.projectName}/application`,
      `${projectNameRes.projectName}/middlewares`
    ];
    // Itera sobre a estrutura de pastas e cria cada uma delas
    filesStructure.forEach(pasta => {
      const folderPath = pasta
      // Verifica se a pasta já existe
      if (!fs.existsSync(folderPath)) {
        // Cria a pasta
        fs.mkdirSync(folderPath);
      } else {
        console.log(`The path '${pasta}' already exists.`);
      }
    });
    console.log("Created Successfully")
  })
} else {
  console.log("Comando não reconhecido")
}