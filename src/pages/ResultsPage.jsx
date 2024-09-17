import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import "./ResultsPage.scss";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
function ResultsPage() {
  const location = useLocation();
  const { subjectList } = location.state || {}; 

  const getCoverUrl = (coverId) => {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : 'default-cover.jpg';
  };

  return (
    <>
        <Header/>
        <div>
        <h3>Recommended Books</h3>
        <Swiper 
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]} >
            {subjectList && subjectList.length > 0 ? (
                subjectList.map((book, index) => (
                    <SwiperSlide>
                        <div key={index}>
                            <h2>{book.title}</h2>
                            <img 
                              src={getCoverUrl(book.cover_i)} 
                              alt={book.title} 
                              className="book-cover" 
                            />
                            <p>Author: {book.author_name?.join(', ')}</p>
                            <p>Rating: {book.ratings_average}</p>
                        </div>
                    </SwiperSlide>
            ))
            
        ) : (
            <p>No recommendations available.</p>
        )}
        </Swiper>
        </div>
    </>
  );
}

export default ResultsPage;

