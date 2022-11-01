export type Song = {
    songID: number,
    songName: string,
    artistName: string,
    imageURL: string
}

export type SongAllData = {
    songID: number,
    songName: string,
    artistName: string,
    durationMS: number,
    year: number,
    energy: number,
    imageURL: string
}

export interface reviewProp {
    userName: string,
    star: number,
    description: string,
}