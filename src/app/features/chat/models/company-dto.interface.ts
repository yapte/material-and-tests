import { MessageDto } from "./message-dto.interface";

export interface CompanyDto {
    Id: string;
    name: string;
    // messages: MessageDto[];
    unreadQty: number;
}