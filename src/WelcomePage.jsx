import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>به توزیع‌ها خوش آمدید!</h1>
      <p>در این برنامه می‌توانید انواع توزیع‌های احتمالی را شبیه‌سازی کنید و نمودارهای آن را مشاهده کنید.</p>
      <Link to="/distributions">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>شروع کنید</button>
      </Link>
    </div>
  );
}

export default WelcomePage;
