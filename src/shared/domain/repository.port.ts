export interface RepositoryPort<Entity> {
  insert(entity: Entity): Promise<void>;
  findOneById(id: string): Promise<Entity | undefined>;
  findAll(): Promise<Entity[]>;
  delete(id: string): Promise<boolean>;
}
