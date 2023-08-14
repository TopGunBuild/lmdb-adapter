import { LMDBStorage } from '../src';

const node = {
    '_'  : {
        '#': 'user/said',
        '>': {
            'say': 1683308843720
        }
    },
    'say': 'Hello'
};

describe('LMDB adapter test', () =>
{
    const storage = new LMDBStorage();

    it('simple put/get', async () =>
    {
        await storage.put('key1', node);
        const readNode = await storage.get('key1');

        expect(node.say).toBe(readNode.say);
    });

    it('get list by prefix', async () =>
    {
        await storage.put('key1', node);
        await storage.put('key2', node);
        await storage.put('key3', node);
        await storage.put('anotherKey', node);

        const readNodes = await storage.list({
            prefix: 'key'
        });

        expect(Object.keys(readNodes).length).toBe(3);
    });

    it('get list by prefix/limit', async () =>
    {
        await storage.put('key1', node);
        await storage.put('key2', node);
        await storage.put('key3', node);
        await storage.put('anotherKey', node);

        const readNodes = await storage.list({
            prefix: 'key',
            limit : 2
        });

        expect(Object.keys(readNodes).length).toBe(2);
    });

    it('get list by start/end', async () =>
    {
        await storage.put('2019-06-20T00:00', node);
        await storage.put('2019-06-20T11:59', node);
        await storage.put('2019-06-21T00:00', node);
        await storage.put('2019-06-22T00:00', node);
        await storage.put('2019-06-23T00:00', node);

        await storage.db.committed;

        const readNodes = await storage.list({
            start: '2019-06-20T00:00',
            end  : '2019-06-22T00:00',
        });

        expect(Object.keys(readNodes).length).toBe(3);
    });
});
