"use strict";

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const stages = [
    {
        name: "Deploy",
        message: "Click on your areas to deploy armies",
        tip: "Hold shift to deploy all armies",
    },
    {
        name: "Attack",
        message: "Choose a country to attack from then a target",
        tip: "Hold shift to keep armies on original country",
    },
    {
        name: "Fortify",
        message: "Choose a country to take troops from and then a target",
        tip: "Hold shift to only move half of the armies",
    }
]
const continents = [
    {
        areas: ["ME", "NH", "VT", "MA", "CT", "RI"],
        displayName: "New England",
        name: "new_england",
        bonus: 5
    },
    {
        areas: ["OH", "NJ", "NY", "PA"],
        displayName: "North East",
        name: "north_east",
        bonus: 2
    },
    {
        areas: ["MN", "IA", "NE", "IL", "IN", "WI", "MI"],
        displayName: "North West",
        name: "north_west",
        bonus: 1
    },
    {
        areas: ["KY", "VE", "MV", "MD", "MO", "DE"],
        displayName: "Border States",
        name: "border_states",
        bonus: 4
    },
    {
        areas: ["AL", "FL", "GA", "SC", "NC", "TN"],
        displayName: "South East",
        name: "south_east",
        bonus: 5
    },
    {
        areas: ["TX", "AR", "KS", "LA", "MS"],
        displayName: "South West",
        name: "south_west",
        bonus: 2
    },
];

class Country {
    constructor(name, army, neighbors) {
        this.name = name;
        this.army = army;
        this.neighbors = neighbors;
    }
}
const countries = [
    new Country(
        "TX",
        1,
        ["NM", "AR", "LA", "OK"]
    ),
    new Country(
        "AR",
        1,
        ["MO", "TN", "MS", "LA", "TX", "OK"]
    ),
    new Country(
        "KS",
        1,
        ["NE", "MO", "CO", "OK"]
    ),
    new Country(
        "NE",
        1,
        ["SD", "IA", "MO", "KS", "CO", "WY"]
    ),
    new Country(
        "MN",
        1,
        ["ND", "SD", "IA", "WI"]
    ),
    new Country(
        "LA",
        1,
        ["AR", "MS", "TX", "OK"]
    ),
    new Country(
        "MO",
        1,
        ["IA", "IL", "KY", "TN", "AR", "KS", "NE", "OK"]
    ),
    new Country(
        "IA",
        1,
        ["MN", "WI", "IL", "MO", "NE", "SD"]
    ),
    new Country(
        "WI",
        1,
        ["MN", "IA", "IL", "MI"]
    ),
    new Country(
        "IL",
        1,
        ["WI", "IA", "MO", "KY", "IN"]
    ),
    new Country(
        "TN",
        1,
        ["KY", "VA", "NC", "GA", "AL", "MS", "AR", "MO"]
    ),
    new Country(
        "MS",
        1,
        ["TN", "AL", "LA", "AR"]
    ),
    new Country(
        "AL",
        1,
        ["TN", "GA", "FL", "MS"]
    ),
    new Country(
        "GA",
        1,
        ["TN", "NC", "SC", "FL", "AL"]
    ),
    new Country(
        "FL",
        1,
        ["AL", "GA"]
    ),
    new Country(
        "SC",
        1,
        ["NC", "GA"]
    ),
    new Country(
        "NC",
        1,
        ["VA", "TN", "GA", "SC"]
    ),
    new Country(
        "VA",
        1,
        ["MD", "DC", "WV", "KY", "TN", "NC"]
    ),
    new Country(
        "WV",
        1,
        ["PA", "MD", "VA", "KY", "OH"]
    ),
    new Country(
        "KY",
        1,
        ["OH", "WV", "VA", "TN", "MO", "IL", "IN"]
    ),
    new Country(
        "IN",
        1,
        ["MI", "OH", "KY", "IL"]
    ),
    new Country(
        "MI",
        1,
        ["WI", "IN", "OH"]
    ),
    new Country(
        "OH",
        1,
        ["MI", "IN", "KY", "WV", "PA"]
    ),
    new Country(
        "PA",
        1,
        ["NY", "NJ", "DE", "MD", "WV", "OH"]
    ),
    new Country(
        "MD",
        1,
        ["PA", "DE", "VA", "WV", "DC"]
    ),
    new Country(
        "DE",
        1,
        ["PA", "NJ", "MD"]
    ),
    new Country(
        "NJ",
        1,
        ["NY", "PA", "DE"]
    ),
    new Country(
        "NY",
        1,
        ["VT", "MA", "CT", "NJ", "PA"]
    ),
    new Country(
        "CT",
        1,
        ["MA", "RI", "NY"]
    ),
    new Country(
        "RI",
        1,
        ["MA", "CT"]
    ),
    new Country(
        "MA",
        1,
        ["NH", "VT", "NY", "CT", "RI"]
    ),
    new Country(
        "VT",
        1,
        ["NY", "NH", "MA"]
    ),
    new Country(
        "NH",
        1,
        ["VT", "ME", "MA"]
    ),
    new Country(
        "ME",
        1,
        ["NH"]
    ),
    new Country(
        "OK",
        1,
        ["TX", "LA", "AR", "MO", "KS"]
    ),
];

