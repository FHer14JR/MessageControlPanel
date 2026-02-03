import React, { useEffect, useState } from 'react';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Music, 
  User, 
  MessageSquare 
} from 'lucide-react';
// IMPORTANTE: Estos imports funcionarán cuando instales firebase y crees tu archivo de config
import { db } from '../lib/firebase'; 
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Referencia a la colección 'song_requests'
    const q = query(
      collection(db, 'song_requests'), 
      orderBy('created_at', 'desc') // Los más nuevos arriba
    );

    // 2. Escuchador en tiempo real (Sincronización instantánea)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(data);
      setLoading(false);
    }, (error) => {
      console.error("Error al recibir mensajes:", error);
      setLoading(false);
    });

    return () => unsubscribe(); // Limpiar conexión al cerrar
  }, []);

  // Función para cambiar el estado (Aceptar, Poner en Aire, etc.)
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const docRef = doc(db, 'song_requests', id);
    await updateDoc(docRef, { status: newStatus });
  };

  // Función para borrar la petición
  const handleDelete = async (id: string) => {
    if (window.confirm('¿Eliminar esta petición?')) {
      await deleteDoc(doc(db, 'song_requests', id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-500">Panel de Control RC Radio</h1>
            <p className="text-slate-400">Peticiones en tiempo real</p>
          </div>
          <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            En línea
          </div>
        </header>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Conectando con la cabina...</div>
        ) : (
          <div className="grid gap-4">
            {requests.length === 0 ? (
              <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
                <Clock className="mx-auto mb-4 text-slate-600" size={48} />
                <p className="text-slate-500 text-xl">No hay peticiones pendientes</p>
              </div>
            ) : (
              requests.map((req) => (
                <div 
                  key={req.id} 
                  className={`bg-slate-800/50 border ${req.status === 'playing' ? 'border-blue-500' : 'border-slate-700'} rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:bg-slate-800`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs uppercase font-bold px-2 py-1 rounded ${
                        req.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 
                        req.status === 'playing' ? 'bg-blue-500/20 text-blue-500' : 
                        'bg-green-500/20 text-green-500'
                      }`}>
                        {req.status === 'pending' ? 'Pendiente' : req.status === 'playing' ? 'Al Aire' : 'Completado'}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {req.created_at ? new Date(req.created_at).toLocaleTimeString() : ''}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1">
                      <Music className="text-blue-400" size={18} />
                      <h3 className="text-xl font-semibold">{req.song_title}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-400">
                      <User size={16} />
                      <span>{req.artist}</span>
                      <span className="mx-2">|</span>
                      <span className="text-blue-300">Pedido por: {req.listener_name}</span>
                    </div>

                    {req.message && (
                      <div className="mt-3 flex gap-2 items-start bg-slate-900/50 p-3 rounded-lg text-slate-300 italic">
                        <MessageSquare size={16} className="mt-1 flex-shrink-0" />
                        <p>"{req.message}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 border-slate-700 pt-4 md:pt-0">
                    <button 
                      onClick={() => handleUpdateStatus(req.id, 'playing')}
                      className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      title="Poner al aire"
                    >
                      <Play size={18} />
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(req.id, 'done')}
                      className="flex-1 md:flex-none bg-green-600 hover:bg-green-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      title="Marcar como listo"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(req.id)}
                      className="flex-1 md:flex-none bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}