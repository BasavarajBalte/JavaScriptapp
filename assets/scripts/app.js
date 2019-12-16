const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
let battleLog = [];

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_MONSTER_STRONG_ATTACK = "MONSTER_STRONG_ATTACK";
const LOG_EVENT_GAME_END = "GAME_END";


let enteredValue = prompt('max of life of you and monster?','100');
if(isNaN(enteredValue) || enteredValue <= 0){
    enteredValue = 100;
}
let chosenMaxHealth = parseInt(enteredValue);
let currentMonsterHealth = chosenMaxHealth;
let currentPlayerHealth = chosenMaxHealth;
let hasBonusLife = true;

adjustHealthBars(chosenMaxHealth);


function attackMode(mode){
    let modeValue = 0;
    let logEventValue;
    if(mode === MODE_ATTACK){
        modeValue = ATTACK_VALUE;
        logEventValue = LOG_EVENT_PLAYER_ATTACK;
    } else if(mode === MODE_STRONG_ATTACK){
        modeValue = STRONG_ATTACK_VALUE;
        logEventValue = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    
    const damage = dealMonsterDamage(modeValue);
    currentMonsterHealth -= damage;
    logEvent(logEvent,damage,currentMonsterHealth,currentPlayerHealth);
    endRound();
}

function endRound(){
    let initalPlayerHealth = currentPlayerHealth;
    const playerDamage =  dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    logEvent(MONSTER_ATTACK_VALUE,playerDamage,currentMonsterHealth,currentPlayerHealth);
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        currentPlayerHealth = initalPlayerHealth;
        setPlayerHealth(initalPlayerHealth);
        alert('bonus life used to save!')
        removeBonusLife();
    }
    if(currentMonsterHealth <=0 && currentPlayerHealth > 0){
        alert('You won!');
        reset();
        logEvent(LOG_EVENT_GAME_END,'PLAYER OWN',currentMonsterHealth,currentPlayerHealth);
    }else if(currentPlayerHealth <=0 && currentMonsterHealth > 0){
        alert('You lost!')
        reset();
        logEvent(LOG_EVENT_GAME_END,'MONSTER OWN',currentMonsterHealth,currentPlayerHealth);
    } else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        alert("draw");
        reset();
        logEvent(LOG_EVENT_GAME_END,'GAME DRAW',currentMonsterHealth,currentPlayerHealth);
    }
}
function attackHandler(){
    attackMode(MODE_ATTACK);
};

function strongAttackHandler(){
   attackMode(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxHealth - HEAL_VALUE){
        alert("con't heal more then initial value");
        healValue = chosenMaxHealth - currentPlayerHealth;
    }else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
    
}

function reset(){
    currentPlayerHealth = chosenMaxHealth;
    currentMonsterHealth = chosenMaxHealth;
    resetGame(chosenMaxHealth);
}

function logEvent(event,value,monsterHealth,playerHealth){
   let logEventDet = {
        eventType : event,
        value : value,
        finalMonsterHealth : monsterHealth,
        finalPlayerHealth : playerHealth
    }

//const LOG_EVENT_GAME_END = "GAME_END";
    if(event === LOG_EVENT_PLAYER_ATTACK){
        logEventDet.target = 'MONSTER';
    }else if(event === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEventDet.target = 'MONSTER';
    }else if(event === LOG_EVENT_MONSTER_ATTACK){
        logEventDet.target = 'PLAYER';
    }else if(event === LOG_EVENT_MONSTER_STRONG_ATTACK){
        logEventDet.target = 'PLAYER';
    }
    battleLog.push(logEventDet);
}

function pringGameLog(){
    console.log(battleLog);
}
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',pringGameLog);