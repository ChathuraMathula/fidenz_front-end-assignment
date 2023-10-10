export const getDateString = (date) => {
    const dateArray = date.toDateString().split(" ");
    const month = dateArray[1];
    const day = dateArray[2];
    return `${month} ${day}`;
};

export const getTimeString = (date) => {
    const timeString = date.toLocaleTimeString();
    const ampm = timeString.substr(-2) == "AM"
        ? "am"
        : timeString.substr(-2) == "PM"
            ? "pm"
            : null;
    const timeArray = timeString.split(":");
    const time = `${timeArray[0]}.${timeArray[1]}${ampm}`;
    return time;
}