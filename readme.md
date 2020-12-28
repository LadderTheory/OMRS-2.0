<h2>Requirements:</h2>

- Node.js
- Keycloak
- MongoDB
- Git

<h2>Setup to run app on localhost</h2>

- Clone the repository into your desired directory
    - example: git clone http://gitlab.sst.com/sst/omrs-prototype.git omrs3
- CD into the root directory just created
- Delete the .npmrc file locate in the root directory
- Run the command: npm install
- If there are reported vulnerabilities, run the command: npm audit fix
- CD into the root directory/frontend folder
- Run the command: npm install
- If there are reported vulnerabilities, run the command: npm audit fix
- Setup Keycloak Authentication
    - This app requires a keycloak server to handle authentication. See documentation on www.keycloak.org for setting up a keycloak server
        - Once keycloak server is running, login and create a realm called omrs
            - In the "Realm Settings" -> "Login" tab make sure "User Registration", "Edit Username", and "Login With Email" are set to "On"
            - In the "Realm Settings" -> "Token" tab set the token timeout settings as desired
        - In the "Clients" section create a client for the Node/Express backend called "omrs-be"
            - After clicking save set the "Access Type" to "bearer-only"
            - In the "Clients" -> "omrs-be" -> "Credentials" tab take note of the value in the "Secret" box. You will need this value later when setting up environmental variables.
            - In the "Clients" -> "omrs-be" -> "Roles" tab create an "admin" role and a "user" role
        - In the "Clients" section create a client for the React frontend called "omrs-fe" 
            - After clicking save set the "Access Type" to public
            - Set the "Valid Redirect URIs" to "http://localhost:3000/" (This would change if the app is instead running in production or another environment with a FQDN i.e. http://app.sst.com/)
            - Set the "Web Origins" to "*"
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
        - Navigate to the "Clients" -> "omrs-be" -> "Installation" tab and select "Keycloak OIDC JSON" from the "Format Option" dropdown
        - Copy the value for the "auth-server-url"
        - Open the /server/config/keycloak.config.js file and edit the "serverUrl" line to match the url from the above step
        - Navigate to the "Clients" -> "omrs-fe" -> "Installation" tab and select "Keycloak OIDC JSON" from the "Format Option" dropdown
        - Copy the entire output including the brackets
        - Open the /frontend/public/keycloak.json file 
        - Paste the above copied JSON, overriding everything that was previously in the file
- Setup Environmental Variables
    - In the root folder create a file called .env
    - Open the .env file and add environmental variables each on a seperate line as follows replacing the portions after the = sign with the information as applicable to your environment
        - DB_CONN=Your mongoDB uri
        - DB_CONN_TEST=A seperate mongodB uri for a testing database
        - KC_TOKEN=The secret key for your Keycloak backend client 
- From a terminal in the root directory of the project run the command: NODE_ENV=development node ./bin/www
- From a second terminal in the /frontend directory of the project run the command: npm start
- Navigate to localhost:3000 in the browser

<h2>Required changes to run app on kubernetes</h2>

- In the keycloak server change the Valid redirect URI to match the URL for the app once it is deployed in kubernetes
- In the /frontend/src/App.jsx file find the line with the redirectUri key and change the value to match the URL for the app in kubernetes
- In kuberetes, add kubernetes secrets corresponding to all the environmental variables in the .env file
- In gitlab add CI variables corresponding to the variables in the gitlab-ci.yml file





 
