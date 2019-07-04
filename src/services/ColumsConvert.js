import linq from 'linq'


export default class ColumnsConvert {
    constructor(columns) {
        this.columns = columns

        this.parentData = []
        this.columnData = []
        this.create(this.columns)
    }

    create(value) {
        linq.from(value).forEach(x => {

            if(this.isObject(x.value)){
                this.parentData.push(x.key)
                this.create(x.value)
                this.parentData.pop()
            } else {

                let obj = {}
                obj.data = x
                obj.parent = this.parentData.slice()
                this.columnData.push(obj)
            }
        })

        return
    }

    getColumns() {
        return this.columnData
    }

    //親から一番下の子供までのkey配列取得
    getParentToChild(column, keys) {
        const tmp = keys.slice()
        tmp.push(column.key)
        return tmp
    }

    getColumnValue(child, parentToChild) {
        if(this.isObject(child.value)) {
            let tmp = parentToChild.slice()
            tmp.shift()

            const childData = linq.from(child.value).where(x => {
                if(x.key === tmp[0]) {
                    return x
                }
            }).first()

            if(this.isObject(childData.value)) {
                this.getColumnValue(childData, tmp)
            }
            return childData.value

        }
        return child.value
    }

    isObject(data) {
        return (data instanceof Object && !(data instanceof Array))? true : false
    }
}