import { Loader2, Music, User, MessageSquare, Check, X } from 'lucide-react';

export interface SongRequest {
  id: string;
  listener_name: string;
  song_title: string;
  artist: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

interface InboxProps {
  requests: SongRequest[];
  loading: boolean;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function Inbox({ requests, loading, onAccept, onReject }: InboxProps) {
  const activeRequests = requests.filter((req) => req.status === 'pending');

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Bandeja de Entrada</h2>
            <p className="text-gray-400">Recepción de mensajes en tiempo real</p>
          </div>
          <div className="bg-blue-600 px-4 py-2 rounded-lg">
            <span className="text-white font-semibold text-sm">
              {activeRequests.length} MENSAJES ACTIVOS
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400 uppercase tracking-wider text-sm">Esperando señal...</p>
          </div>
        ) : activeRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-24 h-24 border-4 border-blue-900 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-10 h-10 text-blue-700" />
            </div>
            <p className="text-gray-400 uppercase tracking-wider text-sm">No hay mensajes activos</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {activeRequests.map((request) => (
              <div
                key={request.id}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:border-blue-600 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{request.listener_name}</h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(request.created_at).toLocaleString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {onAccept && (
                      <button
                        onClick={() => onAccept(request.id)}
                        className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition-colors"
                        title="Aceptar"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </button>
                    )}
                    {onReject && (
                      <button
                        onClick={() => onReject(request.id)}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors"
                        title="Rechazar"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <Music className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">{request.song_title}</p>
                    <p className="text-gray-400 text-sm">{request.artist}</p>
                  </div>
                </div>

                {request.message && (
                  <div className="bg-slate-900/50 rounded p-3 mt-3">
                    <p className="text-gray-300 text-sm">{request.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}