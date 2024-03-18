import { action, computed, makeObservable, observable } from 'mobx'
import { singleton } from 'tsyringe'

@singleton()
export class Instance {
  @observable
  public count = 0

  @action
  public increase() {
    this.count++
  }

  @computed
  public get getCount() {
    return this.count
  }

  constructor() {
    makeObservable(this)
  }
}
