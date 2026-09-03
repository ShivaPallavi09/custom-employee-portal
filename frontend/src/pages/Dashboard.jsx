import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { fetchZohoData } from '../services/zohoService';
import { Users, TrendingUp, Headphones, Briefcase, Activity, ExternalLink } from 'lucide-react';

// Maps roles to their authorized Zoho applications
const ROLE_APP_MAP = {
  HR: [{ id: 'people', name: 'Zoho People', description: 'HR management functions', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' }],
  Sales: [{ id: 'crm', name: 'Zoho CRM', description: 'Sales and customer relationship', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' }],
  Support: [{ id: 'desk', name: 'Zoho Desk', description: 'Support ticketing and cases', icon: Headphones, color: 'text-orange-600', bg: 'bg-orange-100' }],
  Finance: [{ id: 'books', name: 'Zoho Books', description: 'Financial and accounting', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' }],
  Admin: [
    { id: 'people', name: 'Zoho People', description: 'HR management functions', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'crm', name: 'Zoho CRM', description: 'Sales and customer relationship', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'desk', name: 'Zoho Desk', description: 'Support ticketing and cases', icon: Headphones, color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 'books', name: 'Zoho Books', description: 'Financial and accounting', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' }
  ],
  Employee: [] // Fallback for basic users without specific department roles
};

const Dashboard = () => {
  const { user } = useAuth();
  const [activeApp, setActiveApp] = useState(null);
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const authorizedApps = ROLE_APP_MAP[user?.role] || [];

  const handleAppClick = async (app) => {
    setActiveApp(app.name);
    setLoading(true);
    setError('');
    setAppData(null);

    try {
      const data = await fetchZohoData(app.id);
      setAppData(data);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to connect to ${app.name} API securely.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your assigned role is <span className="font-semibold text-gray-700">{user?.role}</span>. Here are your authorized applications.
        </p>
      </div>

      {authorizedApps.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
          <Activity className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Applications Assigned</h3>
          <p className="mt-1 text-sm text-gray-500">Contact your administrator to request access to Zoho services.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {authorizedApps.map((app) => (
            <div
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group relative"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${app.bg}`}>
                    <app.icon className={`h-6 w-6 ${app.color}`} aria-hidden="true" />
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-900 truncate">{app.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-xs text-gray-500 truncate">{app.description}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-blue-600 group-hover:text-blue-500 flex items-center">
                    Access Portal <ExternalLink className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Zoho Data Viewer Interface */}
      {activeApp && (
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{activeApp} Secure Portal View</h3>
            <button 
              onClick={() => setActiveApp(null)}
              className="text-gray-400 hover:text-gray-500 text-sm font-medium"
            >
              Close Viewer
            </button>
          </div>
          <div className="p-6">
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 text-sm">Authenticating via backend service account...</span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md text-sm">
                {error}
              </div>
            )}

            {appData && (
              <div>
                <div className="mb-4 flex items-center text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-100">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Successfully securely connected to {activeApp} via Backend RBAC.
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-green-400 font-mono">
                    {JSON.stringify(appData, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;