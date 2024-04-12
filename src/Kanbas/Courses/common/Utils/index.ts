export const formatDate = (date: Date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
}

export const formatToTitleCase = (input: string) => {
    return input
        .toLowerCase()
        .split(" ")
        .reduce((s, c) => s + "" + (c.charAt(0).toUpperCase() + c.slice(1) + " "), '');
}
