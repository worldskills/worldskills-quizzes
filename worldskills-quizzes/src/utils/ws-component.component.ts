import {Subscription} from 'rxjs';
import {OnDestroy} from '@angular/core';

abstract class WsComponentComponent implements OnDestroy {
  protected subscriptions: Array<Subscription> = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

export default WsComponentComponent;
