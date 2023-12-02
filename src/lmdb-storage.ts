import { TGStorage } from '@topgunbuild/topgun/storage';
import { TGGraphData, TGNode, TGOptionsGet } from '@topgunbuild/topgun/types';
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
            dupSort    : false,
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
        if (value)
        {
            await this.db.put(key, value);
        }
        else
        {
            await this.db.remove(key);
        }
    }

    list(options: TGOptionsGet): Promise<TGGraphData>
    {
        const result: TGGraphData        = {};
        const rangeOptions: RangeOptions = {};

        if (options['>'])
        {
            rangeOptions.start = options['>'];
        }
        if (options['<'])
        {
            rangeOptions.end = options['<'];
        }
        if (typeof options['-'] === 'boolean')
        {
            rangeOptions.reverse = options['-'];
        }

        if (options['*'])
        {
            const filterByPrefix = ({ key }) => key.startsWith(options['*']);

            if (options['%'])
            {
                this.db.getRange(rangeOptions)
                    .filter(filterByPrefix)
                    .slice(0, options['%'])
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
            if (options['%'])
            {
                rangeOptions.limit = options['%'];
            }

            for (const { key, value } of this.db.getRange(rangeOptions))
            {
                result[key] = value;
            }
        }

        return Promise.resolve(result);
    }
}
