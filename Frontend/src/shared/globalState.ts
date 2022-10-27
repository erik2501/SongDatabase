import { atom } from "recoil";

const offsetLS = parseInt(sessionStorage.getItem('offset') ?? '');
const yearLS = parseInt(sessionStorage.getItem('year') ?? '');

export const searchWordAtom = atom({
    key: 'searchWord-atom',
    default: ''//sessionStorage.getItem('searchWord') ?? '',
});

export const offsetAtom = atom({
    key: 'offset-atom',
    default: 0//isNaN(offsetLS) ? 0 : offsetLS,
})

export const yearAtom = atom({
    key: 'year-atom',
    default: 0//isNaN(yearLS) ? 0 : yearLS,
})