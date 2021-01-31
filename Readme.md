#### Project uses Mustache.js for web templating.

Your mustache template and data files go into this folder

```bash
src/mustache-template-and-data/
```

Template and Data file must be of the same name Eg:  
```bash
template.html <- template file  
template.json <- data file
```

### Run
```bash
yarn start
```

This starts a live server of the `preview` folder.  
The `preview` folder is where you can find the bound html for the templates.  
  
The live server makes sure that the html you see reloads the browser when the html in that folder changes.  
Mustache Template/Data changes are picked up and built into html on the go.  
  
_**Note**_: However there's a catch. All Mustache templates must have a `<head></head>` tag.  This is because a script is injected into every html by the live server to refresh browser via sockets.  

### Build
```bash
yarn build
```
Builds all the Mustache templates into `preview` folder.  
