<h2>Requirements:</h2>

- Node.js
- Keycloak
- MongoDB
- Git

<h2>Setup:</h2>

- 

- Environmental Variables
    - In the root folder create a file called .env
    - Open the .env file and add environmental variables each on a seperate line as follows replacing the portions after the = sign with the information as applicable to your environment
        - DB_CONN=Your mongoDB uri
        - DB_CONN_TEST=A seperate mongodB uri for a testing database
        - KC_TOKEN=The secret key for your Keycloak backend client

- Keycloak Server
    - Keycloak Authentication Setup
        - Create a realm called omrs
            - In the "Realm Settings" -> "Login" tab make sure "User Registration", "Edit Username", and "Login With Email" are set to "On"
            - In the "Realm Settings" -> "Token" tab set the token timeout settings as desired
        - In the "Clients" section create a client for the Node/Express backend called "omrs-be" with "Access Type" set to "bearer-only"
            - In the "Clients" -> "omrs-be" -> "Roles" tab create an "admin" role and a "user" role
        - In the "Clients" section create a client for the React frontend called "omrs-fe" with "Access Type" set to public
            - In the "Clients" -> "omrs-fe" -> "Roles" tab create an "admin" role and a "user" role
        - In the "Roles" section create a role called "app-admin" and "app-user"
            - After clicking save set "Composite Roles" to "On"
            - In the "Client Roles" drop down select omrs-be and add the admin role to the "Associated Roles" for app-admin and user to "Associated Roles" for app-user 
            - Repeat this process for the "omrs-fe" option in the "Client Roles" drop down
        - In the "User" section create a user with username omrs-admin and omrs-user
            - It is required to give the user an email, first name, and last name
            - In the "User" -> "omrs-admin" -> "Credentials" tab setup a password for the "omrs-admin" user
            - In the "User" -> "omrs-admin" -> "Role Mappings" tab give the "omrs-user" an "Assigned Role" of "app-admin" and "app-user"
            - Repeat this process for the "omrs-user" but when you go to set the "Role Mappings" only give them as "Assigned Role" of "app-user"
        - In the "Client Scopes" section create a scope called "omrs-roles"
            - After hitting save click on the "Mappers" tab and create a protocal mapper with name set as "roles"
            - Set the "Mapper Type" to "User Client Role"
            - Set the "Client ID" to "omrs-fe"
            - Set the "Token Claim Name" to "roles"
            - Set the "Claim JSON Type" to "string"
            - "Multivalued", "Add to ID Token", "Add to Access Token", and "Add to Userinfo" should be set to "On"
        - In the "Clients" -> "omrs-fe" -> "Client Scopes" tab, add "omrs-roles" to the "Assigned Default Client Scopes"


- mongoDB  
 
1: After cloning, discard the .npmrc file in the root folder

2: In the root directory of the project and run npm install
The root of the project hosts the files for the Node.js/Express backend  

2: In the root of the project, create a file called .env

3: In the .env file add the following lines  
DB_CONN=your mongodb connection string  
JWT_KEY=a secret key used for JSON Web Token creation  
4: Open another teriminal window for the ./frontend folder and run npm install  
The frontend folder holds the files for the React.js frontend  
5: Run the command npm start in the terminal for the backend and the terminal for the frontend to start the app on localhost:3000  


 
