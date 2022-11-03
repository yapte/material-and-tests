export interface MessageDto {
    Id: string;
    text: string;
    authorId: string;
    author: string;
    datetime: Date;
    isCommon: boolean;
    isRead: boolean;
}