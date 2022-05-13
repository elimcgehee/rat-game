// Alert
var alerted = localStorage.getItem('alerted') || '';
if (alerted != 'yes') {
 alert("Welcome to the rat game! For the best user experience, please enable audio in your browser settings.");
 localStorage.setItem('alerted','yes');
}

// Background Music
window.onload = function() {
  document.getElementById("myAudio").play();
}

// Button Beep
function sound(){
  document.getElementById("beep").play();
  console.log("Played Sound")
}

// Game Logic
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      button.addEventListener('click', () => sound(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

// Game Content
const textNodes = [
  {
    id: 1,
    text: 'You are walking down the streets of New York, and you see a rat. Do you approach the rat or run away from the rat?',
    options: [
      {
        text: 'Approach the Rat',
        nextText: 2
      },
      {
        text: 'Run Away from the Rat',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'As you get closer to the rat, you realize that it is a super rat! You have some cheese on you... Do you give it to the rat?',
    options: [
      {
        text: 'Give the Cheese',
        nextText: 4
      },
      {
        text: 'Eat the Cheese Yourself',
        nextText: 5
      },
    ]
  },
  {
    id: 3,
    text: 'Why would you not approach the super rat... You Loose...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: 'You give the rat the cheese, and it becomes feral. The rat attacks you, and you lose...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You eat the cheese yourself, and it gives you super human strength! What do you do now?',
    options: [
      {
        text: 'Beat up the rat',
        nextText: 6
      },
      {
        text: 'Become a super rat cheese vigilante',
        nextText: 7
      },
    ]
  },
  {
    id: 6,
    text: 'You beat up the rat, but it was foolish of you to ever challenge a super rat... You Lose!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You are now a rat cheese vigilante. (or something like that) What are you going to do now that you are basically rat cheese batman?',
    options: [
      {
        text: 'Go help someone?',
        nextText: 8
      },
      {
        text: 'Mug someone.',
        nextText: 9
      },
      {
        text: 'Vandalize a building',
        nextText: 10
      },
    ]
  },
  {
    id: 8,
    text: 'Your help a citizens and win the Nobel peace prize! You Win!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought that you were above the law, and you get busted by the rat police... You Lose!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'You find a large wall, and write your rat logo on it. It looks nice. You find more cheese by the wall. Do you eat this cheese?',
    options: [
      {
        text: 'Eat the cheese',
        nextText: 11
      },
      {
        text: 'Do not eat the cheese',
        nextText: 12
      }
    ]
  },
  {
    id: 11,
    text: 'Unfortunately, this cheese was gross and moldy. You fall ill and die... You Lose!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'Good news! That cheese was poisonous... You live to see another day! You Win!',
    options: [
      {
        text: 'Play Again',
        nextText: -1
      }
    ]
  }
]

startGame()