# battleship
A web app version of the classic battleship board game <break />

### Goals

The main goal of this project was to practice with tests using jest and to learn Test Driven Development. I feel like the tests helped me organize my factories and led to less bug fixing as most of the bugs were solved immeadiatly. It also helped me see exactly what was failing so I didn't have to search through all of my code to find an issue. Overall I liked using tests and will continue to use them wherever I should. <break />

I also challenged myself by making an AI that would attack differently based on if it got a hit or not. There were alot of bugs and edge cases that I had to work through and it was a headache at times. Although it's not perfect,  I am happy with the state that I have gotten the AI to. Some improvements that could be made would be to make the random attacks not attack next to each other and attack more in a checkerboard pattern. Since the smallest ship is a size of two, you dont need to attack every square and get get all ships by attacking only half of them. The AI also can sometimes struggle with grouped ships next to each other. <break />

### Controls

* Place your five ships by clicking on the grid.
* Change the axis in which they are placed by clicking the axis button
* Attack by clicking the enemy(right) board
* Hits show as a red circle and misses are white
* After sinking a ship, the ship will appear to tell you its sunk.
* Sink all 5 enemy ships before the AI can do the same to you!
* Score a decisive victory to help win the war