class Player {
    constructor(name, country, color, reserve, areas) {
        this.name = name;
        this.country = country;
        this.color = color;
        this.reserve = reserve;
        this.areas = areas;
        this.bonus = 0;
        this.alive = true;
    }
}
const players = [
    new Player(
        "Jefferson Davis",
        "The Confederacy",
        "#d6040e",
        0,
        ["TX", "OK", "KS", "MO", "AR", "LA", "MS", "TN", "AL", "FL", "GA", "SC", "NC", "VA", "KY"],
    ),
    new Player(
        "Abraham Lincoln",
        "The Union",
        "#030f63",
        0,
        ["ME", "NH", "VT", "MA", "CT", "RI", "NY", "PA", "NJ", "WV", "DE", "OH", "MI", "WI", "MN", "IA", "NE", "IL", "IN", "MD"],
    ),
];

// Helper Functions
Array.prototype.containsArray = function (array) {
    let index
    let last
    if (arguments[1]) {
        index = arguments[1]
        last = arguments[2];
    } else {
        index = 0
        last = 0;
        this.sort();
        array.sort();
    }
    return index === array.length
        || (last = this.indexOf(array[index], last)) > -1
        && this.containsArray(array, ++index, ++last);
};

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// DOM Elements
const infoDate = Array.from(document.getElementsByClassName('date'));
const infoName = Array.from(document.getElementsByClassName('country'));
const infoIncome = Array.from(document.getElementsByClassName('income'));
const areas = Array.from(document.getElementsByClassName('area'));
const bar = Array.from(document.getElementsByClassName('bar'));
const map = document.querySelector('#map');
const circles = document.querySelector('#circles');

// Modals
const startModal = document.querySelector('#start-modal');
const reserveDisplay = document.querySelector('#reserve');
const startButton = document.querySelector('#start-button');
const winModal = document.querySelector('#win-modal');
const winMessage = document.querySelector('.win-message');
const playAgain = document.querySelector('#play-again');

// Info Panel
const restart = document.querySelector('#restart');
const infoPanel = document.querySelector('.info-panel');
const countryInfoTitle = document.querySelector('.country-info-title');
const countryInfoMessage = document.querySelector('.country-info-message');

// Player Panel
const playerPanel = document.querySelector('.player-panel');
const stageName = document.querySelector('.stage-name');
const stageMessage = document.querySelector('.stage-message');
const stageTip = document.querySelector('.stage-tip');
const nextStage = document.querySelector('#next-stage');

let game_state = {};

game_state.init = function () {
    startModal.style.display = "block";
    circles.style.display = "none"
    map.style.display = "none"
    winModal.style.display = "none";
    startButton.addEventListener('click', this.start.bind(this));
    restart.addEventListener('click', this.restart.bind(this));
    map.addEventListener('mousedown', this.handleClick.bind(this));
    map.addEventListener('mouseover', this.handleMouseOver.bind(this));
    map.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    nextStage.addEventListener('click', this.nextStage.bind(this));
    playAgain.addEventListener('click', this.restart.bind(this));
}

