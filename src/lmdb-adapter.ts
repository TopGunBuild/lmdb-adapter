import { createGraphAdapter } from 'topgun/storage';
import { TGGraphAdapterOptions, TGGraphAdapter } from 'topgun/types';
import { RootDatabaseOptions } from 'lmdb';
import { LMDBStorage } from './lmdb-storage';

export function createLMDBAdapter(
    name = 'topgun-nodes',
    options?: RootDatabaseOptions,
    adapterOptions?: TGGraphAdapterOptions
): TGGraphAdapter
{
    return createGraphAdapter(new LMDBStorage(name, options), adapterOptions);
}
