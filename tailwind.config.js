module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: theme => ({
                ...theme("colors"),
                "shadow-glow-orange": "0 0 0 3px rgba(239, 68, 68, 0.5)",
            })
        }
    },
    plugins: [],
};