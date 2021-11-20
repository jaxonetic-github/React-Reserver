 module.exports = {
    transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
/*  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },*/
 // testMatch: ['<rootDir>/Test/?(*.js)'], // finds test
 // testPathIgnorePatterns: ['/node_modules/', '/public/'],
//   transformIgnorePatterns: [
  //   '/node_modules/(?!@react-native|react-clone-referenced-element|react-navigation|native-base-shoutem-theme|@square|react-square-web-payments-sdk|@react-native/polyfills/error-guard)',
   //],
   //testRegex: '/src/Tests/.*|((\\.|/*.)(spec))\\.mjs?$',//'/__tests__/ProfileViewSpec.js',
//   // "setupFilesAfterEnv": [ "<rootDir>/jest.setup.js" ]
 //    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
