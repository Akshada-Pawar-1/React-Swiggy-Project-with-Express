# Setting up testing in our APP

- Install React testing library
- Install jest
- Install babel dependancies (Refer jest site)
- Configure babel
- Configure parcel config file to disable default babel transpilation (Refer parcel.org)
- Jest - npx jest --init
- Install jsdom library
- Install @babel/preset-react - To make JSX work in test cases
- Include @babel/preset-react inside our babel.config.js
- Install --> npm i -D @testing-library/jest-dom

# Creating test for Header component

- In Header component <Link> is used & test is failing at that point
- I'm using 'react-router' for Link, I was getting >> ReferenceError: TextEncoder is not defined
- For this I followed 4 steps

1. Install text-encoding
   npm i -D test-encoding

2. Update jest.config.js:
   Added this setupFiles: ["<rootDir>/src/setupTests.js"], after coverageDirectory: "coverage",

3. Polyfill in src/setupTests.js: Add the TextEncoder and TextDecoder polyfill .
   Create setupTests.js file under src & added below code (no other code worked)

   // src/setupTests.js
   if (!global.TextEncoder) {
   global.TextEncoder = require("util").TextEncoder;
   }
   if (!global.TextDecoder) {
   global.TextDecoder = require("util").TextDecoder;
   }

4. Run the tests: Execute npm test to confirm everything is working.
   Ensure in test file Header component is wrapped like this
   <BrowserRouter>
   <Provider store={appStore}>
   Header Component
   </Provider>
   </BrowserRouter>

# Finding Specific Button in multiple buttons

const loginButton = screen.getByRole("button", { name: "Login" });
