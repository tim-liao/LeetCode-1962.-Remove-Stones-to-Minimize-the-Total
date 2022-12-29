"use strict";

var minStoneSum = function (piles, k) {
  ////有先以隨便一組piles和k去把每個值寫出來，發現會按照一個規律去循環，因此想出此寫法
  //先把piles從大到小排列
  piles.sort(function (a, b) {
    return b - a;
  });
  //console.log(piles);
  let pilesDecrease = piles;

  let loopArray; //因為發現會以一個規律循環進行，故以一個陣列紀錄加入循環行列的pilesDecrease陣列索引值
  let loopArrayLoopingIndex; //循環每次會跟著下方的while loop走，因此需要一個變數來記錄目前循環進行到哪裡
  let minPDNotAddInLoopArrayIndex = 0; //紀錄還未被加進循環迴圈內的pilesDecrease陣列中最大值的索引（因為按照遞減順序排列，此時索引會還沒被加進來的最小索引值），此時是第0位
  const arrayLooping = function () {
    //設定一個函式讓while loop每進入一次時，循環向前走一格
    if (loopArrayLoopingIndex == loopArray.length - 1) {
      loopArrayLoopingIndex = -1;
    }
    loopArrayLoopingIndex++;
  };
  const halfNumberRoundUpToInteger = function (maxNumberNow) {
    //設定一函式在得知該while loop最大值時，須將該最大值除以2並無條件進位到整數
    maxNumberNow = maxNumberNow - Math.floor(maxNumberNow / 2);
  };

  ////////此前循環尚未有任何值，進行任何賦值也未有意義，因此在此先手動進行第一圈，使得循環陣列內有值產生，也使得while loop進行時有意義。這時因為已將piles遞減排列過成pilesDecrease，第一個進入循環的一定是pilesDecrease[0]，同時循環索引因而有第0位，而minPDNotAddInLoopArrayIndex更從0變成１
  loopArray = [0];
  loopArrayLoopingIndex = 0;
  minPDNotAddInLoopArrayIndex = 1;
  halfNumberRoundUpToInteger(pilesDecrease[0]);
  //pilesDecrease[0] = pilesDecrease[0] - Math.floor(pilesDecrease[0] / 2);
  k--;
  //////////

  while (k > 0) {
    arrayLooping();
    if (
      //若還未進入循環的最大值已經比目前進行到的循環值還大時
      pilesDecrease[minPDNotAddInLoopArrayIndex] >
      pilesDecrease[loopArray[loopArrayLoopingIndex]]
    ) {
      //此時需要將目前pilesDecrease陣列中還未進入循環的最大值紀錄進循環，同時也因為是目前pilesDecrease陣列中最大值，因此需要將其除2
      loopArray.splice(loopArrayLoopingIndex, 0, minPDNotAddInLoopArrayIndex);
      //進行到此時，pilesDecrease[minPDNotAddInLoopArrayIndex]（簡稱PDNoInMin）即代表：
      //1.是目前pilesDecrease陣列中最大值
      //2.是目前尚未進入循環的最大值
      //3.是目前未進入的值中，最靠近此時循環遍歷至此的值（即pilesDecrease[loopArray[loopArrayLoopingIndex]]，簡稱LPNow）
      //4.此時PDNoInMin略大於LPNow，現在無其他值略大於LPNow，若之後PDNoInMin/2一樣也會略大於LPNow/2，因此加進循環後兩值循環時的相對位置不會改變
      let maxNumberNow = pilesDecrease[minPDNotAddInLoopArrayIndex];
      halfNumberRoundUpToInteger(maxNumberNow);
      //maxNumberNow = maxNumberNow - Math.floor(maxNumberNow / 2);
      minPDNotAddInLoopArrayIndex++;
      console.log(loopArray);
      console.log(`if, k = ${k}`);
      //loopArrayLoopingIndex--; //因為此時原本的index被推到下一位，所以這邊不用做回到前一位的動作
    } else {
      //1.若還未進入循環的最大值已經比目前進行到的循環值還小時，此時最大值仍然在循環內，因此只將此最大值除２，
      //2.所有pilesDecrease陣列內部的值都已經被記錄到循環時，已經無法將其他值加進來時，minPDNotAddInLoopArrayIndex已無意義，此後就只要跑循環即可，不需要做其他動作
      //3.因為1.和2.雖原因不同，但結果所需進行動作相同，故將其合併到此
      let maxNumberNow = pilesDecrease[loopArray[loopArrayLoopingIndex]];
      halfNumberRoundUpToInteger(maxNumberNow);
      //maxNumberNow = maxNumberNow - Math.floor(maxNumberNow / 2);
      console.log(`else, k = ${k}`);
    }
    k--;
  }
  console.log(pilesDecrease);
  let pilesDecreaseTotal = 0;
  for (let i = 0; i < pilesDecrease.length; i++) {
    pilesDecreaseTotal = pilesDecreaseTotal + pilesDecrease[i];
  }
  return pilesDecreaseTotal;
};
//minStoneSum([123123, 123, 123123, 123, 456456, 87845, 241654, 48592, 456], 9);
