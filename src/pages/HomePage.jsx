import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";
import Header from "../components/Header/Header";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";

function HomePage() {
  document.title = "AlteraBooks: Home";

  const navigate = useNavigate();

  // const handleGenerate = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await fetchAllBooks();
  //     if (subjectList.length === 0) {
  //       console.error("No subjects found to display.");
  //       return;
  //     }
  //     navigate("/results", { state: { subjectList } });
  //   } catch (error) {
  //     console.error("Error during generation:", error);
  //   }
  // };

  const [bookOne, setBookOne] = useState([]);
  const [titleOne, setTitleOne] = useState("");
  const [titleTwo, setTitleTwo] = useState("");
  const [titleThree, setTitleThree] = useState("");
  const [bookTwo, setBookTwo] = useState([]);
  const [bookThree, setBookThree] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [commonSubjectList, setCommonSubjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  //titles to test with
  // const titleOne = "Vampire Academy";
  // const titleTwo = "A thousand splendid suns";
  // const titleThree = "Twilight";

  const fetchBookByTitle = async (title, setBookState) => {
    const baseURL = "https://openlibrary.org/search.json?q=";
    try {
      const response = await axios.get(
        `${baseURL}${encodeURIComponent(title)}`
      );
      console.log(`Response for "${title}":`, response.data.docs[0].subject);
      const bookData = response.data.docs[0];
      setBookState(bookData);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  // const fetchAllBooks = async () => {
  //   setLoading(true);
  //   await Promise.all([
  //     fetchBookByTitle(titleOne, setBookOne),
  //     fetchBookByTitle(titleTwo, setBookTwo),
  //     fetchBookByTitle(titleThree, setBookThree),
  //   ]);
  //   setLoading(false);
  // };

  // const subjectOne = bookOne.subject || [];
  // const subjectTwo = bookTwo.subject || [];
  // const subjectThree = bookThree.subject || [];

  const commonSubjects = (subjectO = [], subjectT = [], subjectTh = []) => {

    if (
      !Array.isArray(subjectO) ||
      !Array.isArray(subjectT) ||
      !Array.isArray(subjectTh)
    ) {
      console.error("One or more inputs are not arrays");
      return [];
    }

    let commonBetweenOneAndTwo = subjectO.filter((subject) => subjectT.includes(subject));
    let commonSubjects = subjectTh.length > 0
      ? commonBetweenOneAndTwo.filter(subject => subjectTh.includes(subject))
      : commonBetweenOneAndTwo;

    console.log(commonSubjects);
    return commonSubjects;
  };

    // add for incase one or two is empty


  const fetchBooksBySubjects = async (commonSubjects, setListState) => {
    const baseURL = "https://openlibrary.org/search.json?q=";
    try {
      const response = await axios.get(
        `${baseURL}${encodeURIComponent(commonSubjects)}`
      );

      let listData = response.data.docs.filter((book) => book && book.title);
      console.log (listData);
      // let listData = [
      //   response.data.docs[0],
      //   response.data.docs[1],
      //   response.data.docs[2],
      //   response.data.docs[3],
      //   response.data.docs[4],
      //   response.data.docs[5],
      //   response.data.docs[6],
      //   response.data.docs[7],
      //   response.data.docs[8],
      //   response.data.docs[9],
      // ];

      listData = listData.filter(
        (book) =>
          book.title !== titleOne &&
          book.title !== titleTwo &&
          book.title !== titleThree
      );

      console.log(listData);
      setListState(listData);

      navigate("/results", { state: { subjectList: listData } });
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      await Promise.all([
        fetchBookByTitle(titleOne, setBookOne),
        fetchBookByTitle(titleTwo, setBookTwo),
        fetchBookByTitle(titleThree, setBookThree),
      ]);

     

      

      // const common = commonSubjects(subjectOne, subjectTwo, subjectThree);
      // setCommonSubjectList(common);
      

      // if (common.length > 0) {
      //   fetchBooksBySubjects(common, setSubjectList);
      // }

      // navigate('/results', { state: { subjectList } });
    } catch (error) {
      console.error("Error during generation:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const fetchAllBooks = async () => {
  //     setLoading(true);
  //     await Promise.all([
  //       fetchBookByTitle(titleOne, setBookOne),
  //       fetchBookByTitle(titleTwo, setBookTwo),
  //       fetchBookByTitle(titleThree, setBookThree),
  //     ]);
  //     setLoading(false);
  //   };

  //   fetchAllBooks();
  // }, []);

  useEffect(() => {
    if (!loading && bookOne && bookTwo && bookThree) {
      
      const subjectOne = bookOne.subject || [];
      const subjectTwo = bookTwo.subject || [];
      const subjectThree = bookThree.subject || [];

      const common = commonSubjects(
        subjectOne || [],
        subjectTwo || [],
        subjectThree || []
      );

      setCommonSubjectList(common);
      if (common.length > 0) {
        fetchBooksBySubjects(common, setSubjectList);
      }
    }
  }, [bookOne, bookTwo, bookThree, loading]);

  //to-do list
  // only take the first three subjects when querying

  return (
    <>
      <Header />
      <Input
        setTitleOne={setTitleOne}
        setTitleTwo={setTitleTwo}
        setTitleThree={setTitleThree}
        onGenerate={handleGenerate}
      />
      {/* <div className="homepage">
        <div>
          <h2>
            Book One: {subjectList[0] ? subjectList[0].title : "Loading..."}
          </h2>
          {subjectList[0] && (
            <p>Author: {subjectList[0].author_name?.join(", ")}</p>
          )}
        </div>

        <div>
          <h2>
            Book Two: {subjectList[1] ? subjectList[1].title : "Loading..."}
          </h2>
          {subjectList[1] && (
            <p>Author: {subjectList[1].author_name?.join(", ")}</p>
          )}
        </div>

        <div>
          <h2>
            Book Three: {subjectList[2] ? subjectList[2].title : "Loading..."}
          </h2>
          {subjectList[2] && (
            <p>Author: {subjectList[2].author_name?.join(", ")}</p>
          )}
        </div> */}
      {/* </div> */}
    </>
  );
}

export default HomePage;
