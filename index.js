#!/usr/bin/env node
let exec = require('child_process').exec;
const cliProgress = require('cli-progress');
const inquirer = require('inquirer');
// const axios = require('axios');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
let child;
let nameData;
const questions = [
  {
    type: 'input',
    name: 'name',
    message: "Deploy or Remove ?\nFor Deploy type 'deploy'\nFor Remove type 'remove'\nFor Serverless offline type 'offline'\n",
  },
];

(async ()=>{
    let inputFunction = await inquirer.prompt(questions).then(answers => {
        nameData = answers.name;
        nameData = nameData.toLowerCase();
          console.log(`You Choose ${answers.name}!`);
          console.log(nameData);
        if(nameData !== 'deploy' && nameData !== 'remove' && nameData !== 'offline'){
            console.log('Please choose deploy, remove or offline');
            inputFunction();
        }
        });
    if(nameData == 'deploy' || nameData == 'remove' || nameData == 'offline'){
        bar1.start(100, 0);
        let i = 0;
        setInterval(() =>{
            bar1.update(i+=1, {
                speed: '10%',
            });
        }, 1500);
        child = exec(`sls ${nameData} --stage=dev --param="test= "`,
            function (error, stdout, stderr) {
                bar1.update(100);
                bar1.stop();
                console.log('Success Message: ' + stdout);
                console.log('Error From Cli Execution: ' + stderr);
                if (error !== null) {
                    console.log('Exec Error: ' + error);
                }
        });
    }
})();



// inquirer
//   .prompt([
//     {
//       type: "question",
//       name: "pokemonName",
//       message: "Name of pokemon",
//       default: "pikachu"
//     }
//   ])
//   .then(async (answers) => {
//     try {
//       const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${answers.pokemonName}`)
//       console.log(res.data.types.map(type => type.type.name));
//     } catch (err) {
//       console.log("Pokemon not found, try again");
//     }
//   })