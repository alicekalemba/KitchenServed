# Kitchen Served Frontend

## Run: 
install dependencies - `npm install`
start the app - `npm start`


## Running with Docker
Build and run:
`docker build -t menu-app .`
`docker run -p 3000:3000 menu-app`

## Notes (Do not run the commands in this section. They are for reference only.)
To build the production app, run `npm run build`. it uses the .env.production file for environment variables by default.

app was created by `npx create-react-app menu-app`
dependencies added: `npm install tailwindcss lucide-react`, `npm install axios`
tail wind css setup: `npx tailwindcss init -p`
