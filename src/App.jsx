import { createBrowserRouter, RouterProvider } from 'react-router-dom'  // Adjust the path if necessary
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './Jobs';
import Profile from './Profile'
import Companies from './components/admin/Companies'
import JobDescription from './JobDescription';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import BrowseJobs from './BrowseJobs';
import ProtectedRoute from './components/admin/ProtectedRoute';






const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/jobs',
    element: <Jobs/>
  },
  {
    path: '/browse',
    element: <BrowseJobs/>
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/admin/companies',
    element: 
    <ProtectedRoute>
      <Companies/>
    </ProtectedRoute>
  },
   {
    path: '/admin/companies/create',
    element: <CompanyCreate/>
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup/>
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs/>
  },
  {
    path: '/admin/jobs/create',
    element: <PostJob/>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <Applicants/>
  }
  
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App