# BACKEND   <!-- organize properly -->

1. src/index.js is the main file.
2. src/routes/auth.routes.js is the file where login, logout and signup routes(API) are written.
3. auth.routes.js is connected to src/controllers/auth.controller.js file as login, logout and signup page code is written.
4. For creating a new user in auth.controller.js the user schema is defined in user.model.js.
5. lib/db.js is used for connecting to MongoDB.
6. MongoDB_URI and PORT is defeined in .env file, these variables can be accessed using process.env.PORT.
7. bcrypt package is used to hash the password rather than storing the password directly.
8. After creating a new user generate the jsonwebtokens(utils). After generating send the tokens using cookies.
9. Test using Postman API when ever required
10. For login - We have to check the user exist in the database and checking the password
11. For logout - we are just clearing the cookies and expiring the token we generated
12. For updating profile pic - we must check if user is logged in
13. To check user logged in using protectRoute( auth.middleware.js ) 
14. In protectRoute we have to grab the token using cookie-parser and from the token extract the user Id 
15. To use cookie-parser declare it in index.js file first 
16. using the userID call the next function for updating the profile picture
17. For uploading the picture we use the cloudinary package(.env file and cloudinary.js(for configuration))
18. We have written the code for updating the profile pic in the controller.js
19. checkAuth is to refresh the page 
    
## Messages
1. create the message.model and define the schema of the messages ( sender, reciever and typeofmessage)
2. In index.js define the message route, which is a main route (app.use()) messageRoutes connect this to message.route.js file
3. In message.route.js file define the endpoints
4. First end point is the fecting all the users to display on the left side ( excepth the sender or myId ) - getUsersForSidebar
5. getMessages - when user openned the chat ( fetching all the messages b/w user and receiver )
6. sendMessage - this endpoint is to send the messages 

# FRONTEND
1. Install Tailwind CSS and its dependencies using npm install -D tailwindcss postcss autoprefixer vite.
2. Use the command npx tailwindcss init -p to generate the postcss.config.js and tailwind.config.js files.
3. In tailwind.config.js, update the content array to include paths to your template files. For example:
            /** @type {import('tailwindcss').Config} */
            module.exports = {
            content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
            theme: {
                extend: {},
            },
            plugins: [],
            }
4. Add Tailwind directives to your CSS file, such as @tailwind base; @tailwind components; @tailwind utilities;
5. Delete App.css and update App.jsx
6. Using daisyui for the builtin components ( https://daisyui.com/docs/install/ )
7. install daisyui and update tailwind.config.js
8. in main.jsx update the BrowserRouter react
9. add page routers in the app.jsx and create the pages
10. Install axios and zustand
11. 