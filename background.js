function getRandomPostureMinutes() {
        // I want a int between 30 to 60 (60-30)
        // I want the interval to be at least 30 mins (+30)
        return Math.floor(Math.random() * (60 - 30 + 1)) + 30;
}

function schedulePostureReminder(){
        const minutes = getRandomPostureMinutes();

        chrome.alarms.create("posture", {
                delayInMinutes: minutes
        });
}


function scheduleWaterReminder(){
        chrome.alarms.create("water", {
                delayInMinutes: 120,
                periodInMinutes: 120
        });
}

chrome.runtime.onInstalled.addListener(() => {
        schedulePostureReminder();
        scheduleWaterReminder();
});

chrome.alarms.onAlarm.addListener((alarm) => {
        if(alarm.name === 'posture'){
                chrome.notifications.create({
                        type: 'basic',
                        title: 'Posture Police',
                        message: 'Sit up straight. Your spine is not a banana.',
                        iconUrl: 'icon.png'
                });
                schedulePostureReminder();
        }

        if(alarm.name === 'water'){
                chrome.notifications.create({
                        type: 'basic',
                        title: 'Posture Police',
                        message: 'Hydrate or die-hydrate. The choice is yours.',
                        iconUrl: 'icon.png'
                });
        }
        
});
