const getDateString = (date) => {
    const dateArray = date.toDateString().split(" ");
    const month = dateArray[1];
    const day = dateArray[2];
    return `${month} ${day}`;
};

const getTimeString = (date) => {
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

const capitalizeEachWord = (str) => {
    const words = str.split(" ");
    const capitalizedWords = [];
    words.forEach(word => {
        const letters = word.split("");
        letters[0] = letters[0].toUpperCase();
        capitalizedWords.push(letters.join(""));
    });
    return capitalizedWords.join(" ").trim();
}

const getRandomHSLColor = (str) => {
    const num = (str.split("").reduce((acc, curr) => {
        return acc + curr.charCodeAt(0);
    }, 0) % 300);

    return `hsl(${num}, 80%, 30%)`;
};


export default {
    getDateString,
    getTimeString,
    capitalizeEachWord,
    getRandomHSLColor
};