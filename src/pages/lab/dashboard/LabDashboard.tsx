import {useEffect, useState} from 'react'
import DashboardCard from "../../../components/common/DashboardCard";
import HeaderTab from "../../../components/common/HeaderTab";
import Table from "../../../components/common/Table";
import LabCard from '../../../components/common/LabCard';
import { Link } from 'react-router-dom';
import routeLinks from '../../../utils/routes';
function LabDashboard() {
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(false)
    }, [])
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Requests" count={0} />
          <DashboardCard title="Ongoning" count={50} />
          <DashboardCard title="Completed" count={30} />
          <DashboardCard title="Cancelled" count={20} />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-7 gap-4">
          <div className="md:col-span-4 border border-dashboard-gray p-2 lg:p-4 rounded-lg">
            <HeaderTab
              title="Sample Collection"
              showSearch={false}
              showSort={false}
            />
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table
                  data={[]}
                  columns={[]}
                  page={ 10}
                  total={ 0}
                  limit={10 }
                  totalPages={ 0}
                  setPage={() => {
                  }}
                  showPaginate={false}
                />
              )}
            </div>
          </div>

          {/* testing request  */}
              <main className='md:col-span-3 border border-dashboard-gray p-2 lg:p-4 rounded-lg'>
                <div className='flex items-center justify-between'>
                    <h4 className="text-sm 2xl:text-xl">Pending Test Requests </h4>
                    <Link to={routeLinks?.lab?.labRequests} className='text-sm'>See all</Link>
                </div>
                <div className='space-y-4 my-4'>
                    { [1,2,3,4].map((i) => (
                        <LabCard key={i}/>
                    ))}
                </div>
              </main>
        </div>
      </section>
    </div>
  );
}

export default LabDashboard;
