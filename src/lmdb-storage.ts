import { TGStorage, StorageListOptions } from 'topgun/storage';
import { TGGraphData, TGNode } from 'topgun/types';
import { open, RootDatabaseOptions, RootDatabase, RangeOptions } from 'lmdb';

export class LMDBStorage implements TGStorage
{
    readonly db: RootDatabase<TGNode, string>;

    /**
     * Constructor
     */
    constructor(path: string = 'topgun-nodes', options?: RootDatabaseOptions)
    {
        this.db = open({
            path       : path,
            // any options go here, we can turn on compression like this:
            compression: true,
            dupSort    : true,
            // encoding   : 'ordered-binary',
            ...(options || {})
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    get(key: string): Promise<TGNode|null>
    {
        return Promise.resolve(
            this.db.get(key)
        );
    }

    async put(key: string, value: TGNode): Promise<void>
    {
        await this.db.put(key, value);
    }

    list(options: StorageListOptions): Promise<TGGraphData>
    {
        const result: TGGraphData = {};

        if (options.prefix)
        {
            const rangeOptions: RangeOptions = {};

            if (options.start)
            {
                rangeOptions.start = options.start;
            }
            if (options.end)
            {
                rangeOptions.end = options.end;
            }
            if (typeof options.reverse === 'boolean')
            {
                rangeOptions.reverse = options.reverse;
            }

            const filterByPrefix = ({ key }) => key.startsWith(options.prefix);

            if (options.limit)
            {
                this.db.getRange(rangeOptions)
                    .filter(filterByPrefix)
                    .slice(0, options.limit)
                    .forEach(({ key, value }) =>
                    {
                        result[key] = value;
                    });
            }
            else
            {
                this.db.getRange(rangeOptions)
                    .filter(filterByPrefix)
                    .forEach(({ key, value }) =>
                    {
                        result[key] = value;
                    });
            }
        }
        else
        {
            for (const { key, value } of this.db.getRange(options))
            {
                result[key] = value;
            }
        }

        return Promise.resolve(result);
    }
}
