import { useState } from 'react';
import { Music, User, MessageSquare, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PublicRequestForm() {
  const [listenerName, setListenerName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('song_requests').insert([
        {
          listener_name: listenerName,
          song_title: songTitle,
          artist: artist,
          message: message,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setListenerName('');
      setSongTitle('');
      setArtist('');
      setMessage('');

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error al enviar la solicitud. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Music className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">RC Radio</h1>
          <p className="text-gray-400">Solicita tu canción favorita</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8"
        >
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Tu Nombre
            </label>
            <input
              type="text"
              value={listenerName}
              onChange={(e) => setListenerName(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 flex items-center">
              <Music className="w-4 h-4 mr-2" />
              Título de la Canción
            </label>
            <input
              type="text"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Ej: Bohemian Rhapsody"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Artista</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Ej: Queen"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Mensaje (Opcional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Deja un mensaje para el DJ..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            {submitting ? (
              <>Enviando...</>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Enviar Solicitud
              </>
            )}
          </button>

          {success && (
            <div className="mt-4 bg-green-600/20 border border-green-600 rounded-lg p-4 text-green-400 text-center">
              Solicitud enviada correctamente
            </div>
          )}
        </form>
      </div>
    </div>
  );
}