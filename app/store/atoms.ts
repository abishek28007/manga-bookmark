import { atom } from 'recoil';

export type Quote = {
    id: string;
    author: string;
    en: string;
}
export type QuoteList = Array<Quote>
export type PageList = Array<number>

const initQuoteList: QuoteList = []
const initPageList: PageList = []

const quotesListState = atom({
    key: 'quotesList',
    default: initQuoteList
});

const loadedPagesState = atom({
    key: 'loadedPages',
    default: initPageList
})

export {
    quotesListState,
    loadedPagesState
}