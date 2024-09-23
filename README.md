# Altera Books

Altera Books is a book recommendation web application designed to help users find new books based on common subjects between titles. The app fetches book data using APIs, compares the subjects, and presents personalized book recommendations with synopses and cover images. 

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Development Process](#development-process)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Altera Books allows users to search for books by entering book titles and get personalized recommendations based on the subjects shared between the entered titles. It displays detailed information about each recommended book, including cover images, author names, and ratings. The project aims to simplify book discovery for avid readers.

## Features
- Search for books by entering titles.
- Receive personalized recommendations based on common subjects.
- View book cover images, author details, and average ratings.
- Interactive carousel and grid layout to browse recommendations.
- Responsive design, optimized for desktop and mobile.
- Integrated loading spinners to indicate data fetching.
- A Creator Pick's page with my personalized recommendations 
  
## Tech Stack

- **Frontend**: React.js, React Router, SCSS, Swiper.js
- **Backend**: OpenLibrary API (for fetching book data)
- **Additional Libraries**: 
  - Swiper.js (for interactive book sliders)
  - React Icons (for star ratings)
  
## Installation

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (version 14+)
- **npm** (Node package manager)

### Steps to Install:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/MashalV/AlteraBooks.git
    ```
   
2. **Navigate to the project folder**:
    ```bash
    cd altera-books
    ```

3. **Install the required dependencies**:
    ```bash
    npm install
    ```

4. **Run the development server**:
    ```bash
    npm start
    ```

5. **Open the project in your browser**:
    Once the server is running, open your browser and go to:
    ```
    http://localhost:3000
    ```

## Usage

- **Search for Books**: On the main page, enter book titles into the search bar.
- **View Recommendations**: Once the search is complete, view a list of recommended books based on common subjects.
- **Swipe Through Recommendations**: Use the carousel to browse through book covers and see detailed information about each book.
  
## Development Process

The project was built with a focus on responsiveness and user interaction. Here’s a breakdown of how it was developed:

1. **Project Setup**: 
   - The project was initialized with `create-react-app`.
   - Components were organized into folders (`components`, `pages`, `utils`).
  
2. **API Integration**: 
   - OpenLibrary API was integrated to fetch book data based on the user's input titles.
  
3. **Recommendation Algorithm**: 
   - A function was created to compare the subjects between different books and provide recommendations based on shared themes.
  
4. **UI Design and Swiper Integration**: 
   - A grid and swiper layout were implemented using SCSS and Swiper.js to display book covers in a carousel format.
  
5. **Responsiveness**: 
   - The app was designed to work well on both mobile and desktop views using media queries in SCSS.

## Future Enhancements

- **User Authentication**: Allow users to save book recommendations to their profiles.
- **Advanced Filters**: Add filters based on book genres, ratings, and publication years.
- **Add tags**: Add tags to the books, mark as read or if the recommendation matches what you are looking for, or if you've read a recommendation and didn't like it (feedback)

## Contributing

We welcome contributions from the community! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request with a detailed explanation of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE/license1.0.txt) file for details.

