import { useState, useRef } from 'react';
import { uploadFile } from './services/gofile';
import { UploadCloud, File as FileIcon, CheckCircle, Copy, ExternalLink, RefreshCw, AlertCircle, AlertTriangle } from 'lucide-react';
import Toast from './components/Toast';

// Archivos potencialmente peligrosos que requieren advertencia
const DANGEROUS_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.sh', '.ps1', '.vbs', '.js', '.jar',
  '.msi', '.dll', '.scr', '.pif', '.com', '.gadget'
];

const MAX_FILE_SIZE_GB = 10; // Advertencia para archivos muy grandes

function App() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const fileInputRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const isDangerousFile = (filename) => {
    const ext = '.' + filename.split('.').pop().toLowerCase();
    return DANGEROUS_EXTENSIONS.includes(ext);
  };

  const isLargeFile = (bytes) => {
    return bytes > MAX_FILE_SIZE_GB * 1024 * 1024 * 1024;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError('');
      setShowWarning(isDangerousFile(e.dataTransfer.files[0].name));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError('');
      setShowWarning(isDangerousFile(e.target.files[0].name));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const res = await uploadFile(file, (pct) => {
        setProgress(pct);
      });
      setResult(res);
      showToast('¡Archivo subido exitosamente!', 'success');
    } catch (err) {
      setError('Error al subir el archivo. Por favor inténtalo de nuevo.');
      showToast('Error al subir el archivo', 'error');
      // Solo log en desarrollo
      if (import.meta.env.DEV) {
        console.error(err);
      }
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.downloadPage) {
      navigator.clipboard.writeText(result.downloadPage);
      showToast('Link copiado al portapapeles', 'copy');
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setProgress(0);
    setError('');
    setShowWarning(false);
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full point-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full point-events-none" />
      
      <div className="max-w-xl w-full bg-slate-800/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden p-8 flex flex-col relative z-10 transition-all duration-500 hover:shadow-indigo-500/10 hover:border-slate-600/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-4 text-indigo-400 ring-1 ring-indigo-500/20 shadow-inner">
            <UploadCloud size={36} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100 mb-2">ShareDrop</h1>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">Sube cualquier archivo sin límite de tamaño de forma instantánea y compártelo usando la red de GoFile.</p>
        </div>

        {/* Main Content Area */}
        {!result ? (
          <div className="flex flex-col gap-6">
            
            {/* Upload Zone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`
                relative group cursor-pointer flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl transition-all duration-300 ease-out flex-1
                ${isDragging ? 'border-indigo-400 bg-indigo-500/10' : 'border-slate-600 bg-slate-800/30 hover:border-indigo-500/50 hover:bg-slate-800/60'}
                ${uploading ? 'pointer-events-none opacity-50' : ''}
              `}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
              />
              
              {file ? (
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)] ${showWarning ? 'bg-amber-500/20 text-amber-400' : 'bg-indigo-500/20 text-indigo-300'}`}>
                    {showWarning ? <AlertTriangle size={32} /> : <FileIcon size={32} />}
                  </div>
                  <p className="font-medium text-slate-200 truncate max-w-[250px]">{file.name}</p>
                  <p className="text-sm text-slate-400 mt-1 font-mono">{formatSize(file.size)}</p>
                  {showWarning && (
                    <p className="text-xs text-amber-400 mt-2 flex items-center gap-1.5">
                      <AlertTriangle size={12} />
                      Archivo ejecutable detectado
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                   <div className="p-4 bg-slate-700/50 text-slate-400 rounded-full mb-4 group-hover:scale-110 group-hover:bg-slate-700 group-hover:text-indigo-400 transition-all duration-300 shadow-sm">
                    <UploadCloud size={32} />
                  </div>
                  <p className="font-medium text-slate-300">Selecciona o arrastra un archivo</p>
                  <p className="text-xs text-slate-500 mt-2">Soporta formatos universales sin límite</p>
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {showWarning && !uploading && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex items-center gap-3">
                <AlertTriangle size={18} className="shrink-0" />
                <span>Este archivo puede ser ejecutable. Asegúrate de que es seguro antes de compartirlo.</span>
              </div>
            )}

            {/* Action Button & Progress */}
            <div className="h-[60px] flex flex-col justify-end">
              {file && (
                <div className="w-full flex flex-col justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {uploading ? (
                    <div className="space-y-3 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300 font-medium flex items-center gap-2">
                           <RefreshCw size={14} className="animate-spin text-indigo-400"/> Subiendo...
                        </span>
                        <span className="text-indigo-400 font-bold font-mono">{progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleUpload}
                      className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl font-medium tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2"
                    >
                      Comenzar Subida Segura
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Success Card */
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-500/5 relative group">
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-50"></div>
              <CheckCircle size={40} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            </div>
            
            <h2 className="text-2xl font-semibold text-slate-100 mb-2">¡Subida Completada!</h2>
            <p className="text-slate-400 text-center mb-8 max-w-xs mx-auto">Tu archivo "<span className="text-slate-300 truncate inline-block max-w-[150px] align-bottom">{result.fileName}</span>" ya está disponible en la nube.</p>
            
            <div className="w-full bg-slate-900/80 border border-slate-700/80 rounded-2xl p-2 pl-4 flex items-center justify-between gap-3 mb-8 shadow-inner">
              <div className="truncate text-indigo-300 text-sm font-medium font-mono flex-1 select-all">
                {result.downloadPage}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-600/50 hover:text-white"
                  title="Copiar link"
                >
                  <Copy size={18} />
                </button>
                <a 
                  href={result.downloadPage}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 px-4 hover:shadow-indigo-500/40"
                  title="Abrir link"
                >
                  <span className="text-sm font-medium">Abrir</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <button 
              onClick={reset}
              className="w-full py-4 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white rounded-xl font-medium tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <RefreshCw size={18} className="group-hover:-rotate-180 transition-transform duration-500 ease-out" />
              Subir nuevo archivo
            </button>
          </div>
        )}

      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  )
}

export default App
