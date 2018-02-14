# sytac

## Setup

First of all we need to install a node.js environment

To setup all modules is mandatory install all dependencies

```
npm install
```

The project has been developed in ionic, so we can choose several platforms to deploy it.
In our case, we are going to deploy it in browser. To do that is necessary to install the platform.

```
ionic cordova platform add browser
```

After that we can deploy our project in local:

```
ionic build
```

The application will be deployed in `./platforms/browser/www`


## About Code
 * Code has been commented following JSDoc guides.
 * The project can scale adding new properties to database.
 * The project has been structured following ionic/angular guides structures (model-controller-view).
 * It has been programming using basic and small functions (keep it simple). 

## Testing
* Tests has been written in Mocha.
* There are unit testing for services.
* There are not integration or regression due to the simplicity of the project.
* You can execute all test executing:

```
npm run test
```

### Design + CSS
* Design has been implementing following material UI interface (ionic).
* Responsive design for computers and mobiles.
* Creating a new and modern interface based on old design images. 
  * New images has been created with GIMP.
* Using sass for implementing personal design.