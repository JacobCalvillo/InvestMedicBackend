export const formatDateForDB = (date: string | Date): string => {
    // Convertir a Date solo si es un string
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
        throw new Error("Fecha inválida");
    }

    const pad = (num: number, size = 2) => num.toString().padStart(size, "0");

    const year = parsedDate.getFullYear();
    const month = pad(parsedDate.getMonth() + 1);
    const day = pad(parsedDate.getDate());
    const hours = pad(parsedDate.getHours());
    const minutes = pad(parsedDate.getMinutes());
    const seconds = pad(parsedDate.getSeconds());
    const milliseconds = parsedDate.getMilliseconds().toString().padStart(6, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};
