# API Documentation
## Introduction
This API allows users to create projects and associated groups, as well as retrieve projects based on group name.

## Base URL
http://localhost:3000

## Endpoints
### 1. Create Project
Create a new project along with its associated groups.

URL: /createProject
Method: POST
Request Body:
id (string): Project ID
name (string): Project name
image (object):
link (string): Link to project image
url (string): URL of the project
groups (array): Array of groups associated with the project
id (string): Group ID
name (string): Group name
url (string): URL of the group
parent_project (string): Name of the parent project
Example Request Body:
[{
 "id": 736,
 "name": "Systems",
 "image": {
 "link": "http://i.stack.imgur.com/8KA9j.jpg?s=32&g=1"
 },
 "groups": [{
 "id": 2168,
 "name": "API",
 "url": "https://wwww.itschools.co.za/api/"
 },
 {
 "id": 11955,
 "name": "Assets",
 "url": "https://wwww.itschools.co.za/assets/"
 },
 {
 "id": 3179,
 "name": "Design",
 "url": "https://wwww.itschools.co.za/design/"
 },
 {
 "id": 207,
 "name": "Development",
 "url": "https://wwww.itschools.co.za/development/"
 },
 {
 "id": 70,
 "name": "Intranet",
 "url": "https://wwww.itschools.co.za/intranet/"
 }
 ],
 "url": "https://wwww.itschools.co.za/projects"
 },
 {
 "id": 44315,
 "name": "User Agents",
 "image": {
 "link": " https://cdn.pixabay.com/photo/2018/09/24/08/31/pixelcells-3699334_960_720.png"
 },
 "groups": [{
 "id": 191599,
 "name": "Alchemy",
 "url": "https://wwww.itschools.co.za/tools/alchemy"
 },
 {
 "id": 86822,
 "name": "Empathy",
 "url": "https://wwww.itschools.co.za/tools/empathy"
 },
 {
 "id": 86297,
 "name": "Epiphany",
 "url": "https://wwww.itschools.co.za/tools/epiphany"
 },
 {
 "id": 131837,
 "name": "Harmony",
 "url": "https://wwww.itschools.co.za/tools/hamony"
 },
 {
 "id": 174338,
 "name": "Zagreb",
 "url": "https://wwww.itschools.co.za/tools/zagreb"
 }
 ],
 "url": "https://wwww.itschools.co.za/tools"
 }
]

Response Body: Array containing information about the created projects and groups.

### 2. Get Projects
Retrieve projects based on group name.

URL: /projects?group={group_name}
Method: GET
Query Parameters:
group (string): Name of the group to search for within project names.
Example: /projects?group=Group
Example Response:
[
  {
    "id": "2168",
    "name": "API",
    "url": "https://wwww.itschools.co.za/api/",
    "parent_name": "Systems",
    "image": "http://i.stack.imgur.com/8KA9j.jpg?s=32&g=1
  },
  {
    "id": "174338",
    "name": "Zagreb",
    "url": "https://wwww.itschools.co.za/tools/zagreb",
    "parent_name": "User Agents",
    "image": "https://cdn.pixabay.com/photo/2018/09/24/08/31/pixelcells-3699334_960_720.png"
  }
]

## Error Handling
If there's an error during project creation or retrieval, an error message will be included in the response.
Error responses will have an appropriate HTTP status code along with a descriptive error message.
Note
Ensure that the request body for creating a project follows the specified format to avoid errors.
For retrieving projects, provide a valid group name as the query parameter.

## Setting Up the API on Your Local Machine
To run the API locally on your machine, follow these steps:

**Prerequisites**
Node.js installed on your machine (https://nodejs.org/en)
Yarn package manager installed on your machine (https://yarnpkg.com/getting-started/install)

**Installation Steps**
Install Dependencies:

Install the required dependencies using Yarn.
run the following code in your terminal
"yarn install"

Start the API:

Start the API server on your local machine.
run the following code in your terminal
"yarn start"

Access the API:
The API should now be running locally on your machine. You can access it using the base URL http://localhost:3000.

Making Requests
You can make HTTP requests to the API endpoints using tools like Postman, cURL, or any programming language's HTTP client library.

**Additional Notes**
Ensure that the SQLite database file (database.db) is present in the project directory.
Make sure no other application is using port 3000 on your machine, as the API server will run on this port.

