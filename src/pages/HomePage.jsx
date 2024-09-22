import React, { useEffect, useState, useMemo } from "react";
import "./HomePage.scss";
import axios from "axios";
import Header from "../components/Header/Header";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Spinner from "../components/Spinner/Spinner";

function HomePage() {
  document.title = "AlteraBooks: Home";

  const navigate = useNavigate();
  const [titleOne, setTitleOne] = useState("");
  const [titleTwo, setTitleTwo] = useState("");
  const [titleThree, setTitleThree] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [allFetched, setAllFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [findBooks, setFindBooks] = useState(false);
  const [findCommon, setFindCommon] = useState(false);

  const fetchBookByTitle = async (title, setBookState) => {
    const baseURL = "https://openlibrary.org/search.json?q=";
    try {
      const response = await axios.get(
        `${baseURL}${encodeURIComponent(title)}`
      );

      const bookData = response.data.docs[0];
      setBookState(bookData);
    } catch (error) {
      console.error(
        "Error fetching books by subject:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchBookByTitle2 = async (title, setBookState) => {
    const baseURL = "https://openlibrary.org/search.json?q=";
    try {
      const response = await axios.get(
        `${baseURL}${encodeURIComponent(title)}`
      );
      // console.log(`Response for "${title}":`, response.data.docs[0].subject);
      const bookData = response.data.docs[0];
      return bookData;
      // setBookState(bookData);
    } catch (error) {
      console.error(
        "Error fetching books by subject:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const commonSubjects = (subjectO = [], subjectT = [], subjectTh = []) => {
    if (
      !Array.isArray(subjectO) ||
      !Array.isArray(subjectT) ||
      !Array.isArray(subjectTh)
    ) {
      console.error("One or more inputs are not arrays");
      return [];
    }

    let commonBetweenOneAndTwo = subjectO.filter((subject) =>
      subjectT.includes(subject)
    );
    let commonSubjects =
      subjectTh.length > 0
        ? commonBetweenOneAndTwo.filter((subject) =>
            subjectTh.includes(subject)
          )
        : commonBetweenOneAndTwo;


    return commonSubjects;
  };



  const filterOutUnwantedSubjects = (subjectList) => {
    const unwantedKeywords = ["imaginary place", "fictitious person", "etc", ")" , ":", "bien"];

    return subjectList.filter((subject) => {
      const lowerCaseSubject = subject.toLowerCase();
      const hasNumbers = /\d/.test(lowerCaseSubject);
      const hasUnwantedKeyword = unwantedKeywords.some((keyword) =>
        lowerCaseSubject.includes(keyword)
      );

      return !hasNumbers && !hasUnwantedKeyword;
    });
  };

  const fetchBooksBySubjects =
    async (
      commonSubjects,
      titleOne,
      titleTwo,
      titleThree
    ) => {
      const baseURL = "https://openlibrary.org/search.json?q=";
      try {
        const response = await axios.get(
          `${baseURL}${encodeURIComponent(commonSubjects)}`
        );

        let listData = response.data.docs.filter((book) => book && book.title);
        console.log(listData);
        
        listData = listData.filter(
          (book) =>
            
            book.title.toLowerCase() !== titleOne.toLowerCase()  &&
            book.title.toLowerCase() !== titleTwo.toLowerCase()  &&
            book.title.toLowerCase() !== titleThree.toLowerCase()
    
        );

        console.log(listData);
        return listData;

      } catch (error) {
        console.error(
          "Error fetching books by subject:",
          error.response ? error.response.data : error.message
        );
      }
    };

  const combineAndFilterRecommendations = (
    subjectOneList,
    subjectTwoList,
    subjectThreeList,
    commonList
  ) => {
    const limitPerSubject = 10;

    const filteredSubjectOneList = subjectOneList
      .filter((book) => book.ratings_average >= 3)
      .slice(0, limitPerSubject);
    const filteredSubjectTwoList = subjectTwoList
      .filter((book) => book.ratings_average >= 3)
      .slice(0, limitPerSubject);
    const filteredSubjectThreeList = subjectThreeList
      .filter((book) => book.ratings_average >= 3)
      .slice(0, limitPerSubject);
    const filteredCommonList = commonList
      .filter((book) => book.ratings_average >= 3)
      .slice(0, 6);


    let combinedList = [
      ...filteredCommonList,
      ...filteredSubjectOneList,
      ...filteredSubjectTwoList,
      ...filteredSubjectThreeList,
    ];
    console.log(combinedList);



    const uniqueBooks = [];
    const titlesSet = new Set();

    combinedList = combinedList.sort(() => 0.5 - Math.random());

    combinedList.forEach((book) => {
      if (!titlesSet.has(book.title)) {
        titlesSet.add(book.title);
        uniqueBooks.push(book);
      }
    });

    return uniqueBooks.slice(0, 20);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAllFetched(true);

    const responseOne = await fetchBookByTitle2(titleOne);
    const responseTwo = await fetchBookByTitle2(titleTwo);
    const responseThree = await fetchBookByTitle2(titleThree);
    console.log(responseOne);
    processBooks(responseOne, responseTwo, responseThree);

  };

  const processBooks = async (responseOne, responseTwo, responseThree) => {
    console.log(responseOne, responseTwo, responseThree);
    setFindBooks(true);


    const subjectOne = filterOutUnwantedSubjects(responseOne.subject || []);
    const subjectTwo = filterOutUnwantedSubjects(responseTwo.subject || []);
    const subjectThree = filterOutUnwantedSubjects(responseThree.subject || []);

    console.log(subjectOne.slice(0, 4));
    console.log(subjectTwo.slice(0, 4));
    console.log(subjectThree.slice(0, 4));

    const common = commonSubjects(subjectOne, subjectTwo, subjectThree);
    const commonSubjectsLimited = common.slice(0, 10);
    console.log(commonSubjectsLimited);
    let subjectOneList = [];
    let subjectTwoList = [];
    let subjectThreeList = [];
    let subjectCommonList = [];

    try {
      if (commonSubjectsLimited.length > 2) {
        subjectCommonList = await fetchBooksBySubjects(
          commonSubjectsLimited,
          titleOne,
          titleTwo,
          titleThree
        );
        console.log(subjectCommonList);
        setFindBooks(false);
        setFindCommon(true);

        subjectOneList = await fetchBooksBySubjects(
          subjectOne.slice(0, 4),
          titleOne,
          titleTwo,
          titleThree
        );

        subjectTwoList = await fetchBooksBySubjects(
          subjectTwo.slice(0, 4),
          titleOne,
          titleTwo,
          titleThree
        );

        subjectThreeList = await fetchBooksBySubjects(
          subjectThree.slice(0, 4),
          titleOne,
          titleTwo,
          titleThree
        );
       
      } else {
        subjectOneList = await fetchBooksBySubjects(
          subjectOne.slice(0, 4),
          titleOne,
          titleTwo,
          titleThree
        );
        console.log(subjectOneList);

        subjectTwoList = await fetchBooksBySubjects(
          subjectTwo.slice(0, 4),
          titleOne,
          titleTwo,
          titleThree
        );

        subjectThreeList = await fetchBooksBySubjects(
          subjectThree.slice(0, 4),
          titleOne,
          titleTwo,
          titleThree
        );
      
      }
      
    } catch (error) {
      console.error("Error during book processing:", error);
    }

    const finalList = combineAndFilterRecommendations(
      subjectCommonList,
      subjectOneList,
      subjectTwoList,
      subjectThreeList
    );
    console.log(finalList);

    setSubjectList(finalList);
    setAllFetched(true);
    navigate("/results", { state: { subjectList: finalList } });
  };



  return (
    <div className="wrapper">
      { allFetched ? (
        <>
        <Spinner />
        {findBooks && <h4 className="message">Browsing through the library...</h4>}
        {findCommon && <h4 className="message">Looking for your perfect book...</h4>}
        </>
       
      ) : (


        
        <>
          <main>
            <Header />
            <Input
              setTitleOne={setTitleOne}
              setTitleTwo={setTitleTwo}
              setTitleThree={setTitleThree}
              onGenerate={handleGenerate}
            />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default HomePage;
