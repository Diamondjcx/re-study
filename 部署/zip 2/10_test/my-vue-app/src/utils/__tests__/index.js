//  describe -- 套件

const { flatten } = require("../flatten");
const { domAdd } = require("../domAdd");
const { getDataTime, getDataList } = require('../api');

describe('数组打平测试 suite', () => {
    it('unitTest1: 数组打平', () => {
        expect(flatten([1,2,3,[4,5,6],7])).toEqual([1,2,3,4,5,6,7])
    });
    it('unitTest2: 数组打平', () => {
        expect(flatten('')).toBeUndefined()
    });
});

describe('dom suite', () => {
    it('unitTest1: body添加DOM', () => {
        const { body } = document;
        const div = domAdd(body);
        expect(body.hasChildNodes(div)).toBeTruthy();

    });
    it('unitTest2: div添加DOM', () => {
        const father = document.createElement('div');
        const div = domAdd(father);
        expect(father.hasChildNodes(div)).toBeTruthy();
    });
    it('unitTest3: 测试url', () => {
        jsdom.reconfigure({
            url: 'https://www.baidu.com/'
        });
        expect(window.location.href).toBe('https://www.baidu.com/');
    })

})

jest.useFakeTimers();

describe('延时测试 suite', () => {
    // it('unitTest1: 回调测试', (done) => {
    //     getDataTime((data) => {
    //         expect(data).toBeLessThan(1);
    //         expect(data).toBeGreaterThan(0);
    //         done();
    //     })
    // })
    it('unitTest1: 回调测试', () => {
        getDataTime((data) => {
            expect(data).toBeLessThan(1);
            expect(data).toBeGreaterThan(0);
        });
        jest.runAllTimers();
    });

    it('unitTest2: 回调测试', () => {
        getDataTime((data) => {
            expect(data).toBeLessThan(1);
            expect(data).toBeGreaterThan(0);
        });
        jest.advanceTimersByTime(10000);
    })
})

describe('异步测试 suite', () => {
    // it('unitTest1: 回调测试', (done) => {
    //     getDataTime((data) => {
    //         expect(data).toBeLessThan(1);
    //         expect(data).toBeGreaterThan(0);
    //         done();
    //     })
    // })
    it('unitTest1: async测试', async () => {
        const data = await getDataList();
        expect(data).toBeLessThan(1);
        expect(data).toBeGreaterThan(0);

    });
})

jest.mock('../api.js');
