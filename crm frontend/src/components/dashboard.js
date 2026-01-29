// src/components/dashboard.js
import React from "react";
import {
  DollarSign,
  Users,
  Target,
  Award,
  UserCheck,
  Phone,
  Building,
  AlertCircle,
  Clock,
  Mail,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Sidebar1 from "./sidebar1";
import Header1 from "./header1";
import Layout from "../Layout/layout";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Metric Card Component
const MetricCard = ({ title, value, icon: Icon, trend, subtitle, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
    <div className="flex items-center">
      <div className="p-3 rounded-full mr-4" style={{ backgroundColor: color + "20" }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        {trend && <p className="text-xs text-gray-500">{trend}</p>}
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  </div>
);

// Pipeline Chart Component
const PipelineChart = ({ pipelineData }) => {
  const data = {
    labels: ["Prospects", "Qualified", "Proposal", "Negotiation", "Closed"],
    datasets: [
      {
        label: "Deals",
        data: [12, 9, 7, 5, 3],
        backgroundColor: "#3943FF",
      },
    ],
  };

  const options = {
    responsive: true,
    animation: { duration: 1000, easing: "easeOutQuart" }, // Smooth animation
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Pipeline Chart" },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <Bar data={data} options={options} />
    </div>
  );
};

// Recent Activity Chart Component
const RecentActivity = ({ activities }) => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Activities Completed",
        data: [3, 5, 2, 6, 4, 3, 5],
        borderColor: "#10B981",
        backgroundColor: "#10B98140",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: { duration: 1000, easing: "easeOutQuart" }, // Smooth animation
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Recent Activity" },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <Line data={data} options={options} />
    </div>
  );
};

// Top Deals Placeholder
const TopDeals = ({ deals }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold mb-4">Top Deals</h3>
    <p className="text-gray-500">[Top deals placeholder]</p>
  </div>
);

 function Dashboard() {

  const logged_user=JSON.parse(localStorage.getItem('user'))


  const metrics = {
    totalPipelineValue: 50000,
    openDeals: 12,
    totalLeads: 240,
    leadsThisMonth: 15,
    winRate: 32,
    wonDeals: 10,
    averageDealSize: 4200,
    newLeads: 5,
    qualifiedLeads: 8,
    overdueTasks: 3,
    activitiesThisWeek: 20,
    totalRevenue: 180000,
    leadConversionRate: 12,
    completedActivities: 50,
  };

  const deals = [];
  const activities = [];
  const pipelineData = [];
  const loading = false;

  const profile = { first_name: "Demo User" };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#3943FF" }}
          ></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
     <div>
     
      {/* <Sidebar1 /> 
       <Header1 /> */}
      <div>
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg text-white p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {logged_user.name || logged_user.Name}! 👋
              </h1>
              <p className="text-blue-100">
                Here's your sales performance overview for today
              </p>
            </div>
            <div className="mt-4 lg:mt-0 text-right">
              <p className="text-blue-100 text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Pipeline Value"
            value={formatCurrency(metrics.totalPipelineValue)}
            icon={DollarSign}
            trend={`${metrics.openDeals} open deals`}
            color="#3943FF"
          />
          <MetricCard
            title="Total Leads"
            value={metrics.totalLeads}
            icon={Users}
            trend={`+${metrics.leadsThisMonth} this month`}
            color="#10B981"
          />
          <MetricCard
            title="Win Rate"
            value={`${metrics.winRate.toFixed(1)}%`}
            icon={Target}
            trend={`${metrics.wonDeals} deals won`}
            color="#F59E0B"
          />
          <MetricCard
            title="Avg Deal Size"
            value={formatCurrency(metrics.averageDealSize)}
            icon={Award}
            trend="Per closed deal"
            color="#EF4444"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <MetricCard title="New Leads" value={metrics.newLeads} icon={UserCheck} color="#8B5CF6" />
          <MetricCard title="Qualified Leads" value={metrics.qualifiedLeads} icon={Phone} color="#06B6D4" />
          <MetricCard title="Active Deals" value={metrics.openDeals} icon={Building} color="#F97316" />
          <MetricCard title="Overdue Tasks" value={metrics.overdueTasks} icon={AlertCircle} color="#DC2626" />
          <MetricCard title="Activities" value={metrics.activitiesThisWeek} icon={Clock} subtitle="This week" color="#059669" />
        </div>

        {/* Charts and Activity */}
        {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PipelineChart pipelineData={pipelineData} />
          <RecentActivity activities={activities} />
        </div> */}

        {/* Top Deals and Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TopDeals deals={deals} />

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="w-8 h-8 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Add New Lead</p>
                  <p className="text-xs text-gray-600">Create a new lead entry</p>
                </div>
              </button>

              <button className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <DollarSign className="w-8 h-8 text-green-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Create Deal</p>
                  <p className="text-xs text-gray-600">Start a new opportunity</p>
                </div>
              </button>

              <button className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone className="w-8 h-8 text-orange-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Schedule Call</p>
                  <p className="text-xs text-gray-600">Book a follow-up call</p>
                </div>
              </button>

              <button className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-8 h-8 text-purple-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Send Email</p>
                  <p className="text-xs text-gray-600">Follow up via email</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Performance Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                Revenue Growth
              </h4>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {formatCurrency(metrics.totalRevenue)}
              </p>
              <p className="text-sm text-gray-500">Total revenue generated</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                Lead Conversion
              </h4>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {metrics.leadConversionRate.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500">Leads converted to deals</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                Activity Score
              </h4>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {metrics.completedActivities}
              </p>
              <p className="text-sm text-gray-500">Activities completed</p>
            </div>
          </div>
        </div>
      </div>
    
     </div>
      </Layout>
  );
}

export default Dashboard