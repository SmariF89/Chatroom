# Chatroom
An IRC-like chatroom implemented using React for frontend and Node.js with Express for backend server. 

**Note: I did not implement the Express chatserver - just the React frontend which utilises the server.**

**Also note: This project was done in quite a hurry and the emphasis was on the chatroom's functionality rather than its looks. :)**

## Installation
Please make sure you have Node installed.

Open two separate shells, one inside the chatroom folder and another in the chatserver - socket folder.
In the chatroom shell - do "npm install" and then "npm start".
In the chatserver - socket shell - do "npm install" and then "node chatserver.js".

## Instructions
To try out the functionality locally, simply open two or more browser windows, login as different users and chat away. 

### log In
The user must enter a valid username, with no white spaces and a user name that has not been taken. When the user enters a valid username he is instantly routed to the chat room.

### Create chat room
The user can create a new chatroom and is instantly located in the created room. The user cannot enter an empty name, a name of an existing room or a room containing white spaces. Who ever creates a room is its Op and has the power to kick other users from the room as well as ban them from the room.

### Send messages
Messages sent in a room grow from top down with a scroll side bar.

### Send private messages
A list of users in a selected room is displayed in the right side bar. At the top the user has the option to send a private message to a user belonging to the room. The user has to click on the user he wants to send the message to and enter the message at the top. The user receiving the message will see a toaster in the header containing the message for a few seconds. (Note: this was a quick fix - to at least have some sort of private messaging at the project's deadline)

### Kick users
An op can kick users from the chat room. Each user has a kick button in the user list on the left side of the page.

### Ban users
An op can ban users from the chat room. Each user has a ban button in the user list on the left side of the page.

## Known issues
When an op kicks or bans a user from the room, the list does not render correctly. How ever when clicking the room again, or switching to another room and then back. The list will be correctly rendered.
