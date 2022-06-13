Kukus API CC

Endpoint : https://micro-liberty-351413-4l6o4nq5gq-uc.a.run.app/

1. Register
URL
/register

Method
POST

Request Body (JSON)
- “email”, String, required
- “usern”, String, required
- “pass”, String, required

Response
"success"


2. Login
URL
/login

Method
POST

Request Body (JSON)
- “email”, String, required
- “usern”, String, required
- “pass”, String, required

Response
"login success" (if login is successful)
"login fail" (else)


3. Explore
URL
/explore

Method
GET

Request Body (JSON)
none

Response
"[  
    {
        "userAvatar": userAvatar link
        "username": username string
        "feeds": post feeds link
        "numLikes": "X likes" (in string, X is amount of likes)
        "caption": caption string
    }
]"
