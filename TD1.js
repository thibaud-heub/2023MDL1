// Import modules
const fs = require("fs");
const inquirer = require("inquirer");

// Return content of users.json
function getUsers() {
    const rawdata = fs.readFileSync("users.json");
    const users = JSON.parse(rawdata);
    return users
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

    return countList;
}

async function main() {

    // Load content of users.json
    const users = getUsers();

    // Loop until user wants to quit
    let done = false;
    // eslint-disable-next-line no-constant-condition
    while (!done) {

        // Display menu
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

            // Create the counterList of the selected attribute
            const countList = createCountList(users, answers.attribute);

            // Sort in descending order the list
            countList.sort((a, b) => b.count - a.count);

            // Display the list as a table
            console.table(countList);
        });
    }
}

main();