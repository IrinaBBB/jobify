import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
    HomeLayout,
    Register,
    Login,
    Error,
    Landing,
    DashboardLayout, Admin, Profile, AllJobs, AddJob, Stats,
} from './pages'


export const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
    document.body.classList.toggle('dark-theme', isDarkTheme)
    return isDarkTheme
}

checkDefaultTheme()

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <AddJob />,
                    },
                    { path: 'stats', element: <Stats /> },
                    {
                        path: 'all-jobs',
                        element: <AllJobs />,
                    },

                    {
                        path: 'profile',
                        element: <Profile />,
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
                    },
                ],
            },
            {
                path: 'landing',
                element: <Landing />,
            },
        ],
    },
])

const App = () => {
    return <RouterProvider router={router} />
}
export default App