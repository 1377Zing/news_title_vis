import {createRouter,createWebHashHistory} from "vue-router"
const router = createRouter({
  //内部提供了history模式的实现。为了简单起见，我们在这里使用hash模式。
  history: createWebHashHistory(),
  routes:[
	 {name:"mainpage",path:"/main",component:()=>import("../views/mainpage.vue")},
	  {name:"homepage",path:"/",component:()=>import("../views/homepage.vue")},
	  {name:"mappage",path:"/map",component:()=>import("../views/mappage.vue")},
	  {name:"dotpage",path:"/dot",component:()=>import("../views/dotpage.vue")},
	  {name:"testpage",path:"/test",component:()=>import("../views/test.vue")},
	   {name:"indexpage",path:"/index",component:()=>import("../views/indexpage.vue")},
	  

	
  ]
})
export default router

