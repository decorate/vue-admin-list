import Model from './Parents/Model'
// import Test5 from './Test5'

const FILLABEL = [
    'id',
    'test3',
    'test4'
]

export default class Test2 extends Model{

    constructor (data = null) {
        super()
        this.fillable = FILLABEL

        this.id = 0
        this.test3 = ''
        this.test4 = ''

        this.data = data
    }

    get _model () {
        return 'Test2'
    }

}
