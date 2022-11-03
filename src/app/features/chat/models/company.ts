import { CompanyDto } from "./company-dto.interface";
import { Message } from "./message";

export class Company {
    id: string;
    name: string;
    // messages: Message[];
    unreadQty: number;

    constructor(dto: CompanyDto) {
        this.id = dto.Id;
        this.name = dto.name;
        // this.messages = dto.messages.map(m => new Message(m));
        this.unreadQty = dto.unreadQty;
    }
}