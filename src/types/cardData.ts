export interface ICardData {
    id: string;
    title: string
    selftext_html?: string
    url?: string
    score: number
}

export interface IPost {
    data: ICardData
}