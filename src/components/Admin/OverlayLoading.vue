<template>
    <div class="overlay" v-if="condition()">
        <i class="fa fa-refresh fa-spin"></i>
    </div>
</template>

<script>
    import { action, getter } from '../../store/types'
    import { mapActions, mapGetters } from 'vuex'
    import { HasError } from 'vform'
    import BtnLoading from '../../directives/BtnLoading.vue'
    import linq from 'linq'

    export default {
        name: 'overlay-loading',

        props: {
            condition: {
                type: Function
            }
        },

        data() {
            return {
            }
        },

        computed: {
            ...mapGetters({
            }),
        },

        created() {
        },

        mounted() {

        },

        methods: {
            ...mapActions([
            ]),
        },

        components: {
        },

        directives: {
        }
    }

</script>

<style lang="scss" scoped>
</style>
