/* All rights preserved by Kelvin Chen, DC:kelvin0826 */

// Global variable
const TimerState = {
    Start: 'Start',
    Pause: 'Pause',
    Stop: 'Stop'
};
let TIMER_STATE = TimerState.Stop;

const SkillState = {
    Initial: -1,
    CollectionOfLight: 0,
    VoidOfCurse: 1,
    Judgement: 2,
    Culmination: 3
};
const StateText = ['Collection of Light', 'Void of Curse', 'Judgement', 'Culmination'];
let SKILL_STATE = SkillState.Initial;

const Duration = [20000, 20000, 15000, 5000]; // unit: ms
let TIMER = null;
let TIME = Duration[SkillState.CollectionOfLight];

// Event function
let UpdateBtnUI = function() {
    let btnStart = document.getElementById('idBtnStart');
    state = TIMER_STATE;
    console.log(state);
    
    if (state === TimerState.Start)
        btnStart.textContent = TimerState.Pause;
    else
        btnStart.textContent = TimerState.Start;
};

let UpdateImageUI = function() {
    let img = document.getElementById('idImg');
    img.style.width = '180px';
    state = SKILL_STATE;
    
    if (state === SkillState.CollectionOfLight)
        img.src = './style/CollectionOfLight.png';
    else if (state === SkillState.VoidOfCurse)
        img.src = './style/VoidOfCurse.png';
    else if (state === SkillState.Judgement)
        img.src = './style/Judgement.png';
    else if (state === SkillState.Culmination)
        img.src = './style/Culmination.png';
    else {
        img.src = './style/cel.jpg';
        img.style.width = '240px';
    }
};

let UpdateStateText = function () {
    let text = document.getElementById('idState');
    let state = SKILL_STATE;

    if (state === SkillState.Initial)
        text.style.visibility = 'hidden';
    else {
        text.style.visibility = 'visible';
        if (state == SkillState.Culmination)
            text.style.color = 'yellow';
        else
            text.style.color = 'white';
        text.textContent = StateText[state];
    }
}

let UpdateTimer = function(reset=false) {
    secElement = document.getElementById('idSec');
    msecElement = document.getElementById('idMSec');
    
    if (!reset) {
        TIME -= 10;
        if (TIME <= 0) {
            SKILL_STATE = (SKILL_STATE + 1) % 4;
            TIME = Duration[SKILL_STATE];
            UpdateStateText();
            UpdateImageUI();
        }
    } else
        TIME = Duration[SkillState.CollectionOfLight];

    strSec = Math.floor(TIME / 1000).toString();
    strMSec = Math.floor((TIME % 1000) / 10).toString();

    if (strSec.length < 2) strSec = '0' + strSec;
    if (strMSec.length < 2) strMSec = '0' + strMSec;

    secElement.textContent = strSec;
    msecElement.textContent = '.' + strMSec;
};

// Start button onClick
{
    let btnStart = document.getElementById('idBtnStart');
    btnStart.addEventListener('click', onClick);

    function onClick() {
        if (SKILL_STATE === SkillState.Initial) {
            console.log('Change to collection of light');
            SKILL_STATE = SkillState.CollectionOfLight;
        }

        if (TIMER_STATE === TimerState.Stop || TIMER_STATE === TimerState.Pause) {
            TIMER_STATE = TimerState.Start;
            TIMER = setInterval(UpdateTimer, 10);
            UpdateStateText();
            UpdateImageUI();
        }
        else {
            clearInterval(TIMER);
            TIMER = null;
            TIMER_STATE = TimerState.Pause;
        }
        
        UpdateBtnUI();
    };
}

// Stop button onClick
{
    let btnStop = document.getElementById('idBtnStop');
    btnStop.addEventListener('click', onClick);

    function onClick() {
        if (TIMER_STATE === TimerState.Stop)
            return;
        
        clearInterval(TIMER);
        TIMER_STATE = TimerState.Stop;
        TIMER = null;
        
        SKILL_STATE = SkillState.Initial;
        UpdateTimer(true);
        UpdateStateText();
        UpdateImageUI();
        UpdateBtnUI();
    };
}

/*let count = 0;
// Switch button onClick (just for test)
{
    let btnSwitch = document.getElementById('idBtnSwitch');
    btnSwitch.addEventListener('click', onClick);

    function onClick() {
        count = (count + 1) % 5;
        SKILL_STATE = count;
        UpdateImageUI();
    };
}*/