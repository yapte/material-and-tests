import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatFacadeService } from '../../chat-facade.service';
import { Company } from '../../models/company';

@Component({
  selector: 'parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss']
})
export class PartiesComponent {
  private _activatedCompanyId: string;
  get activatedCompanyId(): string {
    return this._activatedCompanyId;
  }
  @Input() set activatedCompanyId(id: string) {
    if (this._activatedCompanyId !== id)
      this._activatedCompanyId = id;
  }

  companies$: Observable<Company[]> = this._facade.companies$;
  constructor(private _facade: ChatFacadeService) { }

  activate(id: string): void {
    if (this._activatedCompanyId !== id) {
      this._facade.fetchMessagesForCompany(id);
      this._activatedCompanyId = id;
    }
  }
}
