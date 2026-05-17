import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GridContext } from '../context/GridContext';
import { RiFlashlightFill, RiAlertFill, RiBrainLine } from 'react-icons/ri';
import { renderToString } from 'react-dom/server';

// Helper to create glowing icons
const createIcon = (type, severityOrStatus) => {
  let colorClass = '';
  let shadowClass = '';
  let iconHtml = '';

  if (type === 'transformer') {
    iconHtml = '⚡';
    if (severityOrStatus === 'Normal') {
      colorClass = 'text-brand-cyan border-brand-cyan';
      shadowClass = 'shadow-[0_0_15px_rgba(0,240,255,0.8)] bg-brand-cyan/20';
    } else if (severityOrStatus === 'Warning') {
      colorClass = 'text-brand-yellow border-brand-yellow';
      shadowClass = 'shadow-[0_0_15px_rgba(255,215,0,0.8)] bg-brand-yellow/20';
    } else {
      colorClass = 'text-brand-red border-brand-red';
      shadowClass = 'shadow-[0_0_15px_rgba(255,51,102,0.8)] bg-brand-red/20';
    }
  } else {
    iconHtml = '⚠️';
    if (severityOrStatus === 'critical') {
      colorClass = 'text-brand-red border-brand-red';
      shadowClass = 'shadow-[0_0_15px_rgba(255,51,102,0.8)] bg-brand-red/20';
    } else if (severityOrStatus === 'high' || severityOrStatus === 'warning') {
      colorClass = 'text-brand-yellow border-brand-yellow';
      shadowClass = 'shadow-[0_0_15px_rgba(255,215,0,0.8)] bg-brand-yellow/20';
    } else {
      colorClass = 'text-brand-blue border-brand-blue';
      shadowClass = 'shadow-[0_0_15px_rgba(58,134,255,0.8)] bg-brand-blue/20';
    }
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="flex items-center justify-center w-8 h-8 rounded-full border-2 ${colorClass} ${shadowClass} backdrop-blur-sm animate-pulse">
             <span class="text-xs">${iconHtml}</span>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export default function DashboardMap() {
  const { transformers, complaints } = useContext(GridContext);
  const center = [27.884710010513253, 79.90748033797763];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-0">
      <MapContainer 
        center={center} 
        zoom={17} 
        className="w-full h-full bg-[#0A0A0B]"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Highlight Area */}
        <Circle 
          center={center} 
          radius={300} 
          pathOptions={{ color: '#00F0FF', fillColor: '#00F0FF', fillOpacity: 0.05, weight: 1, dashArray: '5, 10' }} 
        />

        {transformers.map(t => (
          <Marker key={`t-${t.id}`} position={[t.lat, t.lng]} icon={createIcon('transformer', t.status)}>
            <Popup className="dark-popup !p-0 !m-0 !bg-transparent border-none">
              <div className="bg-[#12141D] p-4 rounded-xl border border-brand-cyan/30 text-white min-w-[200px] shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-brand-cyan tracking-wide flex items-center gap-2">
                    <RiFlashlightFill /> {t.name}
                  </h3>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    t.status === 'Normal' ? 'bg-green-500/20 text-green-400' : 
                    t.status === 'Warning' ? 'bg-brand-yellow/20 text-brand-yellow' : 'bg-brand-red/20 text-brand-red'
                  }`}>{t.status}</span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Load</span>
                    <span className="font-mono font-bold">{t.load}%</span>
                  </div>
                  {/* Load Bar */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${t.load > 90 ? 'bg-brand-red' : t.load > 75 ? 'bg-brand-yellow' : 'bg-brand-cyan'}`} 
                      style={{ width: `${t.load}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Nearby Complaints</span>
                    <span className="font-bold text-brand-yellow">{t.complaints}</span>
                  </div>
                </div>

                <div className="bg-brand-cyan/10 p-2 rounded border border-brand-cyan/20">
                  <div className="flex items-center gap-1 text-brand-cyan text-xs font-bold mb-1"><RiBrainLine/> AI Recommendation</div>
                  <p className="text-xs text-gray-300">{t.load > 90 ? 'Immediate load shedding advised.' : t.load > 75 ? 'Monitor load closely during peak hours.' : 'Operating within optimal parameters.'}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {complaints.map(c => (
          <Marker key={`c-${c.id}`} position={[c.lat, c.lng]} icon={createIcon('complaint', c.severity)}>
            <Popup className="dark-popup !p-0 !m-0 !bg-transparent border-none">
              <div className="bg-[#12141D] p-4 rounded-xl border border-brand-red/30 text-white min-w-[200px] shadow-[0_0_20px_rgba(255,51,102,0.2)]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-brand-yellow flex items-center gap-2">
                    <RiAlertFill /> {c.type}
                  </h3>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    c.severity === 'critical' ? 'bg-brand-red/20 text-brand-red' : 
                    c.severity === 'high' ? 'bg-orange-500/20 text-orange-400' : 'bg-brand-yellow/20 text-brand-yellow'
                  }`}>{c.severity}</span>
                </div>
                <p className="text-sm text-gray-300 italic">"{c.message}"</p>
                <div className="mt-2 text-[10px] text-gray-500 font-mono">ID: CMP-${c.id.toString().slice(-4)}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-cyan/50 rounded-tl-2xl z-[400] pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-cyan/50 rounded-tr-2xl z-[400] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-brand-cyan/50 rounded-bl-2xl z-[400] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-cyan/50 rounded-br-2xl z-[400] pointer-events-none" />
    </div>
  );
}
