<template>
    <div id="paginate">
        <div class="row" v-if="paginate.currentPage">
            <div class="col-sm-12">
                <ul class="pagination">
                    <li class="paginate_button previous" :class="{disabled: paginate.prev.disabled}">
                        <router-link :to="{path: paginate.prev.path}">前へ</router-link>
                    </li>
                    <li class="paginate_button"
                        :class="{active: number.active}"
                        v-for="number in paginate.linkNumbers">
                        <router-link
                                :to="{path: number.path}">{{number.num}}</router-link>
                    </li>
                    <li class="paginate_button next" :class="{disabled: paginate.next.disabled}">
                        <router-link :to="{path: paginate.next.path}">次へ</router-link>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import Paginate from '../../models/Paginate'

    export default {
        name: 'paginate',

        data() {
            return {
            }
        },

        props: {
            paginate: {
                type: Paginate,
                required: true,
            }
        },

        computed: {
            ...mapGetters({
            })
        },

        async created() {
        },

        methods: {
            ...mapActions([
            ]),
        },

        components: {
        },
    }
</script>

<style>
    .paginate_button.disabled {
        pointer-events: none;
    }
</style>
