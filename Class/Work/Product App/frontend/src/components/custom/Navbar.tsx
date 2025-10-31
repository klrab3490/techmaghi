import { ModeToggle } from '@/components/dark/mode-toggle.tsx';

export default function Navbar() {
    return (
        <nav className='flex justify-between items-center h-14 border-b px-6 bg-white dark:bg-gray-900 sticky top-0 z-50'>
            <div className='text-lg font-semibold'>Shopping Mall</div>
            <div className='flex gap-3 items-center'>
                <ModeToggle />
                <a href="/login" className='text-blue-600 hover:underline'>
                    Login
                </a>
            </div>
        </nav>
    )
}
