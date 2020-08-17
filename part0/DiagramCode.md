## part 0 exercise

### 0.4 New Note

```
title add a new note

note over browser :
input note, submit the form
end note

browser -> server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
server --> browser: 302 FOUND
browser -> server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
server --> browser: HTML
browser -> server : HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
server --> browser: main.css
browser -> server : HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
server --> browser: main.js

note over browser:
browser execute main.js code 
in order to get 
notes JSON data from server 
end note

browser -> server : HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
server --> browser: [{"content":"HTML is easy","date":"2019-05-23T17:30:31.098Z"},...]

note over browser :
browser executes the 
javascript to manipulate 
DOM tree to display notes
end note
```

### 0.5 Single Page App

```
title Single page app

browser -> server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa
server --> browser: HTML
browser -> server : HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
server --> browser: main.css
browser -> server : HTTP GET https://fullstack-exampleapp.herokuapp.com/spa.js
server --> browser: spa.js

note over browser:
browser execute spa.js code 
get notes JSON data from server 
end note

browser -> server : HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
server --> browser: [{"content":"HTML is easy","date":"2019-05-23T17:30:31.098Z"},...]

note over browser :
browser executes the 
javascript to manipulate 
DOM tree to display notes
end note
```

### 0.6 Single Page App New Note

```
title Single page app add new note

note over browser :
input note, submit the form
end note

note over browser :
spa.js prevent the form 
sending POST request.
create new note object
push it into notes array
clear input
end note

note over browser :
browser executes the 
redrawNotes() to manipulate 
DOM tree to display notes
end note

browser -> server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
server --> browser: {"message":"note created"}
```

