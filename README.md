
# Rough Sketch


A simple web-based diagram sketch using [Svelte](https://svelte.dev/) and the delightful
[Rough.js](https://roughjs.com/) graphic library.


## How to Build

Install dependencies

    npm install

Run the development server:

    npm run dev

This will start the server on port 8080 — navigate to [localhost:8080](http://localhost:8080).

(By default, the server will only respond to requests from localhost. To allow connections from other
computers, edit the `sirv` commands in `package.json` to include the option `--host 0.0.0.0`.)

To build for production:

    npm run build

The production build is stored in `public/`

To run the production build:

    npm run start
    
(This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's
`dependencies` so that the app will work when you deploy to some platforms.)

