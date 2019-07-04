<template>
  <div id="app">
      <AdminList
          :columns="columns"
          :model="model"
          :options="options"
      ></AdminList>
  </div>
</template>

<script>
    import AdminList from './components/AdminList'
    import Test from './models/Test'

    export default {
        data() {
            return {
                columns: {
                    id: "id",
                    name: "名前",
                    email: "メールアドレス",
                    test1: {
                        test2: {
                            test4: "テスト４",
                            test5: "テスト５",
                        }
                    }
                },
                model: Test,
                options: {
                    create: true,
                    remove: true,
                    edit: true
                }
            }
        },

        components: {
            AdminList
        }
    }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
