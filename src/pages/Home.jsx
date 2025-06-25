import { useEffect, useRef } from "react";
import { FiHome, FiPlusCircle, FiSearch, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Home() {
  const mapRef = useRef(null);

  useEffect(() => {
    // TODO: initialize your map SDK (e.g. Mapbox/Leaflet) on mapRef.current
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Map */}
      <div ref={mapRef} className="flex-1 relative">
        {/* Placeholder circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-blue-600 bg-opacity-70 rounded-full border-2 border-white animate-pulse" />
        </div>
      </div>

      {/* Incident List */}
      <div className="bg-gray-800 space-y-3 p-4 overflow-y-auto">
        {/* Replace these with real data */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-700 rounded-xl p-4">
            <h2 className="font-semibold text-lg">Incidente #{item}</h2>
            <p className="text-gray-400">Descripción breve del incidente.</p>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-black border-t border-gray-700 flex justify-around py-2">
        <NavLink
          to="/home"
          className="flex flex-col items-center text-gray-400 hover:text-white"
          activeClassName="text-white"
        >
          <FiHome size={24} />
          <span className="text-xs mt-1">Inicio</span>
        </NavLink>

        <NavLink
          to="/report"
          className="flex flex-col items-center text-gray-400 hover:text-white"
          activeClassName="text-white"
        >
          <FiPlusCircle size={24} />
          <span className="text-xs mt-1">Reportar</span>
        </NavLink>

        <NavLink
          to="/search"
          className="flex flex-col items-center text-gray-400 hover:text-white"
          activeClassName="text-white"
        >
          <FiSearch size={24} />
          <span className="text-xs mt-1">Buscar</span>
        </NavLink>

        <NavLink
          to="/profile"
          className="flex flex-col items-center text-gray-400 hover:text-white"
          activeClassName="text-white"
        >
          <FiUser size={24} />
          <span className="text-xs mt-1">Perfil</span>
        </NavLink>
      </nav>
    </div>
  );
}
