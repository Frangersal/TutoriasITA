import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types/inertia';
import AdminUsers from '@/components/tecnm_acapulco/admin/admin-users';
import TutorReunions from '@/components/tecnm_acapulco/tutor/tutor-reunions';
import StudentForms from '@/components/tecnm_acapulco/student/student-forms';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props } = usePage<PageProps>();
    // Hacer accesos más tolerantes: props.auth.user puede ser null
    const user = props.auth.user as { name?: string; email?: string; role?: string } | null;
    console.log('auth.user:', user);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <h1 className="text-2xl font-bold">Bienvenido, {user?.name ?? 'invitado'}</h1>

                {user?.role?.toLowerCase() === 'admin' && (
                    <p className="mt-4 font-semibold text-green-400">
                        Panel de administración 🔑
                    </p>
                )}

                {user?.role?.toLowerCase() === 'tutor' && (
                    <p className="mt-4 font-semibold text-blue-400">
                        Bienvenido tutor 📏
                    </p>
                )}

                {user?.role?.toLowerCase() === 'student' && (
                    <p className="mt-4 font-semibold text-yellow-400">
                        Bienvenido estudiante ✏️
                    </p>
                )}
            </div>
            {/* <h1>hola mundo ahahh</h1> */}
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div> */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {user?.role?.toLowerCase() === 'admin' && <AdminUsers />}
                    {user?.role?.toLowerCase() === 'tutor' && <TutorReunions />}
                    {user?.role?.toLowerCase() === 'student' && <StudentForms />}
                    
                    {!['admin', 'tutor', 'student'].includes(user?.role?.toLowerCase() || '') && (
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
