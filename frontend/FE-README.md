# Kitchen Served Frontend

## Run: 
cd `frontend`
install dependencies - `npm install`
start the app - `npm start`

## Prod build:
create an optimized production build : `npm run build`. To copy the files into ec2, check the TF-README.md in the `Run BE and FE apps in ec2` section.


## Running with Docker
Build and run:
`docker build --platform linux/amd64 --no-cache -t kitchen-served-fe .`
`docker run -p 3000:3000 kitchen-served-fe`

### [Not needed anymore] Push image to ecr
Authenticate Docker to ECR registry:
`aws ecr --profile=qube get-login-password --region us-east-1 | docker login --username AWS --password-stdin 975050311957.dkr.ecr.us-east-1.amazonaws.com`

Tag the Docker image:
`docker tag kitchen-served-fe:latest 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-fe-latest`

Push to ECR:
`docker push 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-fe-latest`


Access the app on `44.203.43.176`. sample curl:
`curl --location --request GET 'http://44.203.43.176:8000/recipes'`


## Notes (Do not run the commands in this section. They are for reference only.)
To build the production app, run `npm run build`. it uses the .env.production file for environment variables by default.

app was created by `npx create-react-app menu-app`
dependencies added: `npm install tailwindcss lucide-react`, `npm install axios`, `npm install react-hot-toast`
tail wind css setup: `npx tailwindcss init -p`

## Formatting and linting
To format javascript, html and css, use the  [vscode prettier linting tool](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Install:

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.
`ext install esbenp.prettier-vscode`

Open use settings with `Cmd + Shift + P> Preferences: Open user Settings  (JSON)`

add: 
``` bash
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
```

To use the tool;
Format all files in a folder (recommended to run this in the  kitchen-served-fe-app dir before opening a PR):
 `npx prettier --write .` (This will use the dev dependeny in the package.json)

These will use the plugin installed in VS code:

``` bash
1. CMD + Shift + P -> Format Document
OR
1. Select the text you want to Prettify
2. CMD + Shift + P -> Format Selection  
```