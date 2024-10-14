export const toVisualeDate = (date: any) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${day}.${month}.${year}`;
};

export const toVisualTime = (date: any) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`;
};

export const toVisualDateTime = (date: any) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const dayNames = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const weekDay = dayNames[dateObj.getDay()];

    return `${weekDay} ${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`;
};