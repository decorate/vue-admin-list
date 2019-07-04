import { shallowMount, createLocalVue } from '@vue/test-utils'
import ColumsConvert from '../src/services/ColumsConvert'
import linq from 'linq'

const localVue = createLocalVue()

let actual, expected

describe('test', () => {

    const data = {
        test1: {
            test2: {
                test3: "テスト3",
                test4: "テスト4",
            }
        },
        test5: "テスト5"
    }

    const columnConvert = new ColumsConvert(data)


    it('ColumsConvert', () => {

        actual = columnConvert.getColumns()

        expected = [
            {
                data: {"key": "test3", "value": "テスト3"},
                parent: ["test1", "test2"]
            },
            {
                data: {"key": "test4", "value": "テスト4"},
                parent: ["test1", "test2"]
            },
            {
                data: {"key": "test5", "value": "テスト5"},
                parent: []
            }

        ]

        expect(actual).toEqual(expected)
    })


    it('getParentToChild', function () {
        let mock1 = {key: "test3", value: 'テスト3'}
        let mock2 = ["test1", "test2"]

        actual = columnConvert.getParentToChild(mock1, mock2)
        expected = ["test1", "test2", "test3"]

        expect(actual).toEqual(expected)
    })

    it('getColumnValue', function () {
        let getParentToChild = ["test1", "test2", "test3"]
        let mock1 = {key: "test3", value: "テスト3"}

        actual = columnConvert.getColumnValue(mock1, getParentToChild)

        expect(actual).toEqual(mock1.value)
    })

    it('isObject', function () {
        let mock1 = {}
        let mock2 = []
        let mock3 = ''

        actual = columnConvert.isObject(mock1)
        expect(actual).toEqual(true)
        expect(columnConvert.isObject(mock2)).toEqual(false)
        expect(columnConvert.isObject(mock3)).toEqual(false)
    })

})
