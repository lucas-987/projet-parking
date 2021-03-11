import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../components/Home.vue'
import ParkingHome from '../pages/parking/ParkingHome'
import ParkingChoice from '../pages/parking/ParkingChoice';
import ParkingReservation from '../pages/parking/ParkingReservation';

const routes = [
  {
    path: '/',
    redirect: '/home'
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
