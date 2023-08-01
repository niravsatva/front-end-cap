import { AuthLayout } from 'components/Global/AuthLayout';
import GlobalLayout from 'layouts/Global';
import { ForgotPassword, Home, Login, ResetPassword } from 'pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{
				path: '/',
				element: <GlobalLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
				],
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/reset-password',
				element: <ResetPassword />,
			},
			{
				path: '/forgot-password',
				element: <ForgotPassword />,
			},
		],
	},
]);

export default router;
