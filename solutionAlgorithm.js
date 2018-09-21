//credit to https://cosmosmagazine.com/mathematics/how-solve-magic-square
//for mathematical solution to magic square problems!

//returns solved matrix based on target number
function solved(targetNum) {
  //base case: if targetNum is 34
  var if34 = [
    8, 11, 14, 1,
    13, 2, 7, 12,
    3, 16, 9, 6,
    10, 5, 4, 15
  ];
  if (targetNum == 34) {
    return (if34);
  }
  //if targetNum is not 34
  else {
    //set final array to base case array (if34) as placeholder
    var final = if34;
    //compute values for computations during solving
    var base = targetNum - 34;
    var quotient = Math.floor(base / 4);
    var remainder = base - (quotient * 4);
    var qAndR = quotient + remainder;

    //for each element in final array, compute new cell values based
    //on targetNum to return a final (solved) array--a Magic Square
    for (var i = 0; i < final.length; i++) {
      var cell = final[i];
      if (cell == 13 || cell == 14 || cell == 15 || cell == 16) {
        final[i] += qAndR;
      } else {
        final[i] += quotient;
      };
    };
    return (final);
  };
};
