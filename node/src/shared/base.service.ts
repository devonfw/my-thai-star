import { Repository, DeepPartial } from 'typeorm';

export abstract class BaseService<T> {
  protected _repository: Repository<T>;

  async findAll(filter = {}): Promise<T[]> {
    return await this._repository.find(filter);
  }

  async findById(id: any): Promise<T> {
    return await this._repository.findOne(id);
  }

  async delete(item: T): Promise<T | null> {
    const deleted = await this._repository.remove(item);
    if (deleted) return item;
  }

  async deleteById(id: any): Promise<T | null> {
    const exists = await this._repository.findOne(id);
    if (exists) {
      const deleted = await this._repository.remove(exists);
      if (deleted) return exists;
    }

    return null;
  }

  async update(id: number, item: DeepPartial<T>): Promise<T | null> {
    let exists = await this._repository.findOne(id);
    const updated = await this._repository.update(id, item);
    exists = await this._repository.findOne(id);
    if (updated) return exists;
    return null;
  }
}
