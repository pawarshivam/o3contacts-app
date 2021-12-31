const shouldShowErrorFor = (query, field) => {
    if (query.isError) {
        const errors = query.error.response.data.data.errors;
        if (errors) {
            if (errors[field]) {
                return true;
            }
        }
    }
    return false;
}

const getHelperText = (query, field) => {
    if (query.isError) {
        const errors = query.error.response.data.data.errors;
        if (errors)
            if (errors[field] === undefined) {
                return '';
            } else {
                if (errors[field].message) {
                    return errors[field].message;
                }

                // Fallback error message
                return `Invalid value ${errors[field].value} for field ${field}`;
            }
    }
    return '';
}

export {
    shouldShowErrorFor,
    getHelperText,
};