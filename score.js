#! /usr/local/bin/node
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const players = [];
const scores = [];

function displayScores () {
  const logTable = [];
  for (let i = 0; i < players.length; i++) {
    logTable.push({player: players[i], score: scores[i]});
  }
  console.table(logTable);
}

function readPromise(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (inputValue) => resolve(inputValue));
  });
}

async function registerPlayers () {
  let condition = false;
  while (condition === false) {
    const name = await readPromise(`Player  ${players.length + 1}: `);
    if (name === '') {
      condition = true;
      return;
    }
    players.push(name);
  }
}

async function registerScores () {
  let condition = false;
  let counter = 0;
  players.forEach(p => scores.push(0));
  while (condition === false) {
    const score = await readPromise(`${players[counter]} scores: `);
    if (score === '') {
      condition = true;
      rl.close();
      return;
    }
    scores[counter] += parseInt(score);
    displayScores();
    counter >= players.length - 1 ? counter = 0 : ++counter;
  }
}

registerPlayers().then(() => registerScores());

rl.on('close', () => {
  console.log('\nRESULTS:');
  displayScores();
  process.exit(0);
});