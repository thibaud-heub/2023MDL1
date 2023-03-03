// Import modules
const fs = require("fs");
const inquirer = require("inquirer");

// Return content of users.json
function getUsers() {
    const rawdata = fs.readFileSync("users.json");
    const users = JSON.parse(rawdata);
    return users;
}

// Display menu
async function menu(users) {

    // Loop until user wants to quit
    let done = false;
    // eslint-disable-next-line no-constant-condition
    while (!done) {
        await inquirer.prompt({
            type: "list",
            name: "attribute",
            message: "What do you want to show?",
            choices: ["Company", "Country", new inquirer.Separator(), "Quit"],
            filter(val) {
                return val.toLowerCase();
            }
        }).then((answers) => {

            // Quit if Quit is selected
            if (answers.attribute == "quit") {
                done = true;
                return;
            }
            const countList = createCountList(users, answers.attribute);
            displayCountList(countList);
        });
    }
}

// Create a list with the number of occurrences of each attribute value in users
function createCountList(users, attribute) {
    const countList = [];
    let countListIndex;

    for (const user of users) {
        countListIndex = countList.findIndex((element) => element[attribute] === user[attribute]);
        if (countListIndex === -1) {
            countList.push({ [attribute]: user[attribute], count: 1 }); // Push if not already in the list
        } else {
            countList[countListIndex].count += 1; // Increase counter if already in the list
        }
    }
    countList.sort((a, b) => b.count - a.count);

    return countList;
}

// Display countList as a table
function displayCountList(countList) {
    console.table(countList);
}

function main() {
    const users = getUsers();
    menu(users);
}

main();