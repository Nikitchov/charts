import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { data } from './data';
import './style.css'; 

const Dashboard = () => {
  const [selectedData, setSelectedData] = useState(data[0]);

  const calculateTotalRevenue = (key) => {
    return data.reduce((total, item) => total + item[key], 0);
  };

  const getRevenueClass = (current, previous) => {
    if (current > previous) return 'positive';
    if (current < previous) return 'negative';
    return 'neutral';
  };

  const chartOptions = {
    title: {
      text: `Данные по: ${selectedData.label}`,
    },
    series: [{
      data: selectedData.chartData,
    }],
    chart: {
      type: 'line'
    }
  };

  return (
    <div className="dashboard-container">
      <div className="table-container">
              <table border="1" width="100%">
        <thead>
          <tr>
            <th>Показатель</th>
            <th>Текущий день</th>
            <th>Вчера</th>
            <th>Этот день недели</th>
          </tr>
        </thead>
        
        <tr className="total-row">
              <td>Выручка, руб</td>
              <td>{calculateTotalRevenue('today').toLocaleString()}</td>
              <td>{calculateTotalRevenue('yesterday').toLocaleString()}</td>
              <td>{calculateTotalRevenue('lastWeek').toLocaleString()}</td>
        
          </tr>
        </table>
        <div className="chart-container">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} /> 
        </div>
        <table border="1" width="100%">
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => setSelectedData(item)} style={{ cursor: 'pointer' }}>
              <td>{item.label}</td>
              <td className={getRevenueClass(item.today, item.yesterday)}>{item.today.toLocaleString()}</td>
                <td className={getRevenueClass(item.yesterday, item.lastWeek)}>{item.yesterday.toLocaleString()}</td>
                <td className="neutral">{item.lastWeek.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default Dashboard;
