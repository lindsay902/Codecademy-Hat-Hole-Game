
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let currentlyPlaying = true;

class Field {
  constructor(field) {
    this._field = field;
    this._y = 0;
    this._x = 0;
  }

  static generateField(height, width, percentage) {
    const fieldArray = [];

    for (let row = 0; row < height; row++) {
      const rowArray = [];

      for (let column = 0; column < width; column++) {
        const generatedNum = Math.random() * 100;

        if (generatedNum < percentage) {
          rowArray.push(hole);
        } else {
          rowArray.push(fieldCharacter);
        }
      }

      fieldArray.push(rowArray);
    }
    
    // get a random row, assign it to a var
    const randomRow = Math.floor(Math.random() * width);
    // get a random column, assign it to a var 
    let randomColumn = Math.floor(Math.random() * height);
    // if the random row, column combo was [0, 0]
    if (randomRow === 0 && randomColumn == 0) {
    // make the random column a 1 instead 
      randomColumn = 1;
    }
    
    // reassign the fieldArray element of that coordinate to be a hat instead of whatever it was before
    fieldArray[randomRow][randomColumn] = hat;
    
    fieldArray[0][0] = pathCharacter;
    
    return fieldArray;
  }

  get field() {
    return this._field.join('');  
    }
  

  print() {
    return this._field.join('\n');
  }


  askPlayer() {
    let userInput = prompt('What is your next move? ');
    switch(userInput.toLowerCase()) {
      case 'u':
          console.log('Moving up');
          this._y -= 1;
          break;
      case 'd':
          console.log('Moving down');
          this._y += 1;
          break;
      case 'l':
          console.log('Moving left');
          this._x -= 1;
          break;
      case 'r':
          console.log('Moving right');
          this._x += 1;
          break;
    }
  }
   
  checkWin() {
    let playerPosition = this._field[this._y][this._x]; 
    switch(playerPosition) {
    case hole:
      console.log('You lose - You fell in a hole!');
      currentlyPlaying = false;
    case undefined:
        console.log('You lose - Out of boundary');
        currentlyPlaying = false;
        break;
    case hat:
        console.log('You win - You found the hat!');
        currentlyPlaying = false;
        break;
    case fieldCharacter:
        console.log('Keep looking for the hat...');
        this._field[this._y][this._x] = pathCharacter;
        //console.log(this._field);
        break;
    case pathCharacter:
        console.log('You are stepping on *');
        break;
    }
  }
}

const randomField = Field.generateField(5, 5, 25);

//console.log(randomField);

/*const myField = new Field([[]]);

//console.log(myField); */
const myField = new Field(randomField);

//console.log(myField.print());
/*
const myField = new Field([
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter],
]);  */


const game = () => {
  while (currentlyPlaying) {
    console.log(myField.print());
    myField.askPlayer();
    myField.checkWin();
    }
  console.log('Game Over!');
}

game();
