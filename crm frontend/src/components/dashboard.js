import React, { useEffect, useState } from 'react';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import api from "../api";
import UniqueLoader from '../components/loader'

// Sample data for charts (replace with your real data)
const activityData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 700 },
  { name: 'May', value: 600 },
  { name: 'Jun', value: 800 },
];

const leadTargetData = [
  { name: 'Achieved', value: 75 },
  { name: 'Remaining', value: 25 },
];





const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

function Dashboard() {
  const mousehover = () => {
    document.getElementById('r').style.marginLeft = '10%';
  };

  const mouseout = () => {
    document.getElementById('r').style.marginLeft = '0%';
  };

  const [total_deal, settotal_deal] = useState(0);
  const [total_lead, settotal_lead] = useState(0);

  const [deal_loading, setdeal_loading] = useState(false);
  const [lead_loading, setlead_loading] = useState(false);

  const fetch_deal_data = async () => {
    setdeal_loading(true);
    try {
      const resp = await api.get("viewdeal");
      console.log(resp);
      
      settotal_deal(resp.data.deal.length);
    } catch (error) {
      console.error(error);
    } finally {
      setdeal_loading(false);
    }
  };

  const fetch_lead_data = async (page = 1, limit = 10) => {
    setlead_loading(true);
    try {
      const resp = await api.get(`leadinfo`);
      console.log(resp);
      
      settotal_lead(resp.data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setlead_loading(false);
    }
  };

  useEffect(() => {
    fetch_deal_data();
    fetch_lead_data();
  }, []);

  const statsData = [
    { name: "Contacts", value: 2020, loading: false },
    { name: "Leads", value: total_lead, loading: lead_loading },
    { name: "Deals", value: total_deal, loading: deal_loading },
    { name: "Projects", value: 120, loading: false },
    { name: "Units", value: 850, loading: false },
    { name: "Tasks", value: 45, loading: false },
  ];


  return (
    <div className="main-container-dashboard" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7fa',padding:"10%" }}>
      <div id="h" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <Header1 />
      </div>
      <div
        onMouseOver={mousehover}
        onMouseOut={mouseout}
        style={{
          position: 'fixed',
          left: 0,
          top: '60px', // Adjust based on header height
          height: 'calc(100vh - 60px)',
          transition: 'width 0.3s',
          zIndex: 9999,
        }}
      >
        <Sidebar1 />
      </div>
      <div
        className="pd-ltr-20"
        id="r"
        style={{
          marginLeft: '0%',
          transition: 'margin-left 0.5s',
          padding: '20px 20px 20px', // Padding for header and sidebar
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {/* Welcome Banner */}
        <div className="card-box pd-20 mb-30" style={{ borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: 'linear-gradient(135deg, #007bff, #00c6ff)' }}>
          <div className="row align-items-center text-white">
            <div className="col-md-4">
              <img src="vendors/images/banner-img.png" alt="Banner" style={{ borderRadius: '10px', maxWidth: '100%' }} />
            </div>
            <div className="col-md-8">
              <h4 className="font-20 weight-500 mb-10 text-capitalize">
                Welcome back <span className="weight-600 font-30">ADMIN</span>!
              </h4>
              <p className="font-18">Manage your real estate empire with real-time insights on leads, deals, and more.</p>
            </div>
          </div>
        </div>

        {/* Stats Widgets */}
        <div className="row">
      {statsData.map((stat, index) => (
        <div key={index} className="col-xl-2 col-lg-4 col-md-6 mb-30">
          <div
            className="card-box height-100-p widget-style1"
            style={{
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
            }}
          >
            <div className="d-flex flex-wrap align-items-center p-3">
              {stat.loading ? (
                <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      width: "100%", 
      height: "50px"  // 👈 fixed height for loader area
    }}>
                  <UniqueLoader />
                </div>
              ) : (
                <div className="widget-data text-center w-100">
                  <div className="h4 mb-0">{stat.value}</div>
                  <div className="weight-600 font-14">{stat.name}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>

        {/* Activity and Lead Target Charts */}
        <div className="row">
          <div className="col-xl-8 mb-30">
            <div className="card-box height-100-p pd-20" style={{ borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h2 className="h4 mb-20">Activity Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#007bff" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-xl-4 mb-30">
            <div className="card-box height-100-p pd-20" style={{ borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h2 className="h4 mb-20">Lead Target</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={leadTargetData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                    {leadTargetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}

export default Dashboard;
