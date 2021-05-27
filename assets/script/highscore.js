// sets variable to ol element
var leaderboard = document.querySelector('.leaderboard')
// declares array and fills in the scores with zeroes
var scores = [0, 0, 0, 0, 0];
// declares variable for sorted array of scores
var sortScores;


function getScore() {
    // pulls score from local storage
    var storedPoints = localStorage.getItem('scoreCount')
    // pushes score into array
    scores.push(storedPoints)
    // sorts array from greatest to least
    sortScores = scores.sort(function (a, b) { return b - a });
    // populates array into ordered list items
    for (let i = 0; i < 5; i++) {

        var li = document.createElement('li');
        li.textContent = sortScores[i];
        leaderboard.appendChild(li);

    }
}

getScore();