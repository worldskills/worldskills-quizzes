import {Subscription, TeardownLogic} from 'rxjs';
import {OnDestroy} from '@angular/core';

abstract class WsComponent implements OnDestroy {
  protected subscriptions: Subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected subscribe(...teardowns: Array<TeardownLogic>) {
    teardowns.forEach(teardown => this.subscriptions.add(teardown));
  }

}

export default WsComponent;