game_state.nextStage = function () {
    if (this.prevTarget) {
        this.prevTarget.classList.remove('flash');
    }
    this.prevTarget = null
    this.prevCountry = null
    if (this.stage === stages.length - 1) {
        this.stage = 0;
        stageName.textContent = stages[this.stage].name;
        stageMessage.textContent = stages[this.stage].message;
        stageTip.textContent = stages[this.stage].tip;
        nextStage.textContent = "Next Stage";
        this.nextTurn();
    } else {
        if (!this.stage && this.stage !== 0) {
            this.stage = 0;
        } else {
            this.stage += 1;
        }
        stageName.textContent = stages[this.stage].name;
        stageMessage.textContent = stages[this.stage].message;
        stageTip.textContent = stages[this.stage].tip;
        if (this.stage === stages.length - 1) {
            nextStage.textContent = "End Turn";
        }
    }
}

game_state.handleMouseOver = function (e) {
    countryInfoTitle.innerHTML = e.target.id
    countryInfoMessage.innerHTML = "Owner:<br/>" + this.players.find(player => player.areas.includes(e.target.id)).country
        + "<br/>Region:<br/>" + continents.find(continent => continent.areas.includes(e.target.id))?.displayName + "<br/>";
}

game_state.handleMouseLeave = function () {
    countryInfoTitle.innerHTML = 'Region Bonuses:';
    countryInfoMessage.innerHTML = continents.map(continent => continent.displayName + ": " + continent.bonus).join('<br/>');
}

game_state.start = function () {
    map.style.display = "block"
    circles.style.display = "block"
    nextStage.style.pointerEvents = "auto";
    map.style.pointerEvents = "auto";
    startModal.style.display = "none";
    playerPanel.style.display = "flex";
    infoPanel.style.display = "flex";
    this.turn = 0;
    this.stage = 0
    this.nextStage()
    this.countries = JSON.parse(JSON.stringify(countries));
    this.players = JSON.parse(JSON.stringify(players));

    // Add player details to Info Panel
    for (let j = 0; j < this.players.length; j++) {
        infoName[j].innerHTML = this.players[j].country;
        infoName[j].parentElement.classList.remove('defeated');
        if (this.players[j].alive) {
            bar[j].style.background = this.players[j].color;
        }
    }

    // Add Initial Armies to Game
    shuffle(areas).forEach((area, i) => {
        this.players.forEach(player => {
            if (player.areas.includes(area.id)) {
                setTimeout(() => {
                    area.style.fill = player.color;
                    area.nextElementSibling.textContent = this.countries.find(country => country.name === area.id).army;
                }, 25 * i)
            }
        })
    })
    this.updateInfo()
    this.nextTurn()
}

game_state.win = function (player) {
    winMessage.textContent = player.country;
    winMessage.style.color = player.color;
    winModal.style.display = "block";
}

game_state.restart = function () {
    startModal.style.display = "block";
    winModal.style.display = "none";
}

game_state.nextTurn = function () {
    this.turn += 1;
    this.player = this.players[(this.turn - 1) % this.players.length];

    // Unselect country
    if (this.prevTarget) {
        this.prevTarget.classList.remove('flash');
    }
    this.prevCountry = null;
    this.prevTarget = null;

    // Change player panel colors to current player
    if (this.turn % 2 === 0) {
        stageName.classList.add('player-2')
        playerPanel.classList.add('player-2')
    } else {
        stageName.classList.remove('player-2')
        playerPanel.classList.remove('player-2')
    }

    // Update date & reserve
    infoDate[0].textContent = months[(this.turn + 3) % 12] + " " + Math.floor(1861 + (this.turn + 3) / 12)
    this.player.reserve += this.player.bonus;
    reserveDisplay.innerHTML = this.player.reserve;
}

game_state.updateInfo = function () {
    this.players.forEach((player, i) => {
        player.bonus = Math.ceil(player.areas.length / 3);
        player.bonus += this.continentBonus(player);
        player.bonus = Math.max(player.bonus, 3);
        infoIncome[i].innerHTML = player.bonus
        bar[i].style.width = (player.areas.length / this.countries.length) * 600 + 'px';
    })
}

game_state.continentBonus = function (player) {
    let bonus = 0;
    continents.forEach(continent => {
        if (player.areas.containsArray(continent.areas)) {
            bonus += continent.bonus;
        }
    })
    return bonus;
}

game_state.handleClick = function (e) {
    switch (this.stage) {
        case 0:
            this.addArmy(e)
            break
        case 1:
            this.attack(e)
            break
        case 2:
            this.fortify(e)
            break
    }
}

