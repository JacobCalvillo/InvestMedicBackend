import { Repository, EntityTarget, FindOptionsWhere, ObjectLiteral, DeepPartial } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";

// K debe extender tipos válidos para IDs en TypeORM
export abstract class BaseRepository<T extends ObjectLiteral, K extends string | number | Date> {
  protected repository: Repository<T>;
  
  constructor(entityClass: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(entityClass);
  }
  
  async findAll(): Promise<T[]> {
    return this.repository.find();
  }
  
  async findById(id: K): Promise<T | null> {
    return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }
  
  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return this.repository.save(newEntity);
  }
  
  async update(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity as T);
  }
  
  async delete(id: K): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
  
  // Métodos adicionales comunes
  async count(options?: FindOptionsWhere<T>): Promise<number> {
    return this.repository.count({ where: options });
  }
}