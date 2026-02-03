import { Loader2, Music, User, MessageSquare, Check, X } from 'lucide-react';

interface InboxProps {
  requests: any[];
  loading: boolean;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export default function Inbox({ requests, loading, onAccept, onReject }: InboxProps) {
  // Filtramos solo los pendientes para la bandeja principal
  const activeRequests = requests.filter((req) => req.status === 'pending');

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Bandeja de Entrada</h2>
            <p className="text-gray-400">Peticiones de oyentes en vivo</p>
          </div>
          <div className="bg-blue-600/20 border border-blue-500/50 px-4 py-2 rounded-full">
            <span className="text-blue-400 font-bold text-sm tracking-widest">
              {activeRequests.length} ACTIVOS
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500">Sincronizando con satélite...</p>
          </div>
        ) : activeRequests.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
            <MessageSquare className="mx-auto mb-4 text-slate-700" size={48} />
            <p className="text-slate-500">Esperando nuevos mensajes de la audiencia</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {activeRequests.map((request) => (
              <div key={request.id} className="bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20">
                      <User className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{request.listener_name}</h3>
                      <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <Music size={14} />
                        <span className="text-sm font-medium">{request.song_title} — {request.artist}</span>
                      </div>
                      {request.message && (
                        <p className="text-slate-400 text-sm bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                          {request.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => onAccept(request.id)} className="p-3 bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white rounded-xl transition-all">
                      <Check size={20} />
                    </button>
                    <button onClick={() => onReject(request.id)} className="p-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}