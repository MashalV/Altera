# Altera - Book Recommendation App

## Overview



A book recommendation application called *Altera* meaning *the next one* in Latin, allows users to find similar books to ones they have previously enjoyed. Helping them find their next read.

### Problem Space

Specific book recommendation websites are lacking, its usually blogs or reviewers that make lists but an application using API would be helpful in the space. While it may exist already they are not as user friendly or focussed on only book recommendations.

### User Profile


All readers will be able to use the app. 


### Features


- Sometimes users have a certain type of storyline they enjoy or a topic, this app will help them find new books to read. 

- inputting three book titles 

- outputting ten similar book titles, they will be able to swipe through the titles

- clicking on the book title should open up a screen with the cover, title, author and description + (possibly ratings)



## Implementation

### Tech Stack

React.js 
SCSS
HTML 
JavaScript 
axios

possibly 
node.js (might use server for API calls but also could just do it on the front end only)


### APIs

https://openlibrary.org/

possibly one for ratings 

possibly one for where to buy it 

### Sitemap

1. *Home*: 
    Will allow the user to input 2-3 books titles 

2. *Results*:
    This will be a swipe through option to see all the recommendations 

3. *Selected book*: 
    This will provide details about the selected book 

### Mockups

WARNING: still haven't decided on colour scheme or font so this may be displeasing to the eye. 



![home page](<Screen Shot 2024-09-10 at 8.53.55 PM.png>)
![results](<Screen Shot 2024-09-10 at 8.54.09 PM.png>)
![book-title](<Screen Shot 2024-09-10 at 8.54.21 PM.png>)


### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out. 

### Endpoints


http://altera.com/home + http://altera.com
- places to input favorite books

http://altera.com/results
- the recommendations 

http://altera.com/[book-title]
- details about the specific book 



## Roadmap
look at the drawio in the folder

![alt text](<Screen Shot 2024-09-10 at 9.20.49 PM.png>)
![alt text](<Screen Shot 2024-09-10 at 9.21.07 PM.png>)
![alt text](<Screen Shot 2024-09-10 at 9.21.20 PM.png>)


## Future Implementations

- the ability to remove the rec or say you have read it before, maybe even get more recs based on it 
- a bookshelf/ user accounts that allows users to add the books they would like to read, save them and come back to them 


