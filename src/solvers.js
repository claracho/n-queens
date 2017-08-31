/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var oldN = n;
  var solution = []; // solution continas all the valid matrices of 0s and 1s for n Rooks
  
  // we can use permutation to find out how many ways n rooks can be placed in a n x n matrix 
  // since rooks cannot be horizontally or diagonally exist together
  // their row index and column index must be unique for a solution to be valid 
  // this can then be simplified into a permutation problem with n! solutions
  var permute = function(n, input = []) {
    // base case, push result to solution
    if (n === 0) {
      var matrix = [];
      input.forEach(function(val) {
        // convert val (corresponds to column index of rook at row i) to [1, 0, 0] format
        var row = [];
        for (var i = 0; i < oldN; i++) {
          if (val === i) {
            row.push(1);
          } else {
            row.push(0);
          }
        }
        matrix.push(row);
      });
      solution.push(matrix);
    // recursive case
    } else if (n > 0) {
      for (var i = 0; i < oldN; i++) {
        // only recurse if i is not already contained in input array
        // this allows us find solutions that contain unique values
        if (!input.includes(i)) {
          permute(n - 1, input.concat(i));
        }
      }
    }
  };

  permute(n);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution[0]));

  // for all solutions, return solution
  // return solution;

  // for one solution, return solution[0]
  return solution[0];

  // SIMPLE VERSION
  // var mx = new Array(n);
  // for (var i = 0; i < mx.length; i++) {
  //   mx[i] = new Array(n);
  // }
  // mx.forEach(e => e.fill(0));
  // for (var i = 0; i < n; i++) {
  //   mx[i][i] = 1;
  // }
  // return mx;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  // there are n^2 ways to place the first rook in n x n matrix, (n-1)^2 ways to place the second rook in n-1 by n-1 slots
  // that do not create conflict with the first rook, and so on, so in total we have (n^2)*((n-1)^2)*((n-2)^2)*...*(1^2) ways
  // to place n rooks in n x n matrix.  However, since the rooks are indistinguishable, we have duplicate solutions, so we
  // we divide them by n! which is the number of ways you can place n in a line if they are distinguishable.  The solution 
  // then becomes n!.

  // efficient implementation of calculating n!
  var factorial = function(n) {
    if (n === 0) {
      return 1;
    }
    return n * factorial(n - 1);
  };
  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

  // LONGER VERSION using permutation
  // var oldN = n;
  // var solutionCount = 0;
  // var permute = function(n, input = []) {
  //   // base case, push result to solution
  //   if (n === 0) {
  //     solutionCount++;
  //   } else if (n > 0) { // recursive case
  //     for (var i = 0; i < oldN; i++) {
  //       if (!input.includes(i)) {
  //         permute(n - 1, input.concat(i));
  //       }
  //     }
  //   }
  // };
  // permute(n);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var oldN = n;
  var rcSolution = []; // solution continas all the valid matrices of 0s and 1s for n Queens
  var solution = [];

  // Using the same permutation logic from nRooks, we now check to make sure there are no diagonal conflicts
  // for a possible row (oldN - n) and column (i), we calculate their major diagonal index (col + row) and
  // minor diagonal index (col - row).  If this same major/diag index is already occupied by the queen, we
  // don't pursue that route anymore, if no queen is occupied, we further pursue that route and pass on
  // major/minor diagonal indices
  var permute = function(n, input = [], majorDiag = [], minorDiag = []) {
    // base case, push result to solution
    if (n === 0) {
      var matrix = [];
      input.forEach(function(val) {
        // convert val (corresponds to column index of rook at row i) to [1, 0, 0] format
        var row = [];
        for (var i = 0; i < oldN; i++) {
          if (val === i) {
            row.push(1);
          } else {
            row.push(0);
          }
        }
        matrix.push(row);
      });
      solution.push(matrix);

    // recursive case
    } else if (n > 0) {
      for (var i = 0; i < oldN; i++) {
        var major = i + (oldN - n);
        var minor = i - (oldN - n);
        // only recurse if i is not already contained in input array and major/minor diagonals are not occupied
        if (!(input.includes(i) || majorDiag.includes(major) || minorDiag.includes(minor))) {
          permute(n - 1, input.concat(i), majorDiag.concat(major), minorDiag.concat(minor));
        }
      }
    }
  };

  permute(n);

  if (!solution[0]) {
    solution[0] = [];
    for (var i = 0; i < oldN; i++) {
      solution[0][i] = [];
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[0]));
  // return empty array if no solution exists 
  
  return solution[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var oldN = n;

  // Using the same permutation logic from nRooks, we now check to make sure there are no diagonal conflicts
  // for a possible row (oldN - n) and column (i), we calculate their major diagonal index (col + row) and
  // minor diagonal index (col - row).  If this same major/diag index is already occupied by the queen, we
  // don't pursue that route anymore, if no queen is occupied, we further pursue that route and pass on
  // major/minor diagonal indices
  var permute = function(n, input = [], majorDiag = [], minorDiag = []) {
    // base case, push result to solution
    if (n === 0) {
      solutionCount++;
    // recursive case
    } else if (n > 0) {
      for (var i = 0; i < oldN; i++) {
        var major = i + (oldN - n);
        var minor = i - (oldN - n);
        // only recurse if i is not already contained in input array and major/minor diagonals are not occupied
        if (!(input.includes(i) || majorDiag.includes(major) || minorDiag.includes(minor))) {
          permute(n - 1, input.concat(i), majorDiag.concat(major), minorDiag.concat(minor));
        }
      }
    }
  };

  permute(n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
