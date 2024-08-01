import {describe, expect, it} from "@jest/globals";

import {sort} from "./sort";

describe("sort", () => {
    it("string", () => {
        expect.assertions(4);

        expect(sort<string>(["а", "ё"])).toStrictEqual(["а", "ё"]);
        expect(sort<string>(["ё", "а"])).toStrictEqual(["а", "ё"]);
        expect(sort<string>(["а", "б"])).toStrictEqual(["а", "б"]);
        expect(sort<string>(["б", "а"])).toStrictEqual(["а", "б"]);
    });

    it("number", () => {
        expect.assertions(4);

        expect(sort<number>([1, 2])).toStrictEqual([1, 2]);
        expect(sort<number>([2, 1])).toStrictEqual([1, 2]);
        expect(sort<number>([-1, 0])).toStrictEqual([-1, 0]);
        expect(sort<number>([Number.NaN, 0, 1, -1, Number.NaN])).toStrictEqual([Number.NaN, -1, 0, 1, Number.NaN]);
    });

    it("boolean", () => {
        expect.assertions(2);

        expect(sort<boolean>([false, true])).toStrictEqual([false, true]);
        expect(sort<boolean>([true, false])).toStrictEqual([false, true]);
    });

    it("object", () => {
        expect.assertions(3);

        expect(sort<{aaa: number}>([{aaa: 1}, {aaa: 2}], ["aaa"])).toStrictEqual([{aaa: 1}, {aaa: 2}]);
        expect(sort<{aaa: number}>([{aaa: 2}, {aaa: 1}], ["aaa"])).toStrictEqual([{aaa: 1}, {aaa: 2}]);
        expect(sort<{aaa: number}>([{aaa: 2}, {aaa: 1}], ["non-exist-key"])).toStrictEqual([{aaa: 2}, {aaa: 1}]);
    });
});
