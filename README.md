# Development folder structure and gulpfile.js structure

The development workflow was built using gulp.js as the main task runner. It works by using a specific development folder structure to facilitate the copy and paste of files between the development and the production folder structure. 

The development folder structure has to be the following:

```
├── cms
├── dev
│   ├── assets
│   │   ├── _js
│   │   │   ├── main.js
│   │   │   └── vendors
│   │   ├── _scss
│   │   │   ├── components
│   │   │   ├── main.scss
│   │   │   └── vendors
│   │   ├── fonts
│   │   └── img
│   ├── entry.js
│   ├── media
│   └── templates
│       └── layouts
├── gulpfile.js
├── package-lock.json
└── package.json
```

The root folder of the project is going to have two main sub folders ‘cms’ and ‘dev’ (it also includes two main files ‘gulpfile.js’, ‘package.json’). The ‘cms’ folder contains all the files needed for craft 3 to work. This folder won’t be edited unless there has to be a change in a craft related file.

The ‘dev’ folder is where all development is going to happen. It has three subfolder: ‘assets’, ‘media’ and ‘templates’ as well as one javascript called ‘entry.js’ (this file is not to be edited unless you know what are doing with gulp).

* assets
    * All scss|sass|css, javascript and images (images that the client won’t be adding or deleting) are going to be added in this folder. 
    * There are two ‘main’ files inside the _js and _scss folders. In this files is where all the imports are going to be made. Eg: an scss file called hero.scss is created inside the ‘components’ folder. This file has to be imported in the main.scss by using scss import syntax (@import ‘components/hero’), this is so is taken into consideration by gulp. This also has to be done with javascript files inside the _js folder.
* media 
    * This folder contains only images that can be added or deleted by the client through the cms.
* templates 
    * This folder includes all the HTML files either using twig templating language or not.

The task runner has three main commands:

* gulp watch
    * This command will start the development environment by creating a local server and watching changes in any file inside the dev folder.
* gulp build —production
    * This command will prepare, compile and compress all the files inside the dev folder and put them inside the cms folder (including raw dev files).
* gulp buildDev
    * This command is used to go backwards in the dev process. It copies files located in dev_files folder and places them inside the dev folder to start development. *This command will only work if the development of the project was initiated using this workflow.* Eg: You started a project using this workflow and it was pushed to production time ago. If you want to make changes on the project you would pull from the server and run this command. After this you will be able to develop as normal.


---

# Development Workflow

This workflow will be devided into cases, each case would follow a specific number of steps and tasks to be run.
The cases are the following

* Development from scratch
* Pushing to staging or production
* Development from existing project

---

## Development from scratch:
1. Create root folder for the new project and name it ‘projectname’.’domain’  (eg: uberrito.com). 
2. Move into the project folder and clone the development workflow structure repo from [here](https://github.com/wearealloy/web-workflow). This will place a few files and the dev and cms folders inside the project root folder.
3. Download Craft 3 CMS from [here](https://docs.craftcms.com/v3/installation.html#step-1-download-craft) and place the files inside the cms folder located in the root of the project.
4. Follow Craft 3 installation instructions [here](https://docs.craftcms.com/v3/installation.html#step-1-download-craft) 
    1. Follow steps [here](https://www.evernote.com/l/AAdH90XLgkdDfKnv7NvFTKlAbUJ_RGApuI4) in case you need help installing the cms web host for the first time.
5. Locate the file ‘.env.example’ at root > cms > example_files and copy and paste its content in the ‘.env’ file located in root > cms (make sure that the variables between the two files have the same values. Eg: db_user = “admin” in both of them).
6. Locate the file ‘general.example.php’ at root > cms > example_files and copy and paste its content in the ‘general.php’ file located in 'root > cms > config’.

After this steps you are ready to start development on your new project. All development will happen in the dev folder. Do not delete any files that came within the folder.

* To start development go to the root folder using the terminal and type the command: ‘gulp watch’ (read section above for more info on this command)
* scss|sass|css files go inside 'dev > assets > _scss’, js files go inside 'dev > assets > _js'
* Any time you want to add  scss|sass|css or js files, they have to be included in the main.scss or main.js files respectively. If not they won’t be taken into consideration when watching or building the files for production.
* All HTML files go inside the template folder. Twig can be used to write HTML files with no issue.
* Images can go inside ‘dev > assets > img’ or ‘dev > media’ depending on the use.

---
 
## Pushing to staging or production:
Go to root folder of project using terminal and run the command ‘gulp build —production’ (more info in section above)
1. Create database in the server following this convention names and settings
    1. name: [project]_cmsdb_[prod/staging]
    2. username: [project]_craft3
    3. collation: utf8_general_ci
2. Edit ‘.env’ file located at ‘root > cms’
    1. Comment out local environmental variables
    2. Add staging environmental variables (db user, db password, db name)
3. Move entire cms folder inside project folder to server.

---
   
## Development from existing project:

```diff
- This case only applies if the development of the project was initiated using this workflow.
```
This case only applies when you are going to start or continue development from a project that you pulled from         production or staging.

1. Create root folder for project if it doesn’t exist and name it ‘projectname’.’domain’  (eg: uberrito.com).
2. Export db from server and import it locally
3. Clone the [web-workflow](https://github.com/wearealloy/web-workflow) repo and place it inside the root folder.
4. Download all files from staging or production server and place them inside the cms folder located in the root of the project.
5. Edit ‘.env’ file located at ‘root > cms’
    1. Comment out staging or production environmental variables
    2. Add local environmental variables (db user, db password, db name)
6. Run the command ‘gulp buildDev’ from the root of the project.

    You are now ready to start development. Read after steps on the 'Development from scratch’ case for more info.


---

As for 10/23/2018 this workflow is optimized to work with Craft CMS 3.0.27.1 (Solo Version)
If there happens to be a change in craft cms folder structure, the gulpfile.js would have to be updated.

