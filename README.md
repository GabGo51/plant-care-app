
# BLOOM Plant care app Project

Welcome to BLOOM my first full stack solo project. This was the final project of my bootcamp. The aim was to create a plant care website/app where you could add plant to your collection to keep track of when to water them. User can add, remove , search and water the plants.

## Feature

- **Sign Up**: User can create an account that gets posted in the db
- **Log In**:User can Log In using the account in created 
- **Search Plant**:User can search for a specific plant with the help of a typeahead search bar
-**View Plant**:User can view information about a specific plant
- **Add Plant**:User can add a plant to its Garden. User can have multiple plants in his collection
- **Water Plant**:User can water the plants in his collection resseting the water timer on them
- **Delete Plant**:User can remove a plant from his collection(hopefully not because it died)
- **Edit Profile**:User can add a name to its profile
- **Log Out**:User can Log out from the website
-**Responsive Design**: Design is responsive for Phone, Tablet, and Computer screen 


The repository has the following folder structure:

### Client
- Public: Contains the index.html file.
- Src: Contains the components folder, the Img folder, App.js and Index.js
- Components: Contains reusable components used throughout the application.
- Styles: Contains global styles and styled components.

### Server
- Handlers: Contains the handlers function
- batchImport.js
- index.js

## Technologies Used

- **FrontEnd**: HTML, CSS, JS, REACT
- **BackEnd**: Node.js, Express.js
- **Database**: MongoDb

Those are the technologies I learned during the bootcamp. 

## About the Data

The application utilizes JSON data to populate the plants and users information. Here's an example of the JSON structure for the plants:

### Plant Object

```js
 {
    "id": 1,
    "common_name": "European Silver Fir",
    "scientific_name": [
       "Abies alba"
      ],
    "other_name": [
      "Common Silver Fir"
          ],
    "cycle": "Perennial",
    "watering": "Frequent",
    "sunlight": [],
    "default_image": {
        "image_id": 9,
        "license": 5,
        "license_name": "Attribution-ShareAlike License",
        "license_url": "https://creativecommons.org/licenses/by-sa/2.0/",
        "original_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg",
        "regular_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg",
        "medium_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/medium/49255769768_df55596553_b.jpg",
        "small_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/small/49255769768_df55596553_b.jpg",
        "thumbnail": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/thumbnail/49255769768_df55596553_b.jpg"
        }
    },
```

### User Object

```js
{

  "_id": "64ac4a0effb1bb4eae3a43bc"
  "email": "snow.gabo51@gmail.com"
  "password": "hello1234"
  "time": "July 10 2023"
  "gardenId": "dfb80147-5ffe-4787-9ba4-ce6e4872ddbe"
  "name": "Gabriel Gosselin"
}
 
```

## API Endpoints
To support the desired functionalities of my Plant-Care  website, the backend provides a set of RESTful endpoints. Here are the available endpoints:

- GET /api/get-plants: Retrieve all plant available.
- GET /api/plant/:plantId: Retrieve details of a specific plant.
- GET /api/garden/:gardenId: Retrieve all plants associated with the users garden.
- POST /api/add-user: Add a user in the All-Users Database collection.
- POST /api/add-plant: Add a plant in the garden of a specific user.
- POST /api/signinemail: Passes back the user information to the front end w/o the password 
- POST /api/signin: Gets the info of the user trying to sign in.
- DELETE /api/delete-plant/:plantID: Delete one plant from the user's garden.
- PATCH /api/water-plant/:plantId: Update the waterTime of a plant in the garden.
- PATCH /api/add-name/:userId: Update the name of the user in the profile page.


These endpoints cover essential functionalities such as retrieving plants, managing the garden, and viewing profile.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)