#!/usr/bin/env node
import Yargs from 'yargs'
import Inquirer from 'inquirer'
import fs from 'fs'

const filesStructure = [
  'serafa-gen',
  'serafa-gen/application',
  'serafa-gen/middlewares'
];
// Itera sobre a estrutura de pastas e cria cada uma delas
filesStructure.forEach(pasta => {
  const caminhoPasta = pasta

  // Verifica se a pasta já existe
  if (!fs.existsSync(caminhoPasta)) {
    // Cria a pasta
    fs.mkdirSync(caminhoPasta);
    console.log(`Pasta '${pasta}' criada com sucesso.`);
  } else {
    console.log(`A pasta '${pasta}' já existe.`);
  }
});

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Por favor, forneça um comando. Ex: seu-cli create');
  process.exit(1);
}

const command = args[0];

const genOption = [
  'Project',
  'Package',
  'Model',
  'UseCase',
  'Controller',
];

const steps = [

];

console.log(process.argv0)
if (command === 'create') {

  Inquirer.prompt({
    type: 'list',
    name: 'value',
    message: 'Escolha uma opção:',
    choices: genOption,
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
} else {
  console.log("Comando não reconhecido")
}