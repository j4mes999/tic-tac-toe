export function createPlayer  (firstName, lastName, age){
    firstName,
    lastName,
    age,
    function fullName(){
        return `${this.firstName} ${this.lastName}, age: ${age}`;
    }

    let gamesWon = 0;
    const incGamesWon = () => gamesWon++;
    const getGamesWon = () => gamesWon;

    return {firstName, incGamesWon, getGamesWon};
}

