// Global variable
const TimerState = {
    Start: 'Start',
    Pause: 'Pause',
    Stop: 'Stop'
};
let TIMER_STATE = TimerState.Stop;

const SkillSate = {
    Initial: 0,
    CollectionOfLight: 1,
    VoidOfCurse: 2,
    Judgement: 3,
    Culmination: 4
};
let SKILL_STATE = SkillSate.Initial;

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
    
    if (state === SkillSate.CollectionOfLight)
        img.src = './style/CollectionOfLight.png';
    else if (state === SkillSate.VoidOfCurse)
        img.src = './style/VoidOfCurse.png';
    else if (state === SkillSate.Judgement)
        img.src = './style/Judgement.png';
    else if (state === SkillSate.Culmination)
        img.src = './style/Culmination.png';
    else {
        img.src = './style/cel.jpg';
        img.style.width = '240px';
    }
};

// Start button event
{
    let btnStart = document.getElementById('idBtnStart');
    btnStart.addEventListener('click', onClick);

    function onClick() {
        if (TIMER_STATE === TimerState.Stop || TIMER_STATE === TimerState.Pause)
            TIMER_STATE = TimerState.Start;
        else
            TIMER_STATE = TimerState.Pause;
        
        UpdateBtnUI();
    };
}

// Stop button event
{
    let btnStop = document.getElementById('idBtnStop');
    btnStop.addEventListener('click', onClick);

    function onClick() {
        if (TIMER_STATE === TimerState.Stop)
            return;
        
        TIMER_STATE = TimerState.Stop;
        UpdateBtnUI();
    };
}

let count = 0;
// Switch button event (just for test)
{
    let btnSwitch = document.getElementById('idBtnSwitch');
    btnSwitch.addEventListener('click', onClick);

    function onClick() {
        count = (count + 1) % 5;
        SKILL_STATE = count;
        UpdateImageUI();
    };
}