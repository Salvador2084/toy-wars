import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';
import { Product } from './pages/product/product';
import { Categories } from './pages/categories/categories';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Account } from './pages/account/account';
import { Wishlist } from './pages/wishlist/wishlist';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Faq } from './pages/faq/faq';
import { Policies } from './pages/policies/policies';
import { Blog } from './pages/blog/blog';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalog', component: Catalog },
  { path: 'product/:id', component: Product },
  { path: 'categories', component: Categories },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'account', component: Account, canActivate: [authGuard] },
  { path: 'wishlist', component: Wishlist },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'faq', component: Faq },
  { path: 'policies', component: Policies },
  { path: 'blog', component: Blog },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', component: NotFound },
];