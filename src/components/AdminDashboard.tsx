import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Sidebar from './Sidebar';
import Inbox from './Inbox';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para el Sidebar
  const [hostStatus, setHostStatus] = useState<'online' | 'offline'>('online');
  const [audioOutput, setAudioOutput] = useState('speakers');
  const [alertSound, setAlertSound] = useState('pop-suave');

  useEffect(() => {
    const q = query(collection(db, 'song_requests'), orderBy('created_at', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(data);
      setLoading(false);
      
      // Lógica opcional: Si hay un mensaje nuevo y el estado es online, podrías disparar el sonido de alerta aquí
    }, (error) => {
      console.error("Error Firebase:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAccept = async (id: string) => {
    await updateDoc(doc(db, 'song_requests', id), { status: 'accepted' });
  };

  const handleReject = async (id: string) => {
    if (window.confirm('¿Eliminar esta petición?')) {
      await deleteDoc(doc(db, 'song_requests', id));
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar 
        hostStatus={hostStatus}
        audioOutput={audioOutput}
        alertSound={alertSound}
        onAudioOutputChange={setAudioOutput}
        onAlertSoundChange={setAlertSound}
      />
      
      <Inbox 
        requests={requests} 
        loading={loading} 
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}