import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChatComponent } from "./components/chat/chat.component";
import { MessageComponent } from './components/message/message.component';
import { MessageAuthorComponent } from './components/message-author/message-author.component';
import { MessageTextComponent } from './components/message-text/message-text.component';
import { MessageTableComponent } from './components/message-table/message-table.component';
import { MessageActionsComponent } from './components/message-actions/message-actions.component';
import { MessageReadIndicatorComponent } from './components/message-read-indicator/message-read-indicator.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatBadgeModule } from "@angular/material/badge";
import { AcceptDialogComponent } from "./components/accept-dialog/accept-dialog.component";
import { EditorComponent } from './components/editor/editor.component';
import { PartiesComponent } from './components/parties/parties.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageFilesComponent } from './components/message-files/message-files.component';
import { MessageDatetimeComponent } from './components/message-datetime/message-datetime.component';
import { ActionsBottomSheetComponent } from './components/actions-bottom-sheet/actions-bottom-sheet.component';
import { MatListModule } from "@angular/material/list";
import { ChatFacadeService } from "./chat-facade.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
    exports: [
        ChatComponent,
    ],
    imports: [
        CommonModule,

        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatBadgeModule,
        MatListModule,
        MatSnackBarModule,
    ],
    declarations: [
        ChatComponent,
        MessageComponent,
        MessageAuthorComponent,
        MessageTextComponent,
        MessageTableComponent,
        MessageActionsComponent,
        MessageReadIndicatorComponent,
        AcceptDialogComponent,
        EditorComponent,
        PartiesComponent,
        MessagesComponent,
        MessageFilesComponent,
        MessageDatetimeComponent,
        ActionsBottomSheetComponent,
    ],
    providers: [ChatFacadeService],
})
export class ChatModule { }