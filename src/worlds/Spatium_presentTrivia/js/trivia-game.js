
let score = 0;

// Fuction to begin game
function startGame() {
  
  // Hide the start button 
  const startButton = document.querySelector('button');
  startButton.style.display = 'none';

  // Show the scene
  const scene = document.querySelector('#scene');
  scene.style.display = 'block';

  // Initialize the game
  setNewQuestion();

  // Show the question text
  const questionEntity = document.querySelector('#question-text');
  questionEntity.setAttribute('visible', true);
  
 

}

// Shuffle through the questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Track how many times setNewQuestion is called
let questionCount = 0;

function setNewQuestion() {

  const questions = [
    {
      question: 'What does NASA stand for?',
      answers: [
        { text: 'National Aeronautics and Space Administration', correct: true },
        { text: 'National Airplane for Space Aliens', correct: false },
        { text: 'Nautical Astronaunt and Solar Air', correct: false },
        { text: 'Neon Air and Space Adventure', correct: false }
      ]
    },
    {
      question: 'What does MOXIE do?',
      answers: [
        { text: 'Create oxygen', correct: true },
        { text: 'Collect rocks', correct: false },
        { text: 'Record footage', correct: false },
        { text: 'Communicate with aliens', correct: false }
      ]
    },
    {
      question: 'Where did Apollo 11 launch?',
      answers: [
        { text: 'The Kennedy Space Centre', correct: true},
        { text: 'Elon Musks House', correct: false },
        { text: 'The Space Centre', correct: false },
        { text: 'Launchers Headquarters', correct: false }
      ]
    },
    {
      question: 'When are humans expected to walk on Mars?',
      answers: [
        { text: '2030', correct: true},
        { text: '2023', correct: false },
        { text: '2050', correct: false },
        { text: '2031', correct: false }
      ]
    },
    {
      question: 'What flag was placed on the moon?',
      answers: [
        { text: ' American ', correct: true},
        { text: 'Canadian ', correct: false },
        { text: 'United Kingdom ', correct: false },
        { text: 'Russia', correct: false }
      ]
    },
  ];

const questionContainer = document.getElementById('question');
const answerContainer = document.getElementById('answers');


  // Get a random question and its answers
  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];
  const answers = question.answers;

  // Shuffle the answers
  shuffleArray(answers);

  // Set the question text
  const questionText = document.querySelector('#question-text');
  questionText.setAttribute('value', question.question);

  // Set the answer texts
  const answerEntities = document.querySelectorAll('.answer');
  for (let i = 0; i < answerEntities.length; i++) {
    const answerEntity = answerEntities[i];
    const answer = answers[i];
    const answerText = answerEntity.querySelector('a-text');
    answerText.setAttribute('value', answer.text);
    answerEntity.setAttribute('answer', 'correct:' + answer.correct);
  }
  questionCount++
  
// Remove the used question from the questions array
questions.splice(randomIndex, 1);
  console.log(questionCount);

// Check if there are any questions left
if (questionCount === 6) {
// For testing purposes
console.log("Game over");
const imageEntity = document.createElement("a-image");
        imageEntity.setAttribute("src", "gameover.png");
        imageEntity.setAttribute("position", "0 1 -3");
            imageEntity.setAttribute("width", "5");
            imageEntity.setAttribute("height", "3");

        // Append the entity to the scene
        const sceneEl = document.querySelector("a-scene");
        sceneEl.appendChild(imageEntity);

// Hide question and answers
questionText.setAttribute('visible', false);
answerEntities.forEach((entity) => {
  entity.setAttribute("visible", false);


});
}
}


// Check if user's answer is correct 
AFRAME.registerComponent("check-answer", {
  init: function() {

    this.correctAnswer = function(e) {
      const isCorrect = e.srcElement.getAttribute("answer");

      if (isCorrect == "correct:true") {
        console.log("You're right " + isCorrect);
       
       console.log("your score %i", score);

       score++;
         // Set the question text
       const scoreText = document.querySelector('#score-text');
      scoreText.setAttribute('value', score);
       
        // Create an A-Frame entity that displays the image
        const imageEntity = document.createElement("a-image");
        imageEntity.setAttribute("src", "check.png");
        imageEntity.setAttribute("position", "0 1.5 -4");
        
      

        // Append the entity to the scene
        const sceneEl = document.querySelector("a-scene");
        sceneEl.appendChild(imageEntity);

        // Remove the entity after 2 seconds
        setTimeout(() => {
          sceneEl.removeChild(imageEntity);
          setNewQuestion();
        }, 1500);
      } else {
        console.log("Wrong");
        console.log("your score %i", score);
        // Create an A-Frame entity that displays the image
        const imageEntity = document.createElement("a-image");
        imageEntity.setAttribute("src", "wrong.png");
        imageEntity.setAttribute("position", "0 1.5 -3");

        // Append the entity to the scene
        const sceneEl = document.querySelector("a-scene");
        sceneEl.appendChild(imageEntity);

        // Remove the entity after 2 seconds
        setTimeout(() => {
          sceneEl.removeChild(imageEntity);
          setNewQuestion();
        }, 1500);
      }
      score;
    };

    this.el.addEventListener("click", this.correctAnswer);
  },

  remove: function() {
    this.el.removeEventListener("click", this.correctAnswer)
  },
});


