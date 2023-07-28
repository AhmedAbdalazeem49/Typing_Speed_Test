// Adding Features
/*
    Save Score To Local Storage With Date  "Not Yet"
    choose Levels From Select Box          "Done"    
    Break The Logic To More Functions      "I will consider that i do it"
    Choose Array Of Words For Every Level  "Done"
    Write Game Instructions With Dynamic Values "Done"
    Add 3 seconds for the first word            "Done"
  */
// Setting all Variables in the project "Catch Selectors"
let gameScreen = document.querySelector(".game");
let gameName = document.querySelector(".name");
let gameMessage = document.querySelector(".message");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let gameControls = document.querySelector(".control");
let time = document.querySelector(".time");
let score = document.querySelector(".score");

let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");

let selectBoxDiv = document.querySelector(".select-level");
let levelSelected = document.querySelector("#select");
// let finishMessage = document.querySelector(".finish");

let adviceHard = document.querySelector(".hard");
let adviceMedium = document.querySelector(".medium");
let adviceEasy = document.querySelector(".easy");

// First Of all "Simple Transition"
window.onload = function () {
  setElements();
};

function setElements() {
  Array.from([
    gameScreen,
    gameName,
    gameMessage,
    startButton,
    theWord,
    gameControls,
    time,
    score,
    selectBoxDiv,
    adviceEasy,
    adviceHard,
    adviceMedium,
  ]).filter((element) => {
    element.classList.remove("down");
    element.classList.remove("left");
    element.classList.remove("opacity");
    return element;
    // console.log(element)
  });
}

// Start Logic of Typing Test

// Add test Words
let hardLevelWords = [
  "Conditional",
  "Inheritance",
  "Encapsulation",
  "Polymorphism",
  "Abstraction",
  "Constructor",
  "Destructor",
  "Interpreter",
  "RESTful",
  "Kubernetes",
  "Controller",
  "Repository",
  "Integration",
  "Profiling",
  "Performance",
  "Threading",
  "Concurrency",
  "Parallelism",
  "Delete",
  "Memory",
  "Lambda",
  "Virtual",
  "Docker",
  "Asynchronous",
  "Synchronous",
  "Dependency",
  "Injection",
  "Microservices",
  "Scalability",
  "Refactoring",
];
let mediumLevelWords = [
  "Boolean",
  "Character",
  "Pointer",
  "Library",
  "Package",
  "Linked",
  "Scrum",
  "Closure",
  "Reference",
  "Recursion",
  "Sorting",
  "Searching",
  "Queue",
  "Algorithm",
  "Function",
  "Interface",
  "Namespace",
  "Variable",
  "Framework",
  "Debugging",
  "Exception",
  "Handling",
  "Syntax",
  "Comments",
  "Compiler",
  "Source",
  "Binary",
  "Integer",
  "Database",
  "Version",
  "Control",
  "Branch",
  "Callback",
  "Machine",
  "Security",
];
let easyLevelWords = [
  "Array",
  "Loop",
  "Object",
  "Class",
  "Method",
  "Module",
  "Data",
  "String",
  "Float",
  "Stack",
  "Tree",
  "Graph",
  "Hash",
  "Sql",
  "Create",
  "Read",
  "Update",
  "Api",
  "Http",
  "Json",
  "Xml",
  "Ajax",
  "Model",
  "View",
  "Oop",
  "Fp",
  "Dry",
  "Solid",
  "Agile",
  "Git",
  "Merge",
  "Pull",
  "Test",
  "Event",
  "Orm",
];

let testWordsArray = [...easyLevelWords];

// Setting Levels
const lvls = {
  Easy: 5,
  Medium: 3,
  Hard: 2,
};

// Setting words and seconds of each advice dynamically
document.querySelector(".hard .words").innerHTML = hardLevelWords.length;
document.querySelector(".hard .seconds").innerHTML = lvls["Hard"];

document.querySelector(".medium .words").innerHTML = mediumLevelWords.length;
document.querySelector(".medium .seconds").innerHTML = lvls["Medium"];

document.querySelector(".easy .words").innerHTML = easyLevelWords.length;
document.querySelector(".easy .seconds").innerHTML = lvls["Easy"];

// Default Level
let defaultLevelName = levelSelected.value; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = testWordsArray.length;

// Disable Paste Event  "Elegant"
input.onpaste = function () {
  return false;
};

// Start game
startButton.onclick = function () {
  this.remove();
  input.focus();

  // Generate  Word Function
  genWords();
  timeLeftSpan.innerHTML = parseInt(timeLeftSpan.innerHTML) + 3;
};

function genWords() {
  whichArray();
  // Get random word from array
  let randomWord =
    testWordsArray[Math.floor(Math.random() * testWordsArray.length)];

  // Get Word Index
  let wordIndex = testWordsArray.indexOf(randomWord);

  // Remove Word From Array
  testWordsArray.splice(wordIndex, 1);

  // Show the random Word
  theWord.innerHTML = randomWord;

  // Empty Upcoming Words
  upcomingWords.innerHTML = "";

  // Generate Words
  for (let i = 0; i < testWordsArray.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(testWordsArray[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }

  // Call Start Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;

    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);

      // Compare Words
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        // Empty Input Field
        input.value = "";

        // Increase Score
        scoreGot.innerHTML++;

        if (testWordsArray.length > 0) {
          // CALL Generate Word Function
          genWords();
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Congrats You Win!",
            showConfirmButton: true,
            timer: 3000,
          });

          // Remove Upcoming Words
          upcomingWords.remove();
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Next Time Be Faster",
          text: "Game Over!!",
          footer: "Refresh Page to another try!",
        });
        // Remove Upcoming Words
        upcomingWords.remove();
      }
    }
  }, 1000);
}

// Function to check of select box value
function levelValueSelected() {
  levelSelected.onchange = function () {
    levelValueSelected();
  };
}

function levelValueSelected() {
  defaultLevelName = levelSelected.value; // Change Level From Here
  defaultLevelSeconds = lvls[defaultLevelName];
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
}
// Get Selected Values
levelValueSelected();

// Function to decide which array would be involved
function whichArray() {
  levelSelected.onchange = function () {
    testWordsArray = [];
    if (levelSelected.value === "Easy") {
      testWordsArray.push(...easyLevelWords);
      timeLeftSpan.innerHTML = lvls["Easy"];
      levelValueSelected();
    }
    if (levelSelected.value === "Medium") {
      testWordsArray.push(...mediumLevelWords);
      timeLeftSpan.innerHTML = lvls["Medium"];
      levelValueSelected();
    }
    if (levelSelected.value === "Hard") {
      testWordsArray.push(...hardLevelWords);
      timeLeftSpan.innerHTML = lvls["Hard"];
      levelValueSelected();
    }
    scoreTotal.innerHTML = testWordsArray.length;
    console.log(testWordsArray);
  };
}

whichArray();
