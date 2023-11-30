import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';
import snackbar from './snackbar';
import auth from './auth';
import register from '@/store/register';
import changePassword from './changePassword';
import forgot from './forgot';
import reset from './reset';
import users from './lists/usersList';
import usersForm from './forms/usersForm';

import drzave from './lists/drzaveList';
import drzaveForm from './forms/drzaveForm';

import osebe from './lists/osebeList';
import osebeForm from './forms/osebeForm';

import postne_stevilke from './lists/postne_stevilkeList';
import postne_stevilkeForm from './forms/postne_stevilkeForm';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    register,
    layout,
    changePassword,
    forgot,
    reset,
    snackbar,

    users,
    usersForm,

    drzave,
    drzaveForm,

    osebe,
    osebeForm,

    postne_stevilke,
    postne_stevilkeForm,
  },
});
