import { atom } from "recoil";

export const searchWordAtom = atom({
    key: 'searchWord-atom',
    default: ''
});

export const offsetAtom = atom({
    key: 'offset-atom',
    default: 0
})

export const pageSizeAtom = atom({
    key: 'pageSize-atom',
    default: 10
})

export const yearAtom = atom({
    key: 'year-atom',
    default: 0
})

export const orderAtom = atom({
    key: 'order-atom',
    default: -1
})