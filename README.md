# Antiderivative Project
## Setup
Once the repo is downloaded, navigate to client/ and run `npm install` to install the dependencies. Then navigate to _server/ and make sure that you have `poetry` installed on your computer, and run `poetry install` to install the server dependencies.
## How to run
Open two separate terminal instances, and use one to navigate to client/ and run `npm run dev` to set up the web environment. In the other instance, navigate to _server/ and run `poetry shell`, then run `python3 manage.py runserver`. Now you can access the app at `localhost:8000`.
## Antiderivatives
Antiderivatives are added through the `localhost:8000/admin` page. Make an admin account by running `python3 manage.py createsuperuser` and following those directions. Once you log into the admin page, add Antiderivative objects, adding the starting integral text into InputLatex, and adding the template of the solution into SolutionTemplate . Constants should be marked like this: `{;a;}` or `{;b;}`, with any single letter inside. Then make Constant models which correspond to those letter. Make the name of the Constant the same as what you put inside the `{; ;}`. Assign the Constant to the Antiderivative which it corresponds to.
### Antiderivative Example
* Antiderivative
  * InputLatex: \int e^{{;a;}x}\cos({;b;}x)\,dx
  * SolutionTemplate: e^{{;a;}x}\frac{{;b;}\sin({;b;}x)+{;a;}\cos({;b;}x)}{{;a;}^2+{;b;}^2}+C
* Constant1
  * Name: a
* Constant2
  * Name: b

# 2610 Django + Vite Starting Point
This project serves as a starting point you to use as a starting point for Django applications that use Vite as the asset server for development. You are welcome to us this project for all of your assignments beginning with Module 5.

## Strategy
This application is a hybrid MPA and SPA. It reuses all of the login stuff that we did at the end of module 3 - there is a separate page for signup/signin. Once a user is logged in they are redirected to the / view which then renders the SPA application created using React and Vite.

## Creating a new application
1. Clone the repo `git clone git@github.com:dittonjs/2610DjangoViteStarter.git <your-new-project-name>`. Replace `<your-new-project-name>` with the name you want give to your project.
   - If you are using GitHub for version control, a better option would be to fork the repository instead of clone it.
3. Open the pyproject.toml file and change the `name` property. You should use `-` to separate words in your name for this property.
4. This project was set up using Python 3.11. You might have an older version installed. If you run into an error later that says that your activated Python version isn't compatible, the in the pyproject.toml file, just change the version there to match the version that you have installed. If you do this, you need to make sure that the lock file gets regenerated. You can do this by running `poetry lock --no-update` or by simply deleting the poetry.lock file (it will get regenerated when you run poetry install)/

## Initial Setup
1. Change the name property in the `pyproject.toml` file to be something unique to your project.
1. In the root directory, install the python dependencies `poetry install`
2. In the `client` directory, install the javascript dependencies `npm install`
3. In the `_server` directory, create a new file called `.env`
4. Copy the contents of `_server/.env.example` into the newly created `.env` file.
5. Activate the poetry env `poetry shell`
6. In the `_server` directory, run the migrations `python manage.py migrate`

## Running the appliction
1. In the `client` directory run `npm run dev`
2. In the `_server` directory (with your poetry env activated) run `python manage.py runserver`
3. Visit your application at `http://localhost:8000`

## Using this project for future classes/personal projects
Many students in the past have chosen to use this starter app template for projects in other classes like CS3450 and for personal projects. I strongly encourage you to do so! Please check with your other instructors before you use this project as a starting point for their classes. You may also want to add your name to the author field in the `pyproject.toml` file.
