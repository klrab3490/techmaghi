import { log } from 'console';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => {
    return new Promise((resolve) => {
        rl.question(query, (answer) => resolve(answer));
    });
};

const calcAverage = async (number, player) => {
    let sum = 0;
    for (let index = 1; index <= number; index++) {
        let score = await askQuestion(`Enter ${player} Score ${index}: `);
        sum += parseInt(score);
    }
    return sum / number;
};

const checkWinner = (scoreDolphins, scoreKoalas) => {
    if (scoreDolphins > scoreKoalas) {
        console.log("\nDolphins win the trophy");
    } else if (scoreDolphins < scoreKoalas) {
        console.log("\nKoalas win the trophy");
    } else {
        console.log("\nBoth win the trophy");
    }
};

const main = async () => {
    console.log("Welcome to the Dolphins vs Koalas game! \n");
    // Get the average score for both teams
    console.log("Enter Scores Dolphins:\n");
    let scoreDolphins = await calcAverage(3, "Dolphins");
    console.log(`\nGetting average scores...\nDolphins average score: ${scoreDolphins} \n Enter Scores Koalas:\n`);
    let scoreKoalas = await calcAverage(3, "Koalas");
    console.log(`\nGetting average scores...\nKoalas average score: ${scoreKoalas} \n \n Checking For Winners`);

    checkWinner(scoreDolphins, scoreKoalas);
    rl.close();
    process.exit(0);
};

main();
