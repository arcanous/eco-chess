# ECO - CLI tool for studying chess openings

ECO - Encyclopaedia of Chess Openings

This CLI tool lets you practice chess openings by prompting you to enter corresponding moves.
The openings are organised based on [ECO classification](https://en.wikipedia.org/wiki/Encyclopaedia_of_Chess_Openings) which organises openings [in 5 volumes and 100 subdivisions in each volume ](https://www.365chess.com/eco.php)

## Installation
You must have nodejs and npm or yarn installed on your system to proceed.

### npm
`npm i -g eco-chess`

### yarn
`yarn global add eco-chess`

## Usage
Run `eco` command in your terminal window. It will launch the app and will prompt you to go through setup options to start your practice session.

### Selecting groups
By default all groups are selected. Groups are ranges of ECO opening codes that have common starting moves. For example, all openings in B20-B99 group (Sicilian defence) have starting moves `1. e4 c5`; A80-A99 (Dutch defence) have starting moves `1. d4 f5`, etc.
![Selecting groups](images/01.select-groups.png?raw=true "Selecting groups")

### Selecting levels
2nd setup step lets you select how deep of the tree you want to practice.
For example, for B20-B99 (Sicilian defence) group 1st level is the root - `1. e4 c5`. 2nd level are all child nodes to it:
- B21 - `1. e4 c5 2. f4`
- B22 - `1. e4 c5 2. c3`
- B23-B26 - `1. e4 c5 2. Nc3`
- B27-B99 - `1. e4 c5 2. Nf3`

3rd level, 4th... etc are further expansion on the moves and more specific openings.
![Selecting levels](images/02.select-levels.png?raw=true "Selecting levels")

### Filtering items
3rd setup step lets you filter (select/unselect) individual test items (openings) to be added to the practice test set

![Filter items](images/03.filter-items.png?raw=true "Filter items")

### Overview of test set and start of practice
After completing setup the program will output a table of all selected levels and items in the test set.
![Overview of test set](images/04.overview-of-testset.png?raw=true "Overview of test set")

### Practicing
The program will prompt you with opening ECO code and its' name. If you enter the corresponding moves correctly, it will move on and promt you on the next opening name. If you enter wrong moves, it will output the right moves:
![Practicing](images/05.practicing.png?raw=true "Practicing")

The number in the parenthesis is the level (depth) of the opening in the tree.
