import inquirer from 'inquirer';

const takePlayerInput = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'direction',
      message: 'Where do you want to go?',
      choices: ['up', 'right', 'left', 'down'],
    },
  ]);
  return answer.direction;
};

export { takePlayerInput };
