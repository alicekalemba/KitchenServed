# Kitchen Served Frontend

Note: 
app was created by `npx create-react-app menu-app`
dependencies added: `npm install tailwindcss lucide-react`, `npm install axios`
tail wind css setup: `npx tailwindcss init -p`

Run: `npm start` to start the app


## Running with Docker
Build and run:
`docker build -t menu-app .`
`docker run -p 3000:3000 menu-app`

## Notes
To build the production app, run `npm run build`. it uses the .env.production file for environment variables by default.
