// utils/dateUtils.js
export const formatDate = (date, format = 'MMM DD, YYYY') => {
    if (!date) {
        console.warn('formatDate: received null/undefined date');
        return 'No date';
    }

    try {
        // Handle both publishDate and publishingDate
        let dateValue = date;

        // If date is an object with publishDate property
        if (date && date.publishDate) {
            dateValue = date.publishDate;
        }

        const dateObj = new Date(dateValue);

        if (isNaN(dateObj.getTime())) {
            console.warn('formatDate: invalid date:', dateValue);
            return 'Invalid date';
        }

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const day = dateObj.getDate();

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        switch (format) {
            case 'MMM DD, YYYY':
                return `${months[month]} ${day}, ${year}`;
            case 'MMMM DD, YYYY':
                const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
                return `${fullMonths[month]} ${day}, ${year}`;
            default:
                return `${months[month]} ${day}, ${year}`;
        }
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
};