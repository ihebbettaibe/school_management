export * from './pagination-options.dto';
export const HEADER_AUTH_TOKEN = 'AUTH_TOKEN';

export function parseWeekday(day: number): string | null {
    if (day < 1 || day > 6) return null;
    const weekdays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    return weekdays[day - 1];
}
