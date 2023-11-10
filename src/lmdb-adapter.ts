import { TGGraphAdapter, TGGraphAdapterOptions } from '@topgunbuild/topgun/types';
import { createGraphAdapter } from '@topgunbuild/topgun/storage';
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
