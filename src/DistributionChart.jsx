import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { registerables } from 'chart.js';

ChartJS.register(...registerables);

function DistributionChart({ data }) {
  // تبدیل اعداد به فارسی
  const convertToPersianNumbers = (num) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().split('').map((digit) => persianNumbers[parseInt(digit)] || digit).join('');
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "تعداد وقوع",
        data: data.values,
        backgroundColor: "rgba(104, 192, 75, 0.25)",
        borderColor: "rgb(0, 245, 4)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 245, 4, 0.5)", // تغییر رنگ هنگامی که موس روی داده می‌رود
        hoverBorderColor: "rgb(0, 200, 0)",
        borderRadius: 5, // گوشه‌های گرد
        barThickness: 20, // ضخامت میله‌ها
        fill: true, // پر کردن فضای زیر میله‌ها
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // محل نمایش Legend
        labels: {
          font: {
            size: 14, // تغییر اندازه فونت Legend
            family: 'Arial, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // رنگ پس‌زمینه tooltip
        titleFont: {
          size: 16, // تغییر اندازه عنوان در tooltip
        },
        bodyFont: {
          size: 14, // تغییر اندازه متن در tooltip
        },
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${convertToPersianNumbers(tooltipItem.raw)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return convertToPersianNumbers(value); // تبدیل اعداد محور y به فارسی
          },
        },
        title: {
          display: true,
          text: 'تعداد وقوع', // عنوان محور y
          font: {
            size: 16, // اندازه فونت عنوان محور y
            family: 'Arial, sans-serif',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'مقادیر k', // عنوان محور x
          font: {
            size: 16, // اندازه فونت عنوان محور x
            family: 'Arial, sans-serif',
          },
        },
        ticks: {
          callback: function(value) {
            return convertToPersianNumbers(value); // تبدیل اعداد محور x به فارسی
          },
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3>نمودار توزیع</h3>
        <p>این نمودار نمایش‌دهنده توزیع داده‌های شما است.</p>
      </div>
      <Bar data={chartData} options={options} />
    </>
  );
}

export default DistributionChart;
