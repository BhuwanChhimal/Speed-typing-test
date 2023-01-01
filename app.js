window.onload = function() { //-->running the JS after the page fully loads.
    const startGameButton = document.getElementById('start-button');
    const highScoreButton = document.getElementById('highscore-button');
    const form = document.getElementById('form');
    const stats = document.getElementById('stats');
    const textDisplay = document.getElementById('txt-display');
    const userText = document.getElementById('user-text');
    const wpmDisplay = document.getElementById('wpm-display');
    const scoreDisplay = document.getElementById('score-display');
    const timeDisplay = document.getElementById('time-display');
    const splittedString = string.split(' ');
    const input = document.querySelector('input');
    const click = document.getElementById('click');

    const stat = { //--> object to hold stats
        currentWord: '',
        wpm: 0,
        score: 0,
        time: 60, //-->in seconds
        checkTime: 0
    }

    function showStats() {
        scoreDisplay.textContent = stat.score;
        timeDisplay.textContent = stat.time;
        wpmDisplay.textContent = (stat.score / (stat.checkTime / 60)).toFixed(2);
    }

    function removeHideClass() {
        highScoreButton.classList.remove('hide');
        form.classList.remove('hide');
        stats.classList.remove('hide');
    }

    function getRandomWord() {
        return splittedString[
            (Math.floor(Math.random() * splittedString.length))
        ];
    }

    function newWord() {
        textDisplay.textContent = getRandomWord();
        // const currentWord = textDisplay.textContent;
    }

    function createSpan(content, color) {
        const span = document.createElement('span');
        const style = 'background-color: ' + color;
        span.textContent = content; //-->adds the value passed to "content" arg as text content to span tag we created
        span.setAttribute('style', style);
        userText.appendChild(span); //--> adds the span element to the section with id user-text
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); //-->prevents default event of the form submit

        const isCorrect = input.value === textDisplay.textContent; //-->returns a boolean variable 'true' if user inputs correct words
        newWord();

        if (isCorrect) {
            createSpan(input.value, 'greenyellow');
            stat.score += 1;
        } else {
            createSpan(input.value, 'red');
        }
        showStats();
        input.value = ''; //--> clears the input field on every submit
    })

    startGameButton.addEventListener('click', (event) => {
        event.preventDefault();

        removeHideClass();

        highScoreButton.classList.add('hide');
        startGameButton.classList.add('hide');
        click.classList.add('hide');

        input.focus(); //-->auto focues the cursor on input field 

        newWord();

        showStats();

        setInterval(() => { //-->to increase/decrease time every second
            stat.time -= 1;
            stat.checkTime += 1;
            showStats();
            if (stat.time === stat.checkTime) {
                alert(`Time up! Your wpm is : ${wpmDisplay.textContent}`);

                const scores = JSON.parse(localStorage.getItem('highscore')) || []; //-->creating to array to store highscore from local storage

                scores.push(wpmDisplay.textContent); // .push() function add element to the array

                scores.sort(); // -->sorting array in ascending order

                if (scores.length > 10) { //-->we need only top 10 scores so
                    scores.shift(); //--> .shift() function removes the first element from the array so that is the least score gets removed.
                }

                localStorage.setItem('highscore', JSON.stringify(scores)); //-->adds the value from 'scores' array by stringify() function to the local storage

                location.reload(); //--> reloads the page after time ends.
            }
        }, 1000); //-->1000ms = 1sec

    })

}