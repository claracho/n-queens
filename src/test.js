countNQueensSolutions = function(n) {
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
console.log(countNQueensSolutions(17));
