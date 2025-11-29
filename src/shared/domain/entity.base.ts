export interface BaseEntityProps {
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<T extends BaseEntityProps> {
  protected readonly _id: string;
  protected readonly props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : crypto.randomUUID();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}

function isEntity<T extends BaseEntityProps>(v: unknown): v is Entity<T> {
  return v instanceof Entity;
}
