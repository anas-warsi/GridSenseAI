import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { GridContext } from '../../context/GridContext';
import 'leaflet/dist/leaflet.css';

// Reusing some of the marker designs for consistency, but making them larger for the public map
const createMarkerIcon = (type, severity, load = 0) => {
  let color = '#00F0FF';
  let shadowColor = 'rgba(0, 240, 255, 0.6)';
  let glow = 'animate-pulse';

  if (type === 'complaint') {
    if (severity === 'critical') { color = '#FF3366'; shadowColor = 'rgba(255, 51, 102, 0.8)'; glow = 'animate-ping'; }
    else if (severity === 'high') { color = '#F97316'; shadowColor = 'rgba(249, 115, 22, 0.8)'; }
    else { color = '#FFD700'; shadowColor = 'rgba(255, 215, 0, 0.8)'; glow = ''; }
  } else if (type === 'transformer') {
    if (load > 90) { color = '#FF3366'; shadowColor = 'rgba(255, 51, 102, 0.8)'; glow = 'animate-pulse'; }
    else if (load > 75) { color = '#FFD700'; shadowColor = 'rgba(255, 215, 0, 0.8)'; glow = ''; }
  }

  const html = `
    <div style="
      width: 24px; 
      height: 24px; 
      background: ${color}; 
      border-radius: 50%; 
      border: 3px solid #1A1D24;
      box-shadow: 0 0 15px ${shadowColor}, 0 0 30px ${shadowColor};
      position: relative;
    " class="${glow}">
      ${type === 'transformer' ? `
        <div style="position:absolute; bottom:-20px; left:50%; transform:translateX(-50%); font-size:10px; color:white; font-weight:bold; font-family:monospace; text-shadow:0 0 5px black;">
          ${load}%
        </div>
      ` : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

export default function PublicMap() {
  const { transformers, complaints, riskLevel } = useContext(GridContext);
  
  const mapCenter = [27.8847, 79.9074];

  return (
    <section id="live-grid" className="py-24 relative z-10 bg-[#0A0B10] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
        >
          Live Smart Grid <span className="text-brand-cyan">Monitoring</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Explore real-time infrastructure intelligence. Our AI continuously analyzes the grid for potential failures and optimizes energy flow.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[550px] md:h-[650px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Map Overlay Effects */}
          <div className="absolute inset-0 pointer-events-none z-[400] shadow-[inset_0_0_100px_rgba(10,10,11,1)]" />
          
          <MapContainer 
            center={mapCenter} 
            zoom={15} 
            className="w-full h-full z-0"
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={true}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            />

            {/* Render Transformers */}
            {transformers.map((t) => (
              <Marker 
                key={t.id} 
                position={[t.lat, t.lng]}
                icon={createMarkerIcon('transformer', null, t.load)}
              >
                <Popup className="custom-popup public-popup">
                  <div className="p-1">
                    <h4 className="font-bold text-lg text-white mb-1">{t.name}</h4>
                    <p className="text-gray-400 text-sm mb-3">Substation Asset</p>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                      <div 
                        className={`h-full ${t.load > 90 ? 'bg-brand-red' : t.load > 75 ? 'bg-brand-yellow' : 'bg-brand-cyan'}`}
                        style={{ width: `${t.load}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-bold font-mono">
                      <span className="text-gray-400">LOAD</span>
                      <span className="text-white">{t.load}%</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Render Complaints */}
            {complaints.map((c) => (
              <React.Fragment key={c.id}>
                {c.severity === 'critical' && (
                  <Circle 
                    center={[c.lat, c.lng]} 
                    pathOptions={{ color: '#FF3366', fillColor: '#FF3366', fillOpacity: 0.1, dashArray: '5, 5' }} 
                    radius={150} 
                  />
                )}
                <Marker 
                  position={[c.lat, c.lng]}
                  icon={createMarkerIcon('complaint', c.severity)}
                >
                  <Popup className="custom-popup public-popup">
                    <div className="p-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${
                          c.severity === 'critical' ? 'bg-brand-red animate-ping' : c.severity === 'high' ? 'bg-orange-500' : 'bg-brand-yellow'
                        }`} />
                        <h4 className="font-bold text-white text-base">{c.type}</h4>
                      </div>
                      <p className="text-sm text-gray-300 italic">"{c.message}"</p>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>

          {/* Floating Public Dashboard Cards */}
          <div className="absolute top-6 left-6 z-[400] glassmorphism rounded-xl border border-white/10 p-4 space-y-3 pointer-events-none w-64">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Live Analysis</h3>
            
            <div className="bg-white/5 rounded-lg p-3 border border-white/5">
              <div className="text-xs text-gray-400 mb-1">Grid Risk Level</div>
              <div className={`text-xl font-bold tracking-wider ${
                riskLevel === 'CRITICAL' ? 'text-brand-red' : 
                riskLevel === 'HIGH' ? 'text-orange-500' : 
                riskLevel === 'MEDIUM' ? 'text-brand-yellow' : 'text-brand-cyan'
              }`}>
                {riskLevel}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 border border-white/5">
              <div className="text-xs text-gray-400 mb-1">Active Anomalies</div>
              <div className="text-2xl font-bold text-white tracking-wider">
                {complaints.length}
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
