import { MessageSquare } from 'lucide-react';

interface SidebarProps {
  hostStatus: 'online' | 'offline';
  audioOutput: string;
  alertSound: string;
  onAudioOutputChange: (value: string) => void;
  onAlertSoundChange: (value: string) => void;
}

export default function Sidebar({
  hostStatus,
  audioOutput,
  alertSound,
  onAudioOutputChange,
  onAlertSoundChange,
}: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen">
      <div className="p-6">
        <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-3">
          <MessageSquare className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold">RC Radio</h1>
        <p className="text-xs text-gray-400 uppercase tracking-wider">Song Request</p>
      </div>

      <div className="px-6 py-4 border-t border-gray-800">
        <div className="mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Host</span>
        </div>
        <div className="flex items-center">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-2 ${
              hostStatus === 'online' ? 'bg-green-500' : 'bg-gray-500'
            }`}
          ></span>
          <span
            className={`text-sm uppercase ${
              hostStatus === 'online' ? 'text-green-500' : 'text-gray-500'
            }`}
          >
            {hostStatus}
          </span>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-800">
        <label className="block mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider flex items-center">
            <span className="mr-1">🔊</span> Salida de Audio
          </span>
          <select
            value={audioOutput}
            onChange={(e) => onAudioOutputChange(e.target.value)}
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="default">Default</option>
            <option value="speakers">Speakers</option>
            <option value="headphones">Headphones</option>
          </select>
        </label>
      </div>

      <div className="px-6 py-4 border-t border-gray-800">
        <label className="block mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider flex items-center">
            <span className="mr-1">🔔</span> Sonido Alerta
          </span>
          <select
            value={alertSound}
            onChange={(e) => onAlertSoundChange(e.target.value)}
            className="w-full mt-2 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="pop-suave">Pop Suave</option>
            <option value="chime">Chime</option>
            <option value="bell">Bell</option>
          </select>
        </label>
      </div>

      <div className="mt-auto px-6 py-4 border-t border-gray-800">
        <span className="text-xs text-gray-600">🎛️ Control Pro v3.1</span>
      </div>
    </div>
  );
}