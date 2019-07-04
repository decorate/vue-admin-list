<script>

    import $ from 'jquery'
    import equal from 'fast-deep-equal'
    import linq from 'linq'
    import Category from '../../models/Category'

    export default {
        name: 'tree-list',

        bind(el, binding, vnode) {
            binding.def.recursive(el, binding.value)
        },

        update (el, binding, vnode) {
        },

        async recursive (el, value) {
            if (!value.length) return

            await $(el).append('<ol class="tree-group"></ol>')
            value.forEach(async x => {
                const id = `tree-list${x.id}`

                const element = `<li id="${id}">${x.name}</li>`
                await $(el).children('ol').append(element)
                if (x.children.length) {
                    this.recursive(document.getElementById(id), x.children)
                }

            })
        }
    }


</script>