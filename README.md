*As for 10/23/2018 this workflow is optimized to work with Craft CMS 3.0.27.1 (Solo Version)
If there happens to be a change in craft cms folder structure, the gulpfile.js would have to be updated.*

*Foundation version: v6.5.0-rc.4*

---


# Development folder structure and gulpfile.js structure

The development workflow was built using gulp.js as the main task runner. It works by using a specific development folder structure to facilitate the copy and paste of files between the development and the production folder structure. 

The development folder structure has to be the following:

```bash
├── cms
├── dev
│   ├── assets
│   │   ├── _js
│   │   │   ├── main.js
│   │   │   └── scripts
│   │   │       └── vendor
│   │   │           ├── foundation.min.js
│   │   │           ├── jquery.js
│   │   │           └── modernizr-custom.js
│   │   ├── _scss
│   │   │   ├── components
│   │   │   │   ├── _readme.md
│   │   │   │   └── global.scss
│   │   │   ├── main.scss
│   │   │   └── vendor
│   │   │       ├── foundation.min.css
│   │   │       ├── readme.md
│   │   │       ├── slick-theme.scss
│   │   │       └── slick.scss
│   │   ├── fonts
│   │   │   └── readme.md
│   │   └── img
│   │       └── readme.md
│   ├── entry.js
│   ├── media
│   │   └── readme.md
│   └── templates
│       ├── _layout.html
│       └── index.html
├── gulpfile.js
├── package-lock.json
├── package.json
└── webpack.config.js
```

The root folder of the project is going to have two main sub folders `cms` and `dev` (it also includes two main files `gulpfile.js`, `package.json`). The `cms` folder contains all the files needed for craft 3 to work. This folder won’t be edited unless there has to be a change in a craft related file.

The `dev` folder is where all development is going to happen. It has three subfolder: ‘assets’, ‘media’ and ‘templates’ as well as one javascript called `entry.js` (this file is not to be edited unless you know what are doing with gulp).

* assets
    * All scss|sass|css, javascript and images (images that the client won’t be adding or deleting) are going to be added in this folder. 
    * There are two `main` files inside the `_js` and `_scss` folders. In this files is where all the imports are going to be made. Eg: an scss file called `hero.scss` is created inside the `components` folder. This file has to be imported in the `main.scss` by using scss import syntax (`@import ‘components/hero’`), this is so is taken into consideration by gulp. This also has to be done with javascript files inside the `_js` folder.
* media 
    * This folder contains assets that can be added or deleted by the client through the cms.
* templates 
    * This folder includes all the HTML files either using twig templating language or not.



## Development workflow for craft 3 projects:

This workflow will be devided into cases, each case would follow a specific number of steps and tasks to be run.
The cases are the following

* Development from scratch
* Pushing to staging or production
* Development from existing project



## Development from scratch for Craft 3 project:

1. Run the command `alloy new` where you want to create the new project,  select the project type (craft or simple), then type the name of the project with no spaces.
2. Rename `.env.example` file to `.env`
3. Follow Craft 3 installation instructions **steps 2 to steps 5** from [here](https://docs.craftcms.com/v3/installation.html#directory-structure). Summary of craft steps:
   - [Step 2](https://docs.craftcms.com/v3/installation.html#step-2-set-the-file-permissions): Set permissions.
   - [Step 3](https://docs.craftcms.com/v3/installation.html#step-3-set-a-security-key): Set the key.
   - [Step 4](https://docs.craftcms.com/v3/installation.html#step-4-create-a-database): Create database (use convention below).
     - name: [project]_cmsdb_[prod/staging]
     - collation: utf8_general_ci
   - [Step 5](https://docs.craftcms.com/v3/installation.html#step-5-set-up-the-web-server): Set up web server.
     - Follow steps [here](https://www.evernote.com/l/AAdH90XLgkdDfKnv7NvFTKlAbUJ_RGApuI4) in case you need help installing the cms web host for the first time.
     - **Remember** to point the vhost to ```root/cms/web/``` folder!
4. Edit `.env` file inside `project-name/cms/`. Fill the `db_user`, `db_password`, `db_database` variables.
5. Open ```gulpfile.js``` located in the root folder of the project, locate the variable ```vHost``` on line 22. Edit it and add the vHost url you are using to run the local environment.

------

After this steps you are ready to start development on your new project. All development will happen in the dev folder. Do not delete any files that came within the folder.

- Remember to check for craft updated when you are on CMS control panel.

- To start development go to the root folder using the terminal and type the command: `alloy watch` 
- scss|sass|css files go inside ```dev/assets/_scss```, js files go inside ```dev/assets/_js```
- Any time you want to add  scss|sass|css or js files, they have to be included in the main.scss or main.js files respectively. If not they won’t be taken into consideration when watching or building the files for production.
- All HTML files go inside the ```template/``` folder. Twig can be used to write HTML files with no issue.
- Files go inside ```dev/assets/img/``` or ```dev/media``` depending on the use.
- Since craft uses the ```web/``` directory as entry point, all references in html, css and js files need be relative to that directory.



## Development continuation from Git pull:

1. Pull the project from github.
2. Go to projet folder and run the command `npm install` to install dependencies.
3. Set up vhost using same name located on line 22 in `gulpfile.js` 
4. Rename `.env.example` file to `.env` (file located in cms folder).
5. Create new db for project using convention below.
   - name: [project]_cmsdb_[prod/staging]
   - collation: utf8_general_ci
6. Update `.env` file to match credentials of db.
7. Import updated db for project into the created db.

Run `alloy watch` to continue development.



## Pushing to staging or production:

Go to root folder of project using terminal and run the command ```alloy build``` 
1. Create database in the server following this convention names and settings
    - name: [project]_cmsdb_[prod/staging]
    - collation: utf8_general_ci
2. Move entire cms folder inside project folder to server.
3. Edit `.env` file located at ‘root > cms’
    1. Comment out local environmental variables
    2. Add staging environmental variables (db user, db password, db name)
4. Once on the server, find the dev_files folder and change permissions to '644'.

---

## Development from existing project:

```diff
- This case only applies if the development of the project was initiated using this workflow and the initial development files are lost.
```
This case only applies when you are going to start or continue development from a project that you pulled from         production or staging.

1. Create root folder for project if it doesn’t exist and name it ‘projectname’.’domain’  (eg: uberrito.com).
2. Export db from server and import it locally
3. Clone the [web-workflow](https://github.com/wearealloy/web-workflow) repo and place it inside the root folder.
4. Download all files from staging or production server and place them inside the cms folder located in the root of the project.
5. Edit ‘.env’ file located at ```root/cms/```
    1. Comment out staging or production environmental variables
    2. Add local environmental variables (db user, db password, db name)
6. Run the command ```npm run buildDev``` from the root of the project.

    You are now ready to start development. Read after steps on the 'Development from scratch’ case for more info.


