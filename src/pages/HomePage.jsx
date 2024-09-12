import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";

function HomePage() {
  document.title = "Altera: Home";

  const [bookOne, setBookOne] = useState([]);
  const [bookTwo, setBookTwo] = useState([]);
  const [bookThree, setBookThree] = useState([]);

  //titles to test with
  const titleOne = "Vampire Academy";
  const titleTwo = "Harry Potter";
  const titleThree = "Gallagher Girls";

  const fetchBookByTitle = async (title, setBookState) => {
    const baseURL = "https://openlibrary.org/search.json?q=";
    try {
      const response = await axios.get(
        `${baseURL}${encodeURIComponent(title)}`
      );
      const bookData = response.data.docs[0]; 
      setBookState(bookData);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  useEffect(() => {
    fetchBookByTitle(titleOne, setBookOne);
    fetchBookByTitle(titleTwo, setBookTwo);
    fetchBookByTitle(titleThree, setBookThree);
  }, []);

  const subjectOne = bookOne.subject;
  const subjectTwo = bookTwo.subject;
  const subjectThree = bookThree.subject;

  function commonSubjects (subjectOne, subjectTwo, subjectThree) {
    let commonBetweenOneAndTwo = subjectOne.filter(subject => subjectTwo.includes(subject));
    let commonSubjects = commonBetweenOneAndTwo.filter(subject => subjectThree.includes(subject));
    return commonSubjects;
  }




  return (
    <div className="homepage">
      <div>
        <h2>Book One: {bookOne ? bookOne.title : "Loading..."}</h2>
        {bookOne && <p>Author: {bookOne.author_name?.join(", ")}</p>}
      </div>

      <div>
        <h2>Book Two: {bookTwo ? bookTwo.title : "Loading..."}</h2>
        {bookTwo && <p>Author: {bookTwo.author_name?.join(", ")}</p>}
      </div>

      <div>
        <h2>Book Three: {bookThree ? bookThree.title : "Loading..."}</h2>
        {bookThree && <p>Author: {bookThree.author_name?.join(", ")}</p>}
      </div>
    </div>
  );
}

export default HomePage;

//     useEffect(() => {

//         const getBookOne = async () => {
//             let baseURL = "https://openlibrary.org/search.json?q="
//             const response = await axios.get(`${baseURL}Vampire+Academy`)
//             setBookOne (response.data);
//         }
//         getBookOne();
//     }, [])

//   return (
//     <>
//     <div>
//         <p>{response.data}</p>
//     </div>

//     </>
//   )
// }

// export default HomePage
