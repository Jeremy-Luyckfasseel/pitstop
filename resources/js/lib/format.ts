/**
 * Format a date string for display.
 *
 * @param date - ISO date string to format
 * @param options - Optional Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string
 */
export function formatDate(
    date: string,
    options?: Intl.DateTimeFormatOptions
): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options,
    });
}

/**
 * Format a date with time for display.
 *
 * @param date - ISO date string to format
 * @returns Formatted date and time string
 */
export function formatDateTime(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Get initials from a name (e.g., "John Doe" -> "JD").
 *
 * @param name - Full name string
 * @returns 1-2 character initials, uppercase
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
