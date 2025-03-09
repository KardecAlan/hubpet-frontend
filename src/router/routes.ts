import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      requiresAuth: true,
      menu: { title: 'Início', icon: 'home', hideOnDashboard: true },
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },

  {
    path: '/login',
    meta: { requiresAuth: false },
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },

  {
    path: '/registrar',
    meta: { requiresAuth: false },
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },

  {
    path: '/tutor',
    meta: {
      requiresAuth: true,
      menu: { title: 'Tutor', icon: 'fas fa-id-card' },
      allowedRoles: ['ROLE_USUARIO'],
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'tutor-listagem',
        component: () => import('pages/tutor/TutorList.vue'),
      },
      {
        path: '',
        name: 'tutor-visualizar',
        props: (route) => ({
          id: Number(route.query.id),
          isReadOnly: true,
          modo: 'Visualizar',
        }),
        component: () => import('pages/tutor/TutorForm.vue'),
      },
      {
        path: '',
        name: 'tutor-editar',
        props: (route) => ({
          id: Number(route.query.id),
          modo: 'Editar',
          isReadOnly: false,
        }),
        component: () => import('pages/tutor/TutorForm.vue'),
      },
      {
        path: 'novo',
        name: 'tutor-novo',
        props: {
          isReadOnly: false,
          modo: 'Novo',
        },
        component: () => import('pages/tutor/TutorForm.vue'),
      },
    ],
  },

  {
    path: '/tutelado',
    meta: {
      requiresAuth: true,
      menu: { title: 'Tutelado', icon: 'fas fa-shield-dog' },
      allowedRoles: ['ROLE_USUARIO'],
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'tutelado-listagem',
        component: () => import('pages/tutelado/TuteladoList.vue'),
      },
      {
        path: '',
        name: 'tutelado-visualizar',
        props: (route) => ({
          id: Number(route.query.id),
          isReadOnly: true,
          modo: 'Visualizar',
        }),
        component: () => import('pages/tutelado/TuteladoForm.vue'),
      },
      {
        path: '',
        name: 'tutelado-editar',
        props: (route) => ({
          id: Number(route.query.id),
          modo: 'Editar',
          isReadOnly: false,
        }),
        component: () => import('pages/tutelado/TuteladoForm.vue'),
      },
      {
        path: 'novo',
        name: 'tutelado-novo',
        props: {
          isReadOnly: false,
          modo: 'Novo',
        },
        component: () => import('pages/tutelado/TuteladoForm.vue'),
      },
    ],
  },

  {
    path: '/consulta',
    meta: {
      requiresAuth: true,
      menu: { title: 'Consulta', icon: 'fas fa-calendar-check' },
      allowedRoles: ['ROLE_USUARIO'],
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'consulta-listagem',
        component: () => import('pages/consulta/ConsultaList.vue'),
      },
      {
        path: '',
        name: 'consulta-visualizar',
        props: (route) => ({
          id: Number(route.query.id),
          isReadOnly: true,
          modo: 'Visualizar',
        }),
        component: () => import('pages/consulta/ConsultaForm.vue'),
      },
      {
        path: '',
        name: 'consulta-editar',
        props: (route) => ({
          id: Number(route.query.id),
          modo: 'Editar',
          isReadOnly: false,
        }),
        component: () => import('pages/consulta/ConsultaForm.vue'),
      },
      {
        path: 'novo',
        name: 'consulta-novo',
        props: {
          isReadOnly: false,
          modo: 'Novo',
        },
        component: () => import('pages/consulta/ConsultaForm.vue'),
      },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ErrorNotFound.vue') },
    ],
  },
]

export default routes