game_state.addArmy = function (e) {
    this.countries.forEach(country => {
        // Check if Target is in country array and player has enough in reserve and player owns territory
        if (e.target.id === country.name && this.player.reserve > 0 && this.player.areas.includes(country.name)) {
            if (e.shiftKey) {
                country.army += this.player.reserve;
                this.player.reserve = 0;
            } else {
                country.army += 1;
                this.player.reserve -= 1;
            }
            reserveDisplay.innerHTML = this.player.reserve;
            e.target.nextElementSibling.textContent = country.army;
            // Once reserve is empty, battle stage can start
            if (this.player.reserve === 0) {
                this.nextStage()
            }
        }
    })
}

game_state.attack = function (e) {
    // Remove flash animation from previous area
    if (this.prevTarget) {
        this.prevTarget.classList.remove('flash');
    }
    this.countries.forEach(country => {
        if (e.target.id === country.name) {
            e.target.classList.add('flash');
            this.prevTarget = e.target;
            if (this.prevCountry) {
                if (
                    this.prevCountry.name !== country.name
                    && this.player.areas.includes(this.prevCountry.name)
                    && !this.player.areas.includes(country.name)
                ) {
                    this.prevCountry.neighbors.forEach(neighbor => {
                        if (
                            neighbor === country.name
                            && !this.player.areas.includes(neighbor.name)
                            && this.prevCountry.army > 1
                        ) {
                            let defender = document.getElementById(`${country.name}`)
                            let attacker = document.getElementById(`${this.prevCountry.name}`)
                            let opp;
                            this.players.forEach(p => {
                                if (p.areas.includes(country.name)) {
                                    opp = p;
                                }
                            })

                            // Battle Logic
                            while (country.army > 0) {
                                if (this.prevCountry.army === 1) {
                                    attacker.nextElementSibling.textContent = "1";
                                    defender.nextElementSibling.textContent = country.army;
                                    return;
                                }

                                // 21 in 36 chance that defender wins
                                if (Math.floor(Math.random() * 36) + 1 <= 21) {
                                    this.prevCountry.army -= 1;
                                } else {
                                    country.army -= 1;
                                }
                            }

                            // Handle if attacker wins
                            if (country.army <= 0) {

                                // Remove area from defenders areas array
                                const index = opp.areas.indexOf(country.name);
                                opp.areas.splice(index, 1);
                                this.player.areas.push(country.name);

                                // Swap defender area to attacker and distribute army evenly between areas
                                defender.style.fill = this.player.color;
                                if (e?.shiftKey) {
                                    country.army = 1;
                                    this.prevCountry.army -= 1;
                                } else {
                                    country.army = this.prevCountry.army - 1;
                                    this.prevCountry.army = 1;
                                }
                                defender.nextElementSibling.textContent = String(country.army);
                                attacker.nextElementSibling.textContent = String(this.prevCountry.army);
                                this.updateInfo()

                                // If defender has no areas left they are eliminated
                                if (opp.areas.length === 0) {
                                    opp.alive = false;
                                    let index = this.players.indexOf(opp)
                                    infoName[index].parentElement.classList.add('defeated');
                                }
                            }

                            // Win Condition
                            if (this.player.areas.length === countries.length) {
                                this.win(this.player);
                            }
                        }
                    })
                }
            }
            this.prevCountry = country;
        }
    });
}

game_state.fortify = function (e) {
    if (this.player.areas.includes(e.target.id)) {
        if (this.prevCountry) {
            const target = this.countries.find(country => country.name === e.target.id)
            if (e.shiftKey) {
                target.army += Math.floor(this.prevCountry.army / 2)
                this.prevCountry.army = Math.ceil(this.prevCountry.army / 2)
            } else {
                target.army += this.prevCountry.army - 1
                this.prevCountry.army = 1
            }
            e.target.nextElementSibling.textContent = String(target.army);
            this.prevTarget.nextElementSibling.textContent = String(this.prevCountry.army);
            this.nextStage()
        } else {
            this.countries.forEach(country => {
                if (e.target.id === country.name) {
                    e.target.classList.add('flash');
                    this.prevTarget = e.target;
                    this.prevCountry = country;
                }
            })
        }
    }
}

game_state.init();