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
10. Install axios and zustand( global state management library )
11. create a axios Instance so that i can use when ever i want ( lib/axios.js/axiosInstance )
12. create a store folder and useAuthStore.js ( this is a hook, when ever we need we call it and destructure it and use it).
13. simply we are using axios for communicating frontend with backend
14. Use destructure useAuthStore.js in App.jsx and use the authUser data in App.jsx to check the user is logged in or not 
15. When checking we are displaying the loading icon
16. **CORS** stands for Cross-Origin Resource Sharing. Its a security feature that prevents unauthorized requests from one domain (origin) to another.
17. frontend on: http://localhost:5173 And your backend API is on: http://localhost:5001
These are considered two different origins (different ports = different origins), so browsers block requests from one to the other by default unless CORS is enabled.

## Building the signup page
1. For left hand side build the UI using react, tailwind and daisy
2. For right hand side use code from AuthImagePattern
3. Bunch of functions to check the user entered data and to to store the data
4. validateForm checks the user entered data with some rules, using toast to generate the error or success message popup
5. captured entered data will pass to the useAuthStore and signup using axiosInstance post method 

## Building logout on Navbar section
1. same logic in useAuthStore build logout function using axiosInstance

## Building login
1. pretthy much same as signup page, some UI stuff in login page connect the page to useAuthStore

## updating-profile 
1. some ui in profile page and also For uploading the image 
2. once user upload the image grab the image and create a FileReader and convert the image in to base64URL and send the image to the updateProfile and process it

## Settings page
1. added some defalt messages and themes ( Themes from daisyui is working only if we use daisyui 4.12.24)
2. selected theme should shore in the localstorage handled in the useThemeStore file
   

How are we writing code in Store folder
1. Inside a async function, set a value and
2. create try catch and finally block and in try call the axiosInstance using respective endpoint and get the data
3. catch if any error accros in the process


-> UseEffect should be run without any condition (this is just a side function). When React UI loads the useEffect function will execute.





**MessageInput field** : A box for input and a field to upload image and a send button and preview option for an image


Handling image uploads:
1. when user upload a image grab the image using e.target.file[0] (first one)
2. then check if image is uploaded or not
3. if image then create a File Reader and preview it if needed

Build the message section using Daisy UI
sender has className of class-end and reciever has class name of class-start and other bunch of classNames such as class-bubble




Socket IO (Realtime messages sent using socketio)
1. B/w sender and reciever there will be socketio. which listens for the events or react
2. for backend socket.io server and for frontend we have socket-client

in BackEnd
1. create a socket.js file in backend and initialise the app and connect the app with the server
2. from the server initialize the socket.io server
3. use this server and app in the index.js

in FrontEnd
1. when login and signup or refresh use socket.io-client connect with socket.io
2. use disconnectSocket in logout function

for realtime messages :
1. we will implement in message.controller, if we recieve a new message we will send to the person
2. in chatstore append the new messsage to old messages in the subscribeToMessages function
   











