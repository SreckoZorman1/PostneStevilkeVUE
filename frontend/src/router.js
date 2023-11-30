import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/Profile/Profile';
import Forgot from '@/pages/Forgot/Forgot';
import VerifyEmail from '@/pages/VerifyEmail/VerifyEmail';
import Reset from '@/pages/Reset/Reset';
import StarterPage from '@/pages/Starter/StarterPage';
import Error from '@/pages/Error/Error';

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';

import UsersTable from '@/components/CRUD/Users/UsersTable';
import UsersEdit from '@/components/CRUD/Users/UsersEdit';
import UsersNew from '@/components/CRUD/Users/UsersNew';

import DrzaveTable from '@/components/CRUD/Drzave/DrzaveTable';
import DrzaveEdit from '@/components/CRUD/Drzave/DrzaveEdit';
import DrzaveNew from '@/components/CRUD/Drzave/DrzaveNew';

import OsebeTable from '@/components/CRUD/Osebe/OsebeTable';
import OsebeEdit from '@/components/CRUD/Osebe/OsebeEdit';
import OsebeNew from '@/components/CRUD/Osebe/OsebeNew';

import Postne_stevilkeTable from '@/components/CRUD/Postne_stevilke/Postne_stevilkeTable';
import Postne_stevilkeEdit from '@/components/CRUD/Postne_stevilke/Postne_stevilkeEdit';
import Postne_stevilkeNew from '@/components/CRUD/Postne_stevilke/Postne_stevilkeNew';

// Documentation
import { isAuthenticated } from './mixins/auth';
import ChangePassword from './pages/ChangePassword/ChangePassword';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: { name: 'Dashboard' } },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot,
    },
    {
      path: '/password-reset',
      name: 'reset',
      component: Reset,
    },
    {
      path: '/verify-email',
      component: VerifyEmail,
    },
    {
      path: '/starter',
      name: 'starter',
      component: StarterPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      redirect: { name: 'Dashboard' },
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/starter' });
      },
      children: [
        // main pages
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
        },
        {
          path: 'password',
          name: 'Password',
          component: ChangePassword,
        },
      ],
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: { name: 'Dashboard' },
      component: Layout,
      beforeEnter: (to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/login' });
      },
      children: [
        {
          path: 'users',
          name: 'Users',
          component: UsersTable,
        },
        {
          path: 'users/:id/edit',
          component: UsersEdit,
        },
        {
          path: 'users/new',
          component: UsersNew,
        },
        {
          path: 'users/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/users/${from.params.id}/edit`);
          },
        },

        {
          path: 'drzave',
          name: 'Drzave',
          component: DrzaveTable,
        },
        {
          path: 'drzave/:id/edit',
          component: DrzaveEdit,
        },
        {
          path: 'drzave/new',
          component: DrzaveNew,
        },
        {
          path: 'drzave/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/drzave/${from.params.id}/edit`);
          },
        },

        {
          path: 'osebe',
          name: 'Osebe',
          component: OsebeTable,
        },
        {
          path: 'osebe/:id/edit',
          component: OsebeEdit,
        },
        {
          path: 'osebe/new',
          component: OsebeNew,
        },
        {
          path: 'osebe/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/osebe/${from.params.id}/edit`);
          },
        },

        {
          path: 'postne_stevilke',
          name: 'Postne_stevilke',
          component: Postne_stevilkeTable,
        },
        {
          path: 'postne_stevilke/:id/edit',
          component: Postne_stevilkeEdit,
        },
        {
          path: 'postne_stevilke/new',
          component: Postne_stevilkeNew,
        },
        {
          path: 'postne_stevilke/:id',
          beforeEnter(from, to, next) {
            if (from.params.id === 'new') next();
            else next(`/admin/postne_stevilke/${from.params.id}/edit`);
          },
        },
      ],
    },
    {
      path: '*',
      name: 'Error',
      component: Error,
    },
  ],
});
