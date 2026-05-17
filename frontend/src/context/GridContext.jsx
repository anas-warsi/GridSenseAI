import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const GridContext = createContext();

export const GridProvider = ({ children }) => {
  const [transformers, setTransformers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [insights, setInsights] = useState([]);
  const [riskLevel, setRiskLevel] = useState('LOW');
  const [stats, setStats] = useState(null);
  const [aiSummary, setAiSummary] = useState('Initializing grid intelligence...');

  const fetchGridData = useCallback(async () => {
    try {
      // 1. Fetch Transformers
      const transData = await api.transformersAPI.getAll();
      setTransformers(transData.map(t => ({
        id: t.id,
        name: t.name,
        lat: t.latitude,
        lng: t.longitude,
        status: t.status.charAt(0).toUpperCase() + t.status.slice(1),
        load: Math.round(t.current_load),
        complaints: t.complaint_count
      })));

      // 2. Fetch Complaints
      const compData = await api.complaintsAPI.getAll();
      setComplaints(compData.map(c => ({
        id: c.id,
        type: c.type,
        severity: c.severity,
        lat: c.latitude,
        lng: c.longitude,
        message: c.details,
        status: c.status
      })));

      // 3. Fetch Alerts & Insights
      const alertData = await api.alertsAPI.getAll(15);
      setAlerts(alertData.map(a => ({
        id: a.id,
        text: a.message,
        time: a.created_at,
        type: a.type
      })));
      
      // Use the same data for insights but formatted differently
      setInsights(alertData.map(a => ({
        id: a.id,
        text: a.message,
        type: a.type === 'critical' ? 'CRITICAL' : 'PREDICTION',
        confidence: (a.confidence * 100).toFixed(1) + '%'
      })));

      // 4. Fetch System Status / Risk
      const statusData = await api.statusAPI.get();
      setRiskLevel(statusData.risk_level);
      setStats(statusData);

      // 5. Fetch AI Grid Summary
      const summaryData = await api.aiAPI.getSummary();
      setAiSummary(summaryData.summary);

    } catch (error) {
      console.error("Failed to fetch grid data from backend:", error);
    }
  }, []);

  // Initial fetch and polling
  useEffect(() => {
    fetchGridData();
    const interval = setInterval(fetchGridData, 8000); // Poll every 8 seconds
    return () => clearInterval(interval);
  }, [fetchGridData]);

  const addComplaint = async (complaint) => {
    try {
      await api.complaintsAPI.create({
        type: complaint.type,
        severity: complaint.severity,
        latitude: complaint.lat || 27.8847,
        longitude: complaint.lng || 79.9074,
        details: complaint.message
      });
      fetchGridData(); // Refresh immediately
    } catch (error) {
      console.error("Failed to submit complaint:", error);
    }
  };

  return (
    <GridContext.Provider value={{
      transformers,
      complaints,
      alerts,
      insights, // Future: fetch from /api/ai/analyze if needed
      riskLevel,
      stats,
      aiSummary,
      addComplaint,
      refreshData: fetchGridData
    }}>
      {children}
    </GridContext.Provider>
  );
};
