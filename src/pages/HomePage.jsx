import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";
import Header from "../components/Header/Header";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function HomePage() {
  document.title = "AlteraBooks: Home";

  const navigate = useNavigate();


  const [bookOne, setBookOne] = useState([]);
  const [titleOne, setTitleOne] = useState("");
  const [titleTwo, setTitleTwo] = useState("");
  const [titleThree, setTitleThree] = useState("");
  const [bookTwo, setBookTwo] = useState([]);
  const [bookThree, setBookThree] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectOneList, setSubjectOneList] = useState([]);
  const [subjectTwoList, setSubjectTwoList] = useState([]);
  const [subjectThreeList, setSubjectThreeList] = useState([]);
  const [commonSubjectList, setCommonSubjectList] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const fetchBookByTitle = async (title, setBookState) => {
    const baseURL = "https://openlibrary.org/search.json?q=";
    try {
      const response = await axios.get(
        `${baseURL}${encodeURIComponent(title)}`,
      );
      // console.log(`Response for "${title}":`, response.data.docs[0].subject);
      const bookData = response.data.docs[0];
      setBookState(bookData);
    } catch (error) {
      console.error("Error fetching books by subject:", error.response ? error.response.data : error.message);
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

    let commonBetweenOneAndTwo = subjectO.filter((subject) => subjectT.includes(subject));
    let commonSubjects = subjectTh.length > 0
      ? commonBetweenOneAndTwo.filter(subject => subjectTh.includes(subject))
      : commonBetweenOneAndTwo;

    // console.log(commonSubjects);
    return commonSubjects;
  };

    // add for incase one or two is empty


  const fetchBooksBySubjects = async (commonSubjects, setListState, titleOne, titleTwo, titleThree) => {
    const baseURL = "https://openlibrary.org/search.json?q=";
    try {
      const response = await axios.get(
        `${baseURL}${encodeURIComponent(commonSubjects)}`,
      );

      let listData = response.data.docs.filter((book) => book && book.title);

      listData = listData.filter(
        (book) =>
          book.title !== titleOne &&
          book.title !== titleTwo &&
          book.title !== titleThree
      );

      console.log(listData);
      setListState(listData.slice(0.10));

      // navigate("/results", { state: { subjectList: listData } });
    } catch (error) {
      console.error("Error fetching books by subject:", error.response ? error.response.data : error.message);
    }
  };

  const combineAndFilterRecommendations = (subjectOneList, subjectTwoList, subjectThreeList, commonList) => {
    let combinedList = [...commonList, ...subjectOneList, ...subjectTwoList, ...subjectThreeList];
    console.log(combinedList)
  
    const filteredList = combinedList.filter((book, index, self) =>
      index === self.findIndex((b) => b.title === book.title)
    );

    navigate("/results", { state: { subjectList: filteredList.slice(0,20) } });

  
    return filteredList.slice(0,20);

    // const uniqueBooks = [];
    // const titlesSet = new Set();
  
    // combinedList.forEach((book) => {
    //   if (!titlesSet.has(book.title)) {
    //     titlesSet.add(book.title);
    //     uniqueBooks.push(book);
    //   }
    // });
  
    // return uniqueBooks.slice(0, 20);


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
    } catch (error) {
      console.error("Error during generation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const processBooks = async () => {
      if (bookOne && bookTwo && bookThree) {
        const subjectOne = bookOne.subject || [];
        const subjectTwo = bookTwo.subject || [];
        const subjectThree = bookThree.subject || [];

        const common = commonSubjects(subjectOne, subjectTwo, subjectThree);
        const commonSubjectsLimited = common.slice(0, 10);

        if (commonSubjectsLimited.length > 2) {
          await Promise.all ([ 
            fetchBooksBySubjects(commonSubjectsLimited, setSubjectList, titleOne, titleTwo, titleThree),
            fetchBooksBySubjects(subjectOne.slice(0, 5), setSubjectOneList, titleOne, titleTwo, titleThree),
            fetchBooksBySubjects(subjectTwo.slice(0, 5), setSubjectTwoList, titleOne, titleTwo, titleThree),
            fetchBooksBySubjects(subjectThree.slice(0, 5), setSubjectThreeList, titleOne, titleTwo, titleThree),
          ]);
        } else {
          await Promise.all([
            fetchBooksBySubjects(subjectOne.slice(0, 5), setSubjectOneList, titleOne, titleTwo, titleThree),
            fetchBooksBySubjects(subjectTwo.slice(0, 5), setSubjectTwoList, titleOne, titleTwo, titleThree),
            fetchBooksBySubjects(subjectThree.slice(0, 5), setSubjectThreeList, titleOne, titleTwo, titleThree),
          ]);

          const finalList = combineAndFilterRecommendations(
            subjectList.slice(0,5),
            subjectOneList.slice(0, 5),
            subjectTwoList.slice(0, 5),
            subjectThreeList.slice(0, 5)
          );

          setSubjectList(finalList);
          navigate("/results", { state: { subjectList: finalList } });
          

          
        }
        

          


        }

        

        
    };

    if (!loading && bookOne && bookTwo && bookThree) {
      processBooks();
    }

  // const handleGenerate = async (e) => {
  //   e.preventDefault(); 
  //   setLoading(true);

  //   try {
  //     await Promise.all([
  //       fetchBookByTitle(titleOne, setBookOne),
  //       fetchBookByTitle(titleTwo, setBookTwo),
  //       fetchBookByTitle(titleThree, setBookThree),
  //     ]);
  //   } catch (error) {
  //     console.error("Error during generation:", error);
  // };
  
  // useEffect(() => {
  //   const fetchAllSubjects = async () => {
  //     if (!loading && bookOne && bookTwo && bookThree) {
  //       const subjectOne = bookOne.subject || [];
  //       const subjectTwo = bookTwo.subject || [];
  //       const subjectThree = bookThree.subject || [];

  //       const common = commonSubjects(subjectOne, subjectTwo, subjectThree);
  //       setCommonSubjectList(common);

  //       if (common.length >= 3) {
  //         await Promise.all([
  //           fetchBooksBySubjects(common.slice(0, 10), setSubjectList),
  //           fetchBooksBySubjects(subjectOne.slice(0, 6), setSubjectOneList),
  //           fetchBooksBySubjects(subjectTwo.slice(0, 6), setSubjectTwoList),
  //           fetchBooksBySubjects(subjectThree.slice(0, 6), setSubjectThreeList),
  //         ]);

  //         const finalList = combineAndFilterRecommendations(
  //           commonSubjectList.slice(0, 5),
  //           subjectOneList.slice(0, 5),
  //           subjectTwoList.slice(0, 5),
  //           subjectThreeList.slice(0, 5)
  //         );
  //         setSubjectList(finalList);
  //       } else {
  //         await Promise.all([
  //           fetchBooksBySubjects(subjectOne.slice(0, 6), setSubjectOneList),
  //           fetchBooksBySubjects(subjectTwo.slice(0, 6), setSubjectTwoList),
  //           fetchBooksBySubjects(subjectThree.slice(0, 6), setSubjectThreeList),
  //         ]);

  //         const finalList = combineAndFilterRecommendations(
  //           subjectOneList.slice(0, 5),
  //           subjectTwoList.slice(0, 5),
  //           subjectThreeList.slice(0, 5)
  //         );
  //         setSubjectList(finalList);
  //       }

  //       navigate("/results", { state: { subjectList: subjectList } });
  //     }
  //   };
  //     }
  //   }
  }, [bookOne, bookTwo, bookThree, loading, subjectOneList, subjectTwoList, subjectThreeList]);

  //to-do list
  // only take the first three subjects when querying

  return (
    <div className = "wrapper">
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
    </div>
  );
}

export default HomePage;
