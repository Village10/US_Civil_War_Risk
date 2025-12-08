# Risk, U.S. Civil War Edition

Original Game: https://github.com/rzencoder/risk

SVG map adapted from https://simplemaps.com/resources/svg-us

Built using Javascript, HTML, and SASS.

# The Game

The goal of the game is to control all the states on the map.
The Confederacy goes first because it was the one that receded from the Union.
The game is two player and has three stages every turn:

### Deploy

Every turn you get additional armies to place on the map. 
The number of troops is increased by:
  * Owning more areas
  * Controlling all areas in a regions, which include:
    * The North West
    * The North East
    * New England
    * Border States
    * South West
    * South East

Click on a state you control to add armies. Hold shift to add all armies from your reserve to that state.
  
The next stage starts when you either skip the current stage or you run out of armies in your reserve.

### Attack

To attack an opponent select a state you control to attack from and a neighboring state to attack.
- You must have at least two troop to attack an opponent.
- The game will run simulations until you either win or only have 1 army left.
  - In each simulation, it takes 1 army from either state, with the defender having a 21 in 36 chance to win.
- If you win, the opponents state will become yours and the rest of your troops except one will go to the claimed state (unless you hold shift).

The next stage starts when you press the "Next Stage Button"

### Fortify

The fortify stage allows you to move armies from one territory to another.
- First, click on the state you want to move armies from.
- Then, click on the state you want to move armies to.
- All your armies will move to the new state except one, unless you hold shift in which case it will move half (rounded down).

Click "End Turn" to pass the turn to the next player.