import { PrimaryColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

export class BaseEnity {
  @PrimaryColumn()
  id: string;

  /** @public constructor  */
  public constructor() {
    const hasNotPrimaryKey = !this.id;

    if (hasNotPrimaryKey) {
      this.id = uuid();
    }
  }
}
