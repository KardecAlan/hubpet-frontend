import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      requiresAuth: true,
      menu: { title: 'Início', icon: 'home', hideOnDashboard: true }
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue')
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
      }
      ]
  },

  {
    path: '/boletim-ministerial',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      menu: { title: 'Boletim Ministerial', icon: 'description' },
      allowedRoles: ['cao', 'super-admin']
    },
    children: [
      {
        path: '',
        name: 'boletim-listagem',
        component: () => import('pages/boletim_ministerial/BoletimMinisterialList.vue')
      },
      {
        path: 'novo',
        name: 'boletim-novo',
        props: {
          isReadOnly: false,
          modo: 'Novo'
        },
        component: () => import('pages/boletim_ministerial/BoletimMinisterialForm.vue')
      },
      {
        path: 'visualizar',
        name: 'boletim-visualizar',
        props: route => ({
          id: Number(route.query.id),
          isReadOnly: true,
          modo: 'Visualizar'
        }),
        component: () => import('pages/boletim_ministerial/BoletimMinisterialForm.vue')
      },
      {
        path: 'editar',
        name: 'boletim-editar',
        props: route => ({
          id: Number(route.query.id),
          isReadOnly: false,
          modo: 'Editar'
        }),
        component: () => import('pages/boletim_ministerial/BoletimMinisterialForm.vue')
      },
      {
        path: 'processos/visualizar',
        name: 'boletim-processos-visualizar',
        props: route => ({
          id: Number(route.query.id),
          isReadOnly: true,
          breadcrumb: 'boletim'
        }),
        component: () => import('pages/processos/ProcessoForm.vue')
      },
      {
        path: 'processos/editar',
        name: 'boletim-processos-editar',
        props: route => ({
          id: Number(route.query.id),
          isReadOnly: false,
          breadcrumb: 'boletim'
        }),
        component: () => import('pages/processos/ProcessoForm.vue')
      },
    ]
  },

  {
    path: '/processos',
    name: 'processos',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      menu: { title: 'Processos', icon: 'article' },
      allowedRoles: ['cao', 'servidor', 'super-admin']
    },
    children: [
      {
        path: '',
        name: 'processos-listagem',
        component: () => import('pages/processos/ProcessoList.vue')
      },
      {
        path: 'visualizar',
        name: 'processos-visualizar',
        props: route => ({
          id: Number(route.query.id),
          isReadOnly: true,
          breadcrumb: 'processo'
        }),
        component: () => import('pages/processos/ProcessoForm.vue')
      },
      {
        path: 'editar',
        name: 'processos-editar',
        props: route => ({
            id: Number(route.query.id),
            isReadOnly: false,
            breadcrumb: 'processo'
        }),
        component: () => import('pages/processos/ProcessoForm.vue')}
    ],
  },
  {
    path: '/relatorios',
    meta: {
      requiresAuth: true,
      menu: { title: 'Relatórios', icon: 'print' },
      allowedRoles: ['cao', 'servidor', 'super-admin']
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'relatorio-listagem',
        component: () => import('pages/relatorios/RelatorioList.vue')
      },
    ]
  },

  {
    path: '/tutor',
    meta: {
      requiresAuth: true,
      menu: { title: 'Tutor', icon: 'account_circle' },
      allowedRoles: ['ROLE_USUARIO']
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'tutor-listagem',
        component: () => import('pages/tutor/TutorList.vue')
      },
      {
        path: '',
        name: 'tutor-visualizar',
        props: route => ({
          id: Number(route.query.id),
          isReadOnly: true,
          modo: 'Visualizar'
        }),
        component: () => import('pages/tutor/TutorForm.vue')
      },
      {
        path: '',
        name: 'tutor-editar',
        props: route => ({
          id: Number(route.query.id),
          modo: 'Editar',
          isReadOnly: false
        }),
        component: () => import('pages/tutor/TutorForm.vue')
      },
      {
        path: '/novo',
        name: 'tutor-novo',
        props: {
          isReadOnly: false,
          modo: 'Novo',
        },
        component: () => import('pages/tutor/TutorForm.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/ErrorNotFound.vue'),}
    ]
  },
];

export default routes;
