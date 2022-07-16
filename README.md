This App works simultaneously in one browser between several tabs (sync works by redux-state-sync)

All data except the current user is stored in browser Local Storage (with redux-persist) and is available even after reloading the page in the browser.

Reloading the page will log-out the current user. But since user data is stored in Local Storage, you can log-in again.

### Instalation:
#### `npm install`

### Running:
#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
