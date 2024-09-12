import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";

function HomePage() {
  document.title = "Altera: Home";

  const [bookOne, setBookOne] = useState([]);
  const [bookTwo, setBookTwo] = useState([]);
  const [bookThree, setBookThree] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [commonSubjectList, setCommonSubjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  //titles to test with
  const titleOne = "Vampire Academy";
  const titleTwo = "Harry Potter";
  const titleThree = "Twilight";

  const fetchBookByTitle = async (title, setBookState) => {
    const baseURL = "https://openlibrary.org/search.json?q=";
    try {
      const response = await axios.get(
        `${baseURL}${encodeURIComponent(title)}`
      );
      console.log(`Response for "${title}":`, response.data.docs[0]);
      const bookData = response.data.docs[0];
      setBookState(bookData);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const subjectOne = bookOne.subject || [];
  const subjectTwo = bookTwo.subject || [];
  const subjectThree = bookThree.subject || [];

  const commonSubjects = (subjectO = [], subjectT =[], subjectTh =[]) => {
    console.log("subjectOne:", subjectO);
    console.log("subjectTwo:", subjectT);
    console.log("subjectThree:", subjectTh);

  // Check if they are arrays
    if (!Array.isArray(subjectO) || !Array.isArray(subjectT) || !Array.isArray(subjectTh)) {
        console.error("One or more inputs are not arrays");
        return [];
    }

    // add for incase one or two is empty 
    let commonBetweenOneAndTwo = subjectO.filter((subject) =>
      subjectT.includes(subject)
    );
    let commonSubjects = subjectTh.length > 0
    ? commonBetweenOneAndTwo.filter(subject => subjectTh.includes(subject))
    : commonBetweenOneAndTwo;

    console.log(commonSubjects)
    return commonSubjects;
  }

  const fetchBooksBySubjects = async (commonSubjects, setListState) => {
    const baseURL = "https://openlibrary.org/search.json?q=";
    try {
      const response = await axios.get(
        `${baseURL}${encodeURIComponent(commonSubjects)}`
      );
      const listData = [
        response.data.docs[0],
        response.data.docs[1],
        response.data.docs[2],
        response.data.docs[3],
        response.data.docs[4],
        response.data.docs[5],
        response.data.docs[6],
        response.data.docs[7],
        response.data.docs[8],
        response.data.docs[9],
      ];
      console.log (listData);
      setListState(listData);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  useEffect(() => {
    // Fetch all books in parallel
    const fetchAllBooks = async () => {
      setLoading(true);
      await Promise.all([
        fetchBookByTitle(titleOne, setBookOne),
        fetchBookByTitle(titleTwo, setBookTwo),
        fetchBookByTitle(titleThree, setBookThree),
      ]);
      setLoading(false);
    };

     

    fetchAllBooks();
  }, []);


  useEffect(() => {
    // Fetch all books in parallel
    if(!loading && bookOne && bookTwo && bookThree){

      // Once all books are fetched, calculate common subjects
      const common = commonSubjects(
        subjectOne || [],
        subjectTwo || [],
        subjectThree || []
      );

      // Fetch books by common subjects
      setCommonSubjectList(common);
      if (common.length > 0) {

      fetchBooksBySubjects(common, setSubjectList);
      }
    }

  }, [bookOne, bookTwo, bookThree, loading]);

  return (
    <div className="homepage">
      <div>
        <h2>Book One: {subjectList[0] ? subjectList[0].title : "Loading..."}</h2>
        {subjectList[0] && <p>Author: {subjectList[0].author_name?.join(", ")}</p>}
      </div>

      <div>
        <h2>Book Two: {subjectList[1] ? subjectList[1].title : "Loading..."}</h2>
        {subjectList[1] && <p>Author: {subjectList[1].author_name?.join(", ")}</p>}
      </div>

      <div>
        <h2>Book Three: {subjectList[2] ? subjectList[2].title : "Loading..."}</h2>
        {subjectList[2] && <p>Author: {subjectList[2].author_name?.join(", ")}</p>}
      </div>
    </div>
  );
}

export default HomePage;


