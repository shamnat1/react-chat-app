# FileUploadApp
### upload xml/csv files and upload it's content to mysql 


FileUploadApp is a express js app which helps uploading CSV/XML files. XML file contains product details and the information is saved mysql DB. Inventory content is included in csv file. Sample files are added in in sample folder

## Installation

clone the application to local folder

Install all the npm packages 

```bash
npm install 
```

## Set up .env variable

Setup your mysql database and add these info in env file

```
NODE_ENV=development
PORT=8080
HOST=127.0.0.1
USERNAME=root
PASSWORD=
DB=file_upload
TEST_DB=file_upload_test
DB_PORT=8889

```

## Passwordless authentication with github 
you need to create a GitHub OAuth App. [Go to your Developer Settings] page and click "New OAuth App." Make sure you create a new OAuth App, not a new GitHub App.Once you've created a GitHub OAuth App, note the Client Id and Client Secret and save it in .env file

```
GIT_CLIENT_ID=
GIT_SECRET_KEY=
```



## Run App

```
npm start
```

upload CSV and XML file and uploaded file history will be displayed .

## Web hook
 Every time a row gets updated or created it will call a web hook in pipedream.com 


## Testing

Unit test is written with jest and selenium-webdriver is used for automation 

```
npm test
```

[//]: #
[Go to your Developer Settings]:<https://github.com/settings/developers>