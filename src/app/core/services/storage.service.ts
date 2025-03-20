import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage!: Storage;

  constructor(private storage: Storage) {}

  public async init(): Promise<void> {
    if (this._storage != null) {
      return;
    }

    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any): Promise<any> {
    await this.init();
    return this._storage.set(key, value);
  }

  public async get(key: string): Promise<any> {
    await this.init();
    return this._storage?.get(key);
  }

  public async remove(key: string): Promise<any> {
    await this.init();
    return this._storage?.remove(key);
  }

  public async keys(): Promise<string[]> {
    await this.init();
    return this._storage?.keys();
  }
}
