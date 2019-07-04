import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import AdminList from '../src/components/AdminList'
import VueRouter from 'vue-router'
import axios from 'axios'
import Test from '../src/models/Test'
jest.mock('axios')

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('Admin List Component test', () => {

    let router
    let create

    let props = {}

    beforeEach(() => {
        router = new VueRouter({query: {paginate: '15'}})

        create = (prop) => {
            return shallowMount(AdminList, {
                propsData: {
                    columns: {
                        id: "ID",
                        name: "名前",
                        email: "メールアドレス",
                        test1: {
                            test2: {
                                test3: "テスト3",
                                test4: "テスト4"
                            }
                        }
                    },
                    model: Test
                },
                localVue,
                router
            })
        }
    })

    it('getData test', async () => {
        // props.columns =

        props = "ok"

        axios.get.mockImplementation(() => Promise.resolve({data: [
            {"id": 1,
                "name": "谷町 太郎",
                "email": "admin@email.com",
                "test1": {
                    "test2": {
                        "test3": "テスト3",
                        "test4": "テスト4"
                    }
                }
            }
        ]}))

        const wrapper = create(props)



        console.log(wrapper)

    })

})