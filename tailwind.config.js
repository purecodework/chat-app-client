module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flexGrow: {
        2: 2,
      },
      height: {
        "1/10": "10%",
        "8/10": "80%",
        "1/20": "5%",
        "19/20": "95%",
        "9/10": "90%",
      },
    },
  },
  plugins: [],
};
