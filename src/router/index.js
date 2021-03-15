import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../components/Home.vue'
import ParkingHome from '../pages/parking/ParkingHome'
import ParkingChoice from '../pages/parking/ParkingChoice';
import ParkingReservation from '../pages/parking/ParkingReservation';
import LoginPage from '../pages/authentification/LoginPage'
import LogoutPage from '../pages/authentification/LogoutPage'
import TabsPage from '../pages/admin/TabsPage'
import CityPage from '../pages/admin/CityPage'
import CityAdd from '../pages/admin/CityAdd'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/logout',
    component: LogoutPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/parking/',
    component: ParkingHome,
    /*children: [
      {
        path: ":id",
        component: ParkingChoice,
      }
    ]*/
  },
  {
    path: "/parking/:id",
    component: ParkingChoice,
  },
  {
    path: "/parking/reservation/:cityId/:parkingId",
    component: ParkingReservation,
  },
  {
    path: "/admin/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/admin/parking"
      },
      /*{
        path: "/cities",
        component: 
      },*/
      {
        path: "parking",
        component: ParkingHome
      },
      {
        path: "parking/:id",
        component: ParkingChoice,
      },
      {
        path: "parking/reservation/:cityId/:parkingId",
        component: ParkingReservation,
      },
      {
        path: "city",
        component: CityPage
      },
      {
        path: "city/add",
        component: CityAdd
      },
      {
        path: "logout",
        component: LogoutPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
