import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import DistributionChart from "./DistributionChart";
import Distributions from "./distributions";

// تنظیم پارامترهای توزیع‌ها
const distributionParams = {
  "برنولی": [{ id: "p", label: "p (احتمال موفقیت):", placeholder: "0.5" }],
  "دو جمله ای": [
    { id: "n", label: "n (تعداد آزمایش‌ها):", placeholder: "10" },
    { id: "p", label: "p (احتمال موفقیت):", placeholder: "0.5" },
  ],
  "دو جمله ای منفی": [
    { id: "r", label: "r (تعداد موفقیت‌ها):", placeholder: "5" },
    { id: "p", label: "p (احتمال موفقیت):", placeholder: "0.5" },
  ],
  "فوق هندسی": [
    { id: "N", label: "N (اندازه جمعیت):", placeholder: "50" },
    { id: "K", label: "K (تعداد موفقیت‌ها در جمعیت):", placeholder: "10" },
    { id: "n", label: "n (تعداد کشیدن‌ها):", placeholder: "5" },
  ],
  "پواسون": [{ id: "lambda", label: "λ (نرخ میانگین):", placeholder: "2" }],
  "هندسی": [{ id: "p", label: "p (احتمال موفقیت):", placeholder: "0.5" }],
  "نمایی": [{ id: "lambda", label: "λ (نرخ):", placeholder: "1" }],
  "نرمال": [
    { id: "mean", label: "میانگین:", placeholder: "0" },
    { id: "stdDev", label: "انحراف معیار:", placeholder: "1" },
  ],
};

function DistributionsPage() {
  const [distribution, setDistribution] = useState("");
  const [params, setParams] = useState({});
  const [chartData, setChartData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ mean: null, variance: null, pmf: null });
  const [size, setSize] = useState(1000);
  const handleGenerate = () => {
    const inputs = distributionParams[distribution].map((param) => {
      const value = parseFloat(params[param.id]);
      return isNaN(value) ? null : value;
    });

    if (inputs.includes(null)) {
      alert("لطفاً تمام ورودی‌ها را پر کنید.");
      return;
    }

    let result;
    switch (distribution) {
      case "برنولی":
        result = Distributions.bernoulli(inputs[0], size);
        break;
      case "دو جمله ای":
        result = Distributions.binomial(inputs[0], inputs[1], size);
        break;
      case "دو جمله ای منفی":
        result=Distributions.negativeBinomial(inputs[0], inputs[1], size)
        break;
      case "فوق هندسی":
        result=Distributions.hypergeometric(inputs[0], inputs[1], inputs[2],size);
        break;
      case "پواسون":
        result=Distributions.poisson(inputs[0],size);
      break;
      case "هندسی":
        result=Distributions.geometric(inputs[0],size);
      break;
      case "نمایی":
        result=Distributions.exponential(inputs[0],size);
      break;
      case "نرمال":
        result=Distributions.normal(inputs[0],inputs[1],size);
      break;
      default:
        return;
    }

    const frequencies = result.data.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(frequencies);
    const values = Object.values(frequencies);

    setChartData({ labels, values });
    console.log(result)
    setStats({
      mean: result.mean,
      variance: result.variance,
      pmf: result.pmf(1), // به طور پیش‌فرض PMF برای k=1 را نشان می‌دهیم
    });
  };

  const handleReset = () => {
    setDistribution("");
    setParams({});
    setChartData(null);
    setStats({ mean: null, variance: null, pmf: null });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", direction: "rtl" }}>
      <h1>انتخاب توزیع و توضیحات آن</h1>

       

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />

      <label>
        انتخاب توزیع:
        <select
          value={distribution}
          onChange={(e) => {
            setDistribution(e.target.value);
            setParams({});
          }}
        >
          <option value="">--انتخاب کنید--</option>
          {Object.keys(distributionParams).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </label>
     

<label>
  تعداد نمونه‌ها:
  <input
    type="number"
    value={size}
    onChange={(e) => setSize(e.target.value)}
    min="100"
    max="10000"
    step="100"
  />
</label>

      {distribution && (
        <div style={{ marginTop: "20px" }}>
          {distributionParams[distribution].map((param) => (
            <div key={param.id}>
              <label>
                {param.label}
                <input
                  type="number"
                  value={params[param.id] || ""}
                  onChange={(e) =>
                    setParams({ ...params, [param.id]: e.target.value })
                  }
                  placeholder={param.placeholder}
                />
              </label>
            </div>
          ))}
        </div>
      )}

      <button onClick={handleGenerate} style={{ marginTop: "20px" }}>
        ایجاد نمودار
      </button>
      <button onClick={handleReset} style={{ marginTop: "20px", marginLeft: "10px" }}>
        بازنشانی
      </button>

      {chartData && (
        <div style={{ marginTop: "20px" }}>
          <DistributionChart data={chartData} />
          <div>
            <p>امید ریاضی: {stats.mean}</p>
            <p>واریانس: {stats.variance}</p>
            <p>تابع احتمال (PMF برای k=1): {stats.pmf}</p>
          </div>
        </div>
      )}

      <Link to="/">
        <button style={{ marginTop: "20px", marginLeft: "10px" }}>
          برگشت به صفحه اصلی
        </button>
      </Link>
    </div>
  );

}

export default DistributionsPage;
