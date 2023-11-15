import { boardModel } from "./GameBoard.js";
export const WINNER = 'winner';
export const TIE = 'tie';

export function checkGameFlow(){
    //check for winner
    if (checkVerticalPositions() || checkHorizontalPositions() || checkDiagonalPositions() ){
      return WINNER
    }else if(isTie()){
      return TIE;
    }
  
  }
  
  function isTie(){
    //Check for nulls
    let noNullCells = false;
    for (let row of boardModel ){
      if (row.every( e => e != null)) {
        noNullCells = true;
      }else {
        noNullCells = false;
        break;
      }
    }
    return noNullCells;
  
  }
  
  function checkVerticalPositions(){
  
    let flag = false;
    for (let i = 0; i < 3; i++){
      for(let j = 0; j < 2; j++ ){
        if(boardModel[j][i] != null && boardModel[j][i] === boardModel[j + 1][i]){
          flag = true;
        }else{
          flag = false;
          break; 
        }  
      }
      if(flag){
        flag = true;
        break;
      }
    }
  
    return flag;
  }
  
  function checkHorizontalPositions(){
  
    for (let row of boardModel ){
      if (row.every( e => e != null && e === row[0])) {
        return true;
      }
    }
    return false;
  
  }
  
  function checkDiagonalPositions(){
    if(boardModel[0][0] != null && boardModel[0][0] === boardModel[1][1] && boardModel[0][0] == boardModel[2][2]){
      return true;
    }else if(boardModel[0][2] != null && boardModel[0][2] === boardModel[1][1] && boardModel[0][2] == boardModel[2][0]){
      return true;
    }
  
  }