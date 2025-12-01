import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, User, Users, FileText, BarChart2 } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const page = usePage<SharedData>();
    const rawRole = (page.props.auth?.user as any)?.role ?? null;
    const role = rawRole ? String(rawRole).toLowerCase() : null;

    // Construir items según role
    const mainNavItems: NavItem[] = [
        { title: 'Inicio', href: dashboard(), icon: LayoutGrid },
        { title: 'Perfil', href: '/settings/profile', icon: User },
    ];

    if (role === 'admin') {
        mainNavItems.push(
            { title: 'Tutores', href: '/admin/tutors', icon: Users },
            { title: 'Alumnos', href: '/admin/pupils', icon: Users },
            { title: 'Formularios', href: '/admin/forms', icon: FileText },
            { title: 'Estadísticas', href: '/admin/stats', icon: BarChart2 },
        );
    } else if (role === 'tutor') {
        mainNavItems.push(
            { title: 'Reuniones', href: '/tutor/reunions', icon: Users },
            { title: 'Estadísticas', href: '/tutor/stats', icon: BarChart2 },
        );
    } else if (role === 'student' || role === 'pupil') {
        mainNavItems.push(
            { title: 'Formularios', href: '/student/forms', icon: FileText },
            { title: 'Reuniones', href: '/student/reunions', icon: Users },
        );
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
