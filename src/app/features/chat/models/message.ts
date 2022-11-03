import { MessageDto } from './message-dto.interface';

export class Message {
    id: string;
    text: string;
    authorId: string;
    author: string;
    datetime: Date;
    isCommon: boolean;
    isRead: boolean;

    constructor(dto?: MessageDto) {
        this.id = dto?.Id;
        this.text = dto?.text;
        this.authorId = dto?.authorId;
        this.author = dto?.author;
        this.datetime = dto?.datetime;
        this.isCommon = dto?.isCommon;
        this.isRead = dto?.isRead;
    }
}