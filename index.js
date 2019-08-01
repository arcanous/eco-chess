#!/usr/bin/env node
const _ = require('lodash');
const inquirer = require('inquirer');
const chalk = require('chalk');
const FULL = require('./tree-with-moves.json');
let TESTGROUPS = {};
let TESTSET = [];
let STATS = {};

const askForMove = () => {

  const { name, rightMoves } = TESTSET[Math.floor(Math.random() * TESTSET.length)];

  inquirer.prompt({
    type: 'input',
    name: 'moves',
    message: name
  })
  .then(({ moves }) => {
    if (moves !== rightMoves) console.log(chalk.inverse(rightMoves));
    askForMove();
  });
};

const start = () => {

  TESTGROUPS = Object.keys(FULL);

  inquirer.prompt({
    type: 'checkbox',
    message: 'Select groups',
    name: 'groups',
    default: TESTGROUPS,
    choices: TESTGROUPS,
  }).then(({ groups }) => {
    TESTGROUPS = groups;

    return inquirer.prompt({
      type: 'checkbox',
      message: 'Select levels',
      name: 'set',
      default: ['1'],
      choices: ['1', '2', '3', '4', '5', '6', '7', '8', 'All'],
    })
  }).then(({ set }) => {
    assembleTestSet(set.map(s => parseInt(s, 10) || 'All'));

    const setItems = TESTSET.map(i => i.name);

    return inquirer.prompt({
      type: 'checkbox',
      message: `Select of ${setItems.length} test items`,
      name: 'setitems',
      default: setItems,
      choices: setItems,
    })
  }).then(({ setitems }) => {

    TESTSET = TESTSET.filter(i => setitems.includes(i.name));
    STATS = _.reduce(STATS, (acc, val, level) => {
      val = val.filter(i => setitems.includes(`(${level}) ${i.name}`));

      if (val.length) {
        acc[level] = val
      }

      return acc;
    }, {});

    displayStats();
    askForMove();
  });
};

start();

const assembleTestSet = (set) => {
  const extractFromLevel = (tree, level = 1, parent = '') => Object.keys(tree)
    .filter(k => k !== 'name' && k !== 'moves')
    .forEach(key => {
      const val = tree[key];
      if ((set.includes(level) || set.includes('All')) && val.name && val.moves) {

        const name = `${key} ${val.name}`;
        const moves = val.moves;

        TESTSET.push({
          name: `(${level}) ${name}`,
          rightMoves: moves
        });
        if (Array.isArray(STATS[level])) {
          STATS[level].push({name, moves, parent });
        } else {
          STATS[level] = [{name, moves, parent }];
        }
      }

      extractFromLevel(val, level + 1, `${key} ${tree[key].name}`.padEnd(65) + `${tree[key].moves}`);
    });

  extractFromLevel(_.pick(FULL, TESTGROUPS));

};

const displayStats = () => {
  console.log(`\n\n===========\nTesting on ${TESTSET.length} items`);
  _.forEach(STATS, (items, level) => {
    console.log(`\nLEVEL ${level}\n`);
    let lastParent = '';
    items.forEach(({ name, moves, parent }) => {
      if (parent !== lastParent) {
        console.log(`${chalk.blueBright(parent)}`);
      }
      lastParent = parent;
      console.log((level > 1 ? '  ' : '') + `${chalk.yellow(name)}`.padEnd(level > 1 ? 73 : 75) + chalk.green(`${moves}`));
    });
  });
};
