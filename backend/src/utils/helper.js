const moment = require('moment');

const pad = (num) => {
    return (`0${num}`).slice(-2);
}

const convertToSpecificFormat = (timeInSeconds) => {
    let minutes = Math.floor(timeInSeconds / 60);
    timeInSeconds = timeInSeconds % 60;
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(timeInSeconds)}`;
}

const chatTalkTime = (startTime) => {
    const time = moment(startTime);
    const createdAt = moment(time).valueOf();
    const diffTimeInSeconds = moment().diff(createdAt, 's');
    const talkTime = convertToSpecificFormat(diffTimeInSeconds);

    return talkTime;
}

module.exports = {
    chatTalkTime
}