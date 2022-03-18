import {Injectable} from '@angular/core';
import {combineLatest, ReplaySubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {Language} from '@worldskills/worldskills-angular-lib';

@Injectable({
  providedIn: 'root'
})
export class LocaleContextService {

  subject = new ReplaySubject<Language>(1);
  override = new ReplaySubject<Language>(1);
  effectiveOverriddenLanguage = new ReplaySubject<Language>(1);
  lock = new ReplaySubject<boolean>(1);
  lockedLanguage: Language;
  private locked: boolean;

  constructor(private translateService: TranslateService) {
    this.lock.subscribe(locked => (this.locked = locked));
    this.subject.subscribe(language => this.translateService.use(language.code));
    this.subject.next(this.defaultLanguage);
    this.override.next(null);
    combineLatest([this.subject, this.override]).subscribe(([s, o]) => {
      this.effectiveOverriddenLanguage.next(o || s);
    });

    this.lock.next(false);
  }

  get languages(): Array<Language> {
    return [
      {code: 'en', name: 'English'},
      {code: 'de', name: 'German'},
      {code: 'fr', name: 'French'},
      {code: 'fi', name: 'Finnish'},
      {code: 'pt_BR', name: 'Brazilian'},
      {code: 'ar_AE', name: 'Arabic'},
      {code: 'ru_RU', name: 'Russian'},
      {code: 'tt_RU', name: 'Tatar'},
      {code: 'zh_CN', name: 'Chinese'},
    ];
  }

  get defaultLanguage() {
    return this.languages[0];
  }

  changeLanguage(language: Language) {
    this.subject.next(language);
  }

  lockLanguage(language: Language = null) {
    if (!this.locked) {
      this.lockedLanguage = language || this.defaultLanguage;
      this.lock.next(true);
    }
  }

  unlockLanguage() {
    if (this.locked) {
      this.lock.next(false);
    }
  }

}
