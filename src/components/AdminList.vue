<template>
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header with-border" v-if="title||options.create">
                    <div class="d-flex">
                        <h3 class="box-title" v-show="title">{{title}}</h3>

<!--                        <router-link-->
<!--                                to="/"-->
<!--                                class="pull-right btn btn-primary">新規作成</router-link>-->
                    </div>
                </div>
                <div class="box-body">
                    <div class="AdminTables table-responsive">
                        <table class="table table-bordered table-responsive table-striped">
                            <thead>
                            <tr>
                                <th v-for="(column) in ColumnsConvert.getColumns()"
                                    class="AdminTables__th AdminTables__sort">
                                        <span class="AdminTables__heading">
                                            {{column.data.value}}
                                        </span>
                                </th>
                                <th class="AdminTables__th">
                                    <span class="AdminTables__heading">操作</span>
                                </th>
                            </tr>
                            </thead>


                            <tbody>
                            <tr v-for="record in paginateModel.data">
                                <td v-for="(column) in ColumnsConvert.getColumns()" class="AdminTables__th">
                                    {{getTableBody(record, column)}}
                                </td>
                                <td>
<!--                                    <router-link-->
<!--                                            v-if="options.edit"-->
<!--                                            to="/">-->
<!--                                        編集-->
<!--                                    </router-link>-->
                                    <button class="btn btn-xs btn-danger ml10"
                                            v-if="options.remove"
                                            @click="">
                                        <i class="fa fa-times fa fa-white"></i>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                <div class="box-footer with-border">
                    <paginate :paginate="paginateModel"></paginate>
                </div>
                <overlay-loading :condition="() => busy"></overlay-loading>
            </div>
        </div>
    </div>

</template>
<script>
    import Paginate from '../components/Admin/Paginate'
    import OverlayLoading from '../components/Admin/OverlayLoading.vue'
    import ColumnsConvert from '../services/ColumsConvert'
    import linq from 'linq'
    import Model from "../models/Parents/Model"
    import PaginateModel from "../models/Paginate"
    import { buildQuery } from '../utility/stringUtility'

    export default {
        name: "admin-list",

        data () {
            return {
                message: '',
                busy: false,
                paginateModel: new PaginateModel(),
                ColumnsConvert: new ColumnsConvert(this.columns)
            }
        },

        props: {
            title: {
                type: String
            },
            columns: {
                type: Object,
                required: true,
            },
            model: {
                required: true,
                validator: function (value) {
                    return value.prototype instanceof Model
                }
            },
            url: {
                type: String
            },
            sortable: {
                type: Object,
            },
            options: {
                type: Object,
                default: function () {
                    return {
                        create: true,
                        remove: true,
                        edit: true
                    }
                },
            },

            async created () {
                this.paginateModel.setModel(new this.model)
                this.getData()
            },

            methods: {
                //List用データ取得
                async getData () {
                    const fn = async () => {
                        console.log('getData')
                        const query = buildQuery(this.$route.query)

                        if(!this.url) {
                            //model名取得
                            const model = this.paginateModel.model._model.toLowerCase()
                            const { data } = await axios.get(`/api/${model}/list?${query}`)
                            this.paginateModel.create(data)
                        }else {
                            const { data } = await axios.get(this.url+'?'+query)
                            this.paginateModel.create(data)
                        }
                    }

                    this.loadFunc(fn)
                },


                test() {
                    console.log('testestestes!!!')
                },

                //table body 取得
                getTableBody(record, column) {

                    const bodyData = linq.from(record).firstOrDefault(x => {
                        if(column.parent.length===0) {
                            return (x.key === column.data.key)? x:''
                        } else {
                            return (x.key === column.parent[0])? x:''
                        }
                    }, '')

                    const parentToChild = this.ColumnsConvert.getParentToChild(column.data, column.parent)
                    return this.ColumnsConvert.getColumnValue(bodyData, parentToChild)
                },

                async loadFunc(fn) {
                    this.busy = true
                    try {
                        await fn()
                    } catch(e) {
                        throw new Error(e)
                    } finally {
                        this.busy = false
                    }
                }
            },

        },

        created() {
        },

        components: {
            Paginate,
            OverlayLoading
        }
    }
</script>

<style lang="scss" scoped>
    .AdminTables {
        overflow: auto;
        white-space: nowrap;

        &__th {
            min-width: 100px;
            max-width: 600px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &__sort {
            .AdminTables__heading {
            }

            &-icon {
                cursor: pointer;
            }

            &--acrive {
                display: block;
            }
        }
    }

    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, .1);
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, .5);
        border-radius: 10px;
        box-shadow:0 0 0 1px rgba(255, 255, 255, .3);
    }
</style>