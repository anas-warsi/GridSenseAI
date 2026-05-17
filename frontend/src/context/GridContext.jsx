import React, { createContext, useState, useEffect } from 'react';

export const GridContext = createContext();

const initialTransformers = [
  { id: 1, name: "Transformer T-1", lat: 27.885290420311826, lng: 79.90619266968956, status: "High Load", load: 92, complaints: 6 },
  { id: 2, name: "Transformer T-2", lat: 27.8848, lng: 79.9079, status: "Normal", load: 54, complaints: 1 },
  { id: 3, name: "Transformer T-3", lat: 27.8842, lng: 79.9084, status: "Warning", load: 78, complaints: 3 }
];

const initialComplaints = [
  { id: 1, type: "Low Voltage", severity: "high", lat: 27.8849, lng: 79.9077, message: "Voltage dropping after 8PM" },
  { id: 2, type: "Power Outage", severity: "critical", lat: 27.8851, lng: 79.9069, message: "No electricity since afternoon" },
  { id: 3, type: "Transformer Sparking", severity: "warning", lat: 27.8844, lng: 79.9082, message: "Sparking observed during rain" }
];

const initialAlerts = [
  { id: 1, text: "[AI] Voltage instability detected near T-3", time: new Date(Date.now() - 1000 * 60).toISOString(), type: 'warning' },
  { id: 2, text: "[AI] Transformer T-1 overload risk increasing", time: new Date(Date.now() - 1000 * 120).toISOString(), type: 'critical' },
  { id: 3, text: "[AI] Monitoring active. Grid stable.", time: new Date(Date.now() - 1000 * 300).toISOString(), type: 'info' }
];

const initialInsights = [
  { id: 1, text: "Repeated evening overload detected near Sector 8.", type: "prediction", confidence: "92%" },
  { id: 2, text: "Transformer T-1 approaching critical load.", type: "warning", confidence: "88%" },
  { id: 3, text: "Complaint spikes indicate possible feeder instability.", type: "analysis", confidence: "95%" },
  { id: 4, text: "Low-voltage reports increased by 24%.", type: "analysis", confidence: "85%" }
];

const liveMessages = [
  "[AI] Load shifting detected from Sector 4",
  "[AI] Grid frequency dropping marginally",
  "[AI] Power factor correction active",
  "[AI] Minor sparking reported on HT line",
  "[AI] Substation 2 operating at peak capacity"
];

export const GridProvider = ({ children }) => {
  const [transformers, setTransformers] = useState(initialTransformers);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [insights, setInsights] = useState(initialInsights);
  const [riskLevel, setRiskLevel] = useState('MEDIUM'); // LOW, MEDIUM, HIGH, CRITICAL

  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Slightly change transformer loads
      setTransformers(prev => prev.map(t => {
        let newLoad = t.load + (Math.random() * 4 - 2); // -2 to +2
        newLoad = Math.max(10, Math.min(100, newLoad));
        let newStatus = newLoad > 90 ? 'High Load' : (newLoad > 75 ? 'Warning' : 'Normal');
        return { ...t, load: Math.round(newLoad), status: newStatus };
      }));

      // 2. Randomly add a new AI alert
      if (Math.random() > 0.7) {
        const randomMsg = liveMessages[Math.floor(Math.random() * liveMessages.length)];
        const newAlert = {
          id: Date.now(),
          text: randomMsg,
          time: new Date().toISOString(),
          type: Math.random() > 0.8 ? 'critical' : (Math.random() > 0.5 ? 'warning' : 'info')
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 15)); // Keep last 15
      }

      // 3. Update Risk Level based on transformers
      setTransformers(currentTransformers => {
        const criticalCount = currentTransformers.filter(t => t.load > 90).length;
        if (criticalCount >= 2) setRiskLevel('CRITICAL');
        else if (criticalCount === 1) setRiskLevel('HIGH');
        else setRiskLevel('MEDIUM');
        return currentTransformers;
      });

    }, 5000); // Run every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const addComplaint = (complaint) => {
    const newComp = {
      id: Date.now(),
      ...complaint,
      // Rough coords near center if not perfectly specified
      lat: complaint.lat || 27.8847 + (Math.random() * 0.002 - 0.001),
      lng: complaint.lng || 79.9074 + (Math.random() * 0.002 - 0.001)
    };
    setComplaints(prev => [...prev, newComp]);
    
    // Auto-generate alert
    setAlerts(prev => [{
      id: Date.now() + 1,
      text: `[AI] New complaint logged: ${complaint.type}`,
      time: new Date().toISOString(),
      type: complaint.severity
    }, ...prev].slice(0, 15));
  };

  return (
    <GridContext.Provider value={{
      transformers,
      complaints,
      alerts,
      insights,
      riskLevel,
      addComplaint
    }}>
      {children}
    </GridContext.Provider>
  );
};
