import { Injectable } from '@nestjs/common';

interface CacheEntry<T> {
  key: string;
  value: T;
}

@Injectable()
export class CacheAltService<T> {
  private readonly maxSize: number;
  private cache: CacheEntry<T>[];

  constructor(maxSize: number) {
    if (maxSize <= 0) {
      throw new Error('Cache size must be greater than zero.');
    }
    this.maxSize = maxSize;
    this.cache = [];
  }

  public get(key: string): T | undefined {
    const entry = this.cache.find((item) => item.key === key);
    if (entry) {
      return entry.value;
    }
    return undefined;
  }

  public set(key: string, value: T): void {
    if (this.cache.length >= this.maxSize) {
      this.cache.shift();
    }
    this.cache.push({ key, value });
  }

  public remove(key: string): void {
    this.cache = this.cache.filter((item) => item.key !== key);
  }

  public clear(): void {
    this.cache = [];
  }

  public getSize(): number {
    return this.cache.length;
  }

  public getMaxSize(): number {
    return this.maxSize;
  }
}
