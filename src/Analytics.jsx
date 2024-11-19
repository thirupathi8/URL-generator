import { useState } from 'react';
import "./Analytics.css"

function Analytics() {
    const [analytics, setAnalytics] = useState(null);
    const [inputId, setInputId] = useState("");

    const fetchAnalytics = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/url/analytics/${inputId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch analytics");
            }
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="analytics-container">
            <h1 className="analytics-title">Analytics Dashboard</h1>
            <form onSubmit={fetchAnalytics} className="analytics-form">
                <input
                    type="text"
                    placeholder="Enter your Short ID"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                    className="analytics-input"
                />
                <button type="submit" className="analytics-button">Get Analytics</button>
            </form>

            {analytics ? (
                <div className="analytics-data">
                    <p className="analytics-clicks">Total Clicks: {analytics.totalClicks}</p>
                    <ul className="analytics-list">
                        {analytics.analytics.map((visit, index) => (
                            <li key={index} className="analytics-list-item">
                                {isNaN(new Date(Number(visit.timestamp)))
                                    ? "Invalid Date"
                                    : new Date(Number(visit.timestamp)).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="analytics-placeholder">Enter a Short ID to see analytics.</p>
            )}
        </div>
    );
}

export default Analytics;
