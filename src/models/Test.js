
import Model from './Parents/Model'
import Test2 from "./Test2"

const FILLABEL = [
    'id',
    'name',
    'email',
    'test2',
]

export default class Test extends Model{

    constructor (data = null) {
        super()
        this.fillable = FILLABEL

        this.id = 0
        this.name = ''
        this.email = ''
        this.test2 = new Test2()

        this.data = data
    }

    get _model () {
        return 'Test'
    }

}
