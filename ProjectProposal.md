MAKE GIT REPO FOR THIS AND PUT IT ONLINE

# 1. General Overview
The idea of my app is an antiderivative calculator. It would be used by those who want to double-check their answers for common indefinite integrals. This is useful because sometimes you forget how to do certain kinds of integrals, or sometimes you are unsure how constants affect the integral, so this will hopefully be a helpful resource for integration.

# 2. Feature List
## Must-Have Features
* As a user, I should be able to access a list of types of indefinite integrals, choose the one I want, and put in my constants. After hitting a button, I should be able to see a solution to the integral.
* As a user, I should be able to make an account, and when logged in, the antiderivatives that I have previously done should be saved in a history which can be easily accessed.
* As a user, the types of integrals and the calculated solution should be displayed in nice, mathematical type.
* As a user, there should be a strong selection of integrals, and any possible location with constants should have a constant so that it can be most generally used.

## Nice-To-Have Features
* As a user, when calculating the solutions, intermediate steps should also be shown in nice, mathematical type.
* As a user, I should be able to copy LaTeX from any solution or intermediate step.

# 3. Technical Challenges
I anticipate having challenges figuring out how to display math. Having done a bit of research, there may be an API I can use to input LaTeX and get something I can display out of it. I may have to use a different library which requires very verbose syntax.

I also anticipate having challenges with structuring the database such that all the right data is preserved in the history.

# 4. Requirements
The app will be built in react and django.

The front page of the app will have links to sign up or sign in, and when the user is signed in, it will have a link to the user's antiderivative history. It will also display the templates for the integrals it can solve, with boxes to put in your constants. When an integral is requested, the integral is done by the server, and the information about the request is stored in the user history. Once the integral is computed, the user is redirected to a page with the solution, which has a back button to the main page.

In both the main page and the history, if the functionality is implemented there is a button near the computed integrals which allow the user to see the steps. The steps should come with the response from the server, and the user should be able to hit the button to expand or retract the steps from the same page.
