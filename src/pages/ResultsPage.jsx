import { useLocation } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();
  const { subjectList } = location.state || {}; // Access the state passed from HomePage

  return (
    <div>
      <h1>Recommended Books</h1>
      {subjectList && subjectList.length > 0 ? (
        subjectList.map((book, index) => (
          <div key={index}>
            <h2>{book.title}</h2>
            <p>Author: {book.author_name?.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
}

export default ResultsPage;

