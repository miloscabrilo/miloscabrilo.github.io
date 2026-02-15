import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage = inject(Storage);
  private _storage!: Storage;

  async init(): Promise<void> {
    if (this._storage != null) {
      return;
    }

    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: unknown): Promise<unknown> {
    await this.init();
    return this._storage.set(key, value);
  }

  async get(key: string): Promise<unknown> {
    await this.init();
    return this._storage?.get(key);
  }

  async remove(key: string): Promise<void> {
    await this.init();
    return this._storage?.remove(key);
  }

  async keys(): Promise<string[]> {
    await this.init();
    return this._storage?.keys();
  }
}
