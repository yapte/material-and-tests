import { Message } from "./message";
import { MessagesFetchTrigger } from "./messages-fetch-trigger.enum";

export interface MessagesView {
    messages: Message[];
    fetchTrigger: MessagesFetchTrigger;
}