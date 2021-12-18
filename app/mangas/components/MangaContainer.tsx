import { useQuery } from "blitz"
import React, { memo, useEffect, useState, useRef } from "react"
// import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil'

// import Rating from '../Rating';
// import Loader from '../Loader';
import { quotesListState, loadedPagesState, QuoteList, PageList } from '../../store/atoms';
import getMangaList from '../queries/getMangaList';
const url = 'https://programming-quotes-api.herokuapp.com/Quotes?count='
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
};

function fetchQuotes(page) {
    return fetch(`${url}${page}`)
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err)
            return []
        });
}

const MangaContainer = (props) => {
    const [quotes, setQuotes] = useRecoilState(quotesListState)
    const [loadedPages, setloadedPages] = useRecoilState<PageList>(loadedPagesState);
    const [page, setPage] = useState<number>(1);
    const cardsRef = useRef(null);
    // const history = useHistory();
    const [mangas] = useQuery(getMangaList, null);
    const data = {
        "type": "website",
        "title": "The Weakest Occupation",
        "url": "https://chap.manganelo.com/manga-jd124271/chapter-19",
        "image": "https://avt.mkklcdnv6temp.com/32/e/22-1603699738.jpg",
        "description": "Read The Weakest Occupation - The people of this world are given occupations and weapons called Divine Treasures by God. It was said that the treasure was very strong and couldn’t be compared to the Human-made weapons. That’s occupations and weapons called Divine Treasures by God. It was said that the treasure was very strong and couldn’t be compared to the Human-made weapons. That’s",
        "site_name": "https://chap.manganelo.com/"
    }

    const callback = (entities) => {
        if (entities[0].isIntersecting) {
            setPage(loadedPages[loadedPages.length - 1] + 1);
        }
    }

    useEffect(() => {
        if (!loadedPages.includes(page)) {
            fetchQuotes(page)
                .then((qs) => {
                    setQuotes((quotes) => [...quotes, ...qs]);
                    setloadedPages((pages) => [...pages, page]);
                });
        }
    }, [page]);

    useEffect(() => {
        let observer;
        if (cardsRef.current) {
            observer = new IntersectionObserver(callback, options);
            observer.observe(cardsRef.current);
        }
        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    }, [quotes]);

    const cardWidget = (manga) => {
        return (
            <div className="flex bg-gray-100 p-0 max-w-md max-h-52 m-2">
                <div className="p-2">
                    <img className="h-48" src={manga.image} alt="img" style={{ minWidth: "8rem" }} />
                </div>
                <div className="p-2">
                    <div>
                        <a href={manga.url} target="_blank">
                            <p className="text-lg font-bold text-left">
                                {manga.title}
                            </p>
                        </a>
                    </div>
                    <div className="pt-2">
                        <p className="font-light text-sm text-left">
                            {manga.description.slice(0, 225)}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* {mangas.length == 0 && <Loader />} */}
            <div className='flex flex-row flex-wrap justify-evenly'>
                {mangas.map(cardWidget)}
                {cardWidget(data)}
                {cardWidget(data)}
                {cardWidget(data)}
                {cardWidget(data)}
                {cardWidget(data)}
            </div>
        </>
    );
}
export default memo(MangaContainer);