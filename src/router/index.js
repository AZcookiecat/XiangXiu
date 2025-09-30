import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import RegisterView from '../views/RegisterView.vue'
import ExhibitionView from '../views/ExhibitionView.vue'
import VenueTourView from '../views/VenueTourView.vue'
import VenueExhibitionView from '../views/VenueExhibitionView.vue'
import CollectView from '../views/CollectView.vue'
import KnowledgeGraphView from '../views/KnowledgeGraphView.vue'
import PeripheralView from '../views/PeripheralView.vue'
import BlogView from '../views/BlogView.vue'
import TeamView from '../views/TeamView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/index', name: 'index', component: HomeView },
    { path: '/shop', name: 'shop', component: ShopView },
    { path: '/product/:id', name: 'product', component: ProductView, props: true },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/exhibition', name: 'exhibition', component: ExhibitionView },
    { path: '/venue-tour', name: 'venue-tour', component: VenueTourView },
    { path: '/venue-exhibition', name: 'venue-exhibition', component: VenueExhibitionView },
    { path: '/collect', name: 'collect', component: CollectView },
    { path: '/knowledge-graph', name: 'knowledge-graph', component: KnowledgeGraphView },
    { path: '/peripheral', name: 'peripheral', component: PeripheralView },
    { path: '/blog', name: 'blog', component: BlogView },
    { path: '/team', name: 'team', component: TeamView },
    { path: '/contact', name: 'contact', component: ContactView }
  ]
})

export default router