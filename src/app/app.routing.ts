import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './components/layouts/full-layout.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GenericEditComponent } from './components/generic/generic-edit.component';
import { GenericCreateComponent } from './components/generic/generic-create.component';
import { RoleListComponent } from './admin/roles/role-list/role-list.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';




const appRoutes: Routes = [
      { path: 'about', loadChildren: './+about/about.module#AboutModule' },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'admin',
                redirectTo: 'admin/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'admin',
                data: {
                    title: 'admin'
                },
                children: [
                    {
                        path: 'dashboard',
                        component: DashboardComponent
                    },
                    {
                        path: 'users',
                        data: {
                            data: 'users'
                        },
                        children: [
                            {
                                path: '',
                                component: UserListComponent,
                                data: {
                                    api: 'users'
                                }
                            },
                            {
                                path: 'create',
                                component: GenericCreateComponent,
                                data: {
                                    data: 'users',
                                    item: 'users'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: GenericEditComponent,
                                data: {
                                    data: 'users',
                                    item: 'users'
                                }
                            }
                        ]
                    },
                    {
                        path: 'roles',
                        data: { data: 'roles' },
                        children: [
                            {
                                path: '',
                                component: RoleListComponent,
                                data: {
                                    api: 'roles'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: GenericEditComponent,
                                data: {
                                    data: 'roles',
                                    item: 'roles'
                                }
                            },
                            {
                                path: 'create',
                                component: GenericCreateComponent,
                                data: {
                                    data: 'roles',
                                    item: 'roles'
                                }
                            }

                        ]
                    },
                ],
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'admin/dashboard'
    }
];

export const routing = RouterModule.forRoot(appRoutes);