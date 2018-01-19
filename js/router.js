const pageHome = { templateUrl: "/page/dataCenter.html"}
const dataCenter = { templateUrl: "/page/dataCenter.html" }

const routes = [
    { path: '/pageHome',
        name:'home',
        title:'home',
        component:function (resolve) {
            return '/page/dataCenter.html';
        }
    },



    { path: '/dataCenter',
        name:'home',
        title:'home',
        component:function (resolve) {
            return '<div>111</div>';
        } }
]
const router = new VueRouter({
    routes: routes // （缩写）相当于 routes: routes
})

