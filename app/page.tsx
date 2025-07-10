'use client'; // Añade esta línea al principio del archivo

import React, { useState } from 'react'; // Mantener esta importación

// Definición de la interfaz para una evidencia
interface Evidence {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  isPrimary: boolean;
}

// Definición de la interfaz para una vulnerabilidad
interface Vulnerability {
  id: string;
  nombre: string;
  tipo: string;
  nivelRiesgo: string;
  fechaDeteccion: string;
  descripcionTecnica: string-1;
  posiblesSoluciones: string;
  iconos: { gravedad: string; categoria: string; };
  recomendacionesMitigacion: string;
  evidences: Evidence[]; // Nuevo campo para evidencias
}

// Datos de ejemplo para las vulnerabilidades
const initialVulnerabilitiesData: Vulnerability[] = [
  {
    id: '1', nombre: 'Inyección SQL', tipo: 'Inyección', nivelRiesgo: 'Crítico', fechaDeteccion: '02/04/2024',
    descripcionTecnica: 'Una vulnerabilidad que permite a atacantes ejecutar comandos SQL arbitrarios en la base de datos.',
    posiblesSoluciones: 'Usar sentencias preparadas (prepared statements) o ORMs para parametrizar las consultas.',
    iconos: { gravedad: '🚨', categoria: '🌐' },
    recomendacionesMitigacion: 'Nunca concatenar directamente la entrada del usuario en consultas SQL. Implementar validación de entrada estricta.',
    evidences: [],
  },
  {
    id: '2', nombre: 'Configuración incorrecta', tipo: 'Configuración', nivelRiesgo: 'Alto', fechaDeteccion: '28/03/2024',
    descripcionTecnica: 'Errores comunes en la configuración de seguridad, como permisos excesivos, servicios innecesarios habilitados, o credenciales por defecto.',
    posiblesSoluciones: 'Revisar y endurecer la configuración de todos los componentes. Seguir guías de hardening de seguridad.',
    iconos: { gravedad: '⚠️', categoria: '⚙️' },
    recomendacionesMitigacion: 'Desactivar servicios no utilizados. Cambiar todas las contraseñas por defecto. Implementar el principio de menor privilegio.',
    evidences: [],
  },
  {
    id: '3', nombre: 'XSS', tipo: 'Inyección', nivelRiesgo: 'Alto', fechaDeteccion: '27/03/2024',
    descripcionTecnica: 'Permite a los atacantes inyectar scripts maliciosos en páginas web vistas por otros usuarios.',
    posiblesSoluciones: 'Escapar o sanear las entradas del usuario antes de mostrarlas en el navegador.',
    iconos: { gravedad: '🚨', categoria: '💻' },
    recomendacionesMitigacion: 'Usar Content Security Policy (CSP). Validar y sanear toda la entrada del usuario antes de renderizarla en el DOM.',
    evidences: [],
  },
  {
    id: '4', nombre: 'Exposición de datos sensibles', tipo: 'Fuga de Información', nivelRiesgo: 'Medio', fechaDeteccion: '28/03/2024',
    descripcionTecnica: 'Exposición no intencionada de información confidencial, como datos de usuarios, claves API o información de infraestructura.',
    posiblesSoluciones: 'Cifrar datos sensibles tanto en tránsito como en reposo. Implementar controles de acceso estrictos.',
    iconos: { gravedad: '🔒', categoria: '📁' },
    recomendacionesMitigacion: 'Minimizar la cantidad de datos sensibles almacenados. Eliminar datos innecesarios. Usar un cifrado robusto.',
    evidences: [],
  },
  {
    id: '5', nombre: 'Falsificación de petición en sitios cruzados', tipo: 'CSRF', nivelRiesgo: 'Medio', fechaDeteccion: '25/03/2024',
    descripcionTecnica: 'Un atacante engaña al navegador de una víctima para que envíe una una solicitud HTTP a una aplicación web en la que la víctima está autenticada.',
    posiblesSoluciones: 'Implementar tokens anti-CSRF en todos los formularios y solicitudes que cambien el estado.',
    iconos: { gravedad: '�', categoria: '🌐' },
    recomendacionesMitigacion: 'Usar SameSite cookies. Implementar cabeceras de seguridad como X-Frame-Options y Strict-Transport-Security.',
    evidences: [],
  },
  {
    id: '6', nombre: 'Uso de componente vulnerable', tipo: 'Componente', nivelRiesgo: 'Bajo', fechaDeteccion: '24/03/2024',
    descripcionTecnica: 'Utilizar librerías, frameworks u otros componentes de software con vulnerabilidades conocidas sin parchear.',
    posiblesSoluciones: 'Mantener todos los componentes actualizados a sus últimas versiones. Monitorear bases de datos de vulnerabilidades conocidas (CVE).',
    iconos: { gravedad: '🧩', categoria: '📦' },
    recomendacionesMitigacion: 'Realizar escaneos de dependencias regularmente. Automatizar la gestión de parches de seguridad.',
    evidences: [],
  },
  {
    id: '7', nombre: 'Configuración incorrecta', tipo: 'Configuración', nivelRiesgo: 'Bajo', fechaDeteccion: '23/03/2024',
    descripcionTecnica: 'Errores comunes en la configuración de seguridad, como permisos excesivos, servicios innecesarios habilitados, o credenciales por defecto.',
    posiblesSoluciones: 'Revisar y endurecer la configuración de todos los componentes. Seguir guías de hardening de seguridad.',
    iconos: { gravedad: '⚙️', categoria: '⚙️' },
    recomendacionesMitigacion: 'Desactivar servicios no utilizados. Cambiar todas las contraseñas por defecto. Implementar el principio de menor privilegio.',
    evidences: [],
  },
  {
    id: '8', nombre: 'XSS', tipo: 'Inyección', nivelRiesgo: 'Bajo', fechaDeteccion: '22/03/2024',
    descripcionTecnica: 'Permite a los atacantes inyectar scripts maliciosos en páginas web vistas por otros usuarios.',
    posiblesSoluciones: 'Escapar o sanear las entradas del usuario antes de mostrarlas en el navegador.',
    iconos: { gravedad: '💻', categoria: '💻' },
    recomendacionesMitigacion: 'Usar Content Security Policy (CSP). Validar y sanear toda la entrada del usuario antes de renderizarla en el DOM.',
    evidences: [],
  },
  {
    id: '9', nombre: 'Uso de componente vulnerable', tipo: 'Componente', nivelRiesgo: 'Bajo', fechaDeteccion: '21/03/2024',
    descripcionTecnica: 'Utilizar librerías, frameworks u otros componentes de software con vulnerabilidades conocidas sin parchear.',
    posiblesSoluciones: 'Mantener todos los componentes actualizados a sus últimas versiones. Monitorear bases de datos de vulnerabilidades conocidas (CVE).',
    iconos: { gravedad: '📦', categoria: '📦' },
    recomendacionesMitigacion: 'Realizar escaneos de dependencias regularmente. Automatizar la gestión de parches de seguridad.',
    evidences: [],
  },
];

// Opciones para los filtros y formularios
const riskLevels = ['Todos', 'Crítico', 'Alto', 'Medio', 'Bajo'];
const formRiskLevels = ['Crítico', 'Alto', 'Medio', 'Bajo']; // Para el formulario sin 'Todos'
const vulnerabilityTypes = ['Todos', 'Inyección', 'Configuración', 'Fuga de Información', 'CSRF', 'Componente', 'Otro'];
const formVulnerabilityTypes = ['Inyección', 'Configuración', 'Fuga de Información', 'CSRF', 'Componente', 'Otro']; // Para el formulario sin 'Todos'

// Componente para el formulario de añadir/modificar vulnerabilidad
function VulnerabilityForm({ onSave, onCancel, initialData }: { onSave: (vuln: Vulnerability) => void; onCancel: () => void; initialData?: Vulnerability | null; }) {
  const [formData, setFormData] = useState<Vulnerability>(initialData || {
    id: '', // Será generado en onSave si es nuevo
    nombre: '',
    tipo: formVulnerabilityTypes[0],
    nivelRiesgo: formRiskLevels[0],
    fechaDeteccion: new Date().toISOString().split('T')[0],
    descripcionTecnica: '',
    posiblesSoluciones: '',
    iconos: { gravedad: '❓', categoria: '❓' },
    recomendacionesMitigacion: '',
    evidences: [], // Inicializar evidencias vacías para nuevas vulnerabilidades
  });

  // Efecto para pre-cargar datos si es una edición
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vulnToSave: Vulnerability = { ...formData };
    if (!vulnToSave.id) { // Si no tiene ID, es una nueva vulnerabilidad
      vulnToSave.id = Date.now().toString(); // Generar ID para nueva vulnerabilidad
    }
    onSave(vulnToSave);
  };

  const isEditing = !!initialData?.id;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isEditing ? 'Modificar Vulnerabilidad' : 'Registrar Nueva Vulnerabilidad'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="formNombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
            <input
              type="text"
              id="formNombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="formTipo" className="block text-sm font-medium text-gray-700">Tipo:</label>
            <select
              id="formTipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {formVulnerabilityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="formNivelRiesgo" className="block text-sm font-medium text-gray-700">Nivel de Riesgo:</label>
            <select
              id="formNivelRiesgo"
              name="nivelRiesgo"
              value={formData.nivelRiesgo}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {formRiskLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="formFechaDeteccion" className="block text-sm font-medium text-gray-700">Fecha de Detección:</label>
            <input
              type="date"
              id="formFechaDeteccion"
              name="fechaDeteccion"
              value={formData.fechaDeteccion}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="formDescripcionTecnica" className="block text-sm font-medium text-gray-700">Descripción Técnica:</label>
            <textarea
              id="formDescripcionTecnica"
              name="descripcionTecnica"
              value={formData.descripcionTecnica}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="formPosiblesSoluciones" className="block text-sm font-medium text-gray-700">Posibles Soluciones:</label>
            <textarea
              id="formPosiblesSoluciones"
              name="posiblesSoluciones"
              value={formData.posiblesSoluciones}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              {isEditing ? 'Guardar Cambios' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente de Confirmación (Modal)
function ConfirmationModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void; }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmar Acción</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

// Nuevo componente para la subida de evidencias
function EvidenceUploadModal({ vulnerability, onSaveEvidence, onCancel }: { vulnerability: Vulnerability; onSaveEvidence: (vulnId: string, newEvidence: Evidence) => void; onCancel: () => void; }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Formato de archivo no válido. Solo se permiten PDF, PNG, JPG.');
        setSelectedFile(null);
        return;
      }
      setErrorMessage('');
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Por favor, selecciona un archivo.');
      return;
    }

    // Simular la generación de ID y otros datos para la evidencia
    const newEvidence: Evidence = {
      id: Date.now().toString(),
      fileName: selectedFile.name,
      fileType: selectedFile.type,
      uploadDate: new Date().toISOString().split('T')[0],
      isPrimary: false, // Por defecto no es principal al subir
    };
    onSaveEvidence(vulnerability.id, newEvidence);
    onCancel(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Subir Evidencia para "{vulnerability.nombre}"</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="evidenceFile" className="block text-sm font-medium text-gray-700">Seleccionar Archivo (PDF, PNG, JPG):</label>
            <input
              type="file"
              id="evidenceFile"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">Archivo seleccionado: <span className="font-medium">{selectedFile.name}</span></p>
            )}
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedFile}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-150 ease-in-out"
            >
              Subir Evidencia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// Componente para mostrar el detalle de una vulnerabilidad
function VulnerabilityDetail({ vulnerability, onBack, isAnalyst, onSaveEvidence, onSetPrimaryEvidence, onDeleteEvidence }: {
    vulnerability: Vulnerability | null;
    onBack: () => void;
    isAnalyst: boolean;
    onSaveEvidence: (vulnId: string, newEvidence: Evidence) => void;
    onSetPrimaryEvidence: (vulnId: string, evidenceId: string) => void;
    onDeleteEvidence: (vulnId: string, evidenceId: string) => void;
}) {
  const [showEvidenceUploadModal, setShowEvidenceUploadModal] = useState(false);

  if (!vulnerability) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <p className="text-xl text-gray-600">No se ha seleccionado ninguna vulnerabilidad.</p>
        <button
          onClick={onBack}
          className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Volver al Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Detalle de Vulnerabilidad: {vulnerability.nombre}
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
        >
          Volver al Dashboard
        </button>
      </div>

      <div className="space-y-4 text-gray-700">
        <p><span className="font-semibold">Tipo:</span> {vulnerability.tipo}</p>
        <p>
          <span className="font-semibold">Nivel de Riesgo: </span>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            vulnerability.nivelRiesgo === 'Crítico' ? 'bg-red-100 text-red-800' :
            vulnerability.nivelRiesgo === 'Alto' ? 'bg-red-100 text-red-800' :
            vulnerability.nivelRiesgo === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {vulnerability.nivelRiesgo}
          </span>
        </p>
        <p><span className="font-semibold">Fecha de Detección:</span> {vulnerability.fechaDeteccion}</p>

        <h3 className="text-xl font-bold text-gray-800 pt-4">Descripción Técnica y Posibles Soluciones:</h3>
        <p className="whitespace-pre-line">{vulnerability.descripcionTecnica || 'No disponible.'}</p>
        <p className="whitespace-pre-line">{vulnerability.posiblesSoluciones || 'No disponible.'}</p>

        <h3 className="text-xl font-bold text-gray-800 pt-4">Íconos Representativos:</h3>
        <div className="flex space-x-4">
            <span className="text-4xl" title="Gravedad">{vulnerability.iconos.gravedad}</span>
            <span className="text-4xl" title="Categoría de Ataque">{vulnerability.iconos.categoria}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 pt-4">Recomendaciones para Mitigar:</h3>
        <p className="whitespace-pre-line">{vulnerability.recomendacionesMitigacion || 'No disponible.'}</p>
      </div>

      {/* Sección de Evidencias */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Evidencias ({vulnerability.evidences.length})</h3>
        {vulnerability.evidences.length === 0 ? (
          <p className="text-gray-600">No hay evidencias subidas para esta vulnerabilidad.</p>
        ) : (
          <ul className="space-y-3">
            {vulnerability.evidences.map(evidence => (
              <li key={evidence.id} className="bg-gray-50 p-4 rounded-md shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{evidence.fileName}</p>
                  <p className="text-sm text-gray-600">Tipo: {evidence.fileType} | Subido: {evidence.uploadDate}</p>
                  {evidence.isPrimary && (
                    <span className="text-indigo-600 text-sm font-medium">⭐ Principal</span>
                  )}
                </div>
                {isAnalyst && (
                  <div className="flex space-x-2">
                    {!evidence.isPrimary && (
                      <button
                        onClick={() => onSetPrimaryEvidence(vulnerability.id, evidence.id)}
                        className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 transition"
                      >
                        Marcar Principal
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteEvidence(vulnerability.id, evidence.id)}
                      className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {isAnalyst && (
          <button
            onClick={() => setShowEvidenceUploadModal(true)}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Subir Nueva Evidencia
          </button>
        )}
      </div>

      {showEvidenceUploadModal && (
        <EvidenceUploadModal
          vulnerability={vulnerability}
          onSaveEvidence={onSaveEvidence}
          onCancel={() => setShowEvidenceUploadModal(false)}
        />
      )}
    </div>
  );
}


// Componente para el modal de inicio de sesión
function LoginModal({ onLogin, onCancel, errorMessage }: { onLogin: (username: string, password: string) => void; onCancel: () => void; errorMessage: string | null; }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Iniciar Sesión Analista</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// Componente principal del Dashboard
function DashboardInka() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>(initialVulnerabilitiesData);
  const [selectedRisk, setSelectedRisk] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedDate, setSelectedDate] = useState('');
  const [showForm, setShowForm] = useState<'none' | 'add' | 'edit'>('none'); // Controla qué formulario mostrar
  const [vulnerabilityToEdit, setVulnerabilityToEdit] = useState<Vulnerability | null>(null); // Vulnerabilidad para editar
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null); // Para el detalle
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Para el modal de confirmación de eliminar
  const [vulnToDelete, setVulnToDelete] = useState<string | null>(null); // ID de la vulnerabilidad a eliminar

  // Simulación de perfil de analista
  const [isAnalyst, setIsAnalyst] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Estado para mostrar/ocultar el modal de login
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null); // Mensaje de error del login

  // Función para filtrar las vulnerabilidades
  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    const matchesRisk = selectedRisk === 'Todos' || vuln.nivelRiesgo === selectedRisk;
    const matchesType = selectedType === 'Todos' || vuln.tipo === selectedType;
    const matchesDate = selectedDate === '' || vuln.fechaDeteccion === selectedDate;

    return matchesRisk && matchesType && matchesDate;
  });

  const handleViewDetail = (vulnId: string) => {
    const vuln = vulnerabilities.find(v => v.id === vulnId);
    setSelectedVulnerability(vuln || null);
  };

  const handleSaveVulnerability = (savedVuln: Vulnerability) => {
    if (savedVuln.id && vulnerabilities.some(v => v.id === savedVuln.id)) {
      // Modificar existente
      setVulnerabilities(prevVulns =>
        prevVulns.map(v => (v.id === savedVuln.id ? savedVuln : v))
      );
    } else {
      // Añadir nueva
      // Asegurarse de que las evidencias estén vacías si no se proporcionan (para el formulario)
      const newVulnWithEvidences = { ...savedVuln, evidences: savedVuln.evidences || [] };
      setVulnerabilities(prevVulns => [...prevVulns, { ...newVulnWithEvidences, id: newVulnWithEvidences.id || Date.now().toString() }]);
    }
    setShowForm('none'); // Ocultar el formulario
    setVulnerabilityToEdit(null); // Limpiar la vulnerabilidad en edición
  };

  const handleDeleteVulnerability = (vulnId: string) => {
    setVulnToDelete(vulnId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (vulnToDelete) {
      setVulnerabilities(prevVulns => prevVulns.filter(vuln => vuln.id !== vulnToDelete));
      setVulnToDelete(null);
      setShowConfirmModal(false);
    }
  };

  const cancelDelete = () => {
    setVulnToDelete(null);
    setShowConfirmModal(false);
  };

  const handleBackToDashboard = () => {
    setSelectedVulnerability(null);
    setShowForm('none');
    setVulnerabilityToEdit(null);
  };

  const handleSaveEvidence = (vulnId: string, newEvidence: Evidence) => {
    setVulnerabilities(prevVulns =>
      prevVulns.map(vuln => {
        if (vuln.id === vulnId) {
          const updatedEvidences = [...vuln.evidences];
          // Solo marcar como principal si no hay ya una principal
          if (!updatedEvidences.some(ev => ev.isPrimary)) {
            newEvidence.isPrimary = true;
          } else {
            newEvidence.isPrimary = false; // Asegurarse de que las nuevas no sean principales si ya existe una
          }
          return { ...vuln, evidences: [...updatedEvidences, newEvidence] };
        }
        return vuln;
      })
    );
  };

  const handleSetPrimaryEvidence = (vulnId: string, evidenceId: string) => {
    setVulnerabilities(prevVulns =>
      prevVulns.map(vuln => {
        if (vuln.id === vulnId) {
          const updatedEvidences = vuln.evidences.map(ev => ({
            ...ev,
            isPrimary: ev.id === evidenceId,
          }));
          return { ...vuln, evidences: updatedEvidences };
        }
        return vuln;
      })
    );
  };

  const handleDeleteEvidence = (vulnId: string, evidenceId: string) => {
    setVulnerabilities(prevVulns =>
      prevVulns.map(vuln => {
        if (vuln.id === vulnId) {
          const filteredEvidences = vuln.evidences.filter(ev => ev.id !== evidenceId);
          // Si la evidencia eliminada era la principal, y aún quedan evidencias,
          // marcar la primera como principal (o ajustar la lógica de tu negocio)
          if (vuln.evidences.find(ev => ev.id === evidenceId)?.isPrimary && filteredEvidences.length > 0) {
            filteredEvidences[0].isPrimary = true;
          }
          return { ...vuln, evidences: filteredEvidences };
        }
        return vuln;
      })
    );
  };

  // Lógica de inicio de sesión
  const handleAnalystLogin = (username: string, password: string) => {
    const CORRECT_USERNAME = 'admin';
    const CORRECT_PASSWORD = 'adminpass';

    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setIsAnalyst(true);
      setShowLoginModal(false);
      setLoginErrorMessage(null);
    } else {
      setLoginErrorMessage('Usuario o contraseña incorrectos.');
    }
  };

  const handleAnalystToggle = () => {
    if (isAnalyst) {
      // Si ya es analista, al hacer clic, se desactiva
      setIsAnalyst(false);
    } else {
      // Si no es analista, al hacer clic, se muestra el modal de login
      setShowLoginModal(true);
      setLoginErrorMessage(null); // Limpiar cualquier mensaje de error previo
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-900">
      {/* Cargar Tailwind CSS y fuente Inter */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }

        /* Estilos para el toggle del analista */
        .toggle-checkbox { position: absolute; opacity: 0; width: 0; height: 0; }
        .toggle-checkbox + div {
          position: relative; cursor: pointer; width: 56px; height: 32px;
          border-radius: 9999px; background-color: #d1d5db; transition: background-color 0.3s ease;
        }
        .toggle-checkbox + div .dot {
          position: absolute; top: 4px; left: 4px; width: 24px; height: 24px;
          border-radius: 9999px; background-color: #ffffff; transition: transform 0.3s ease;
        }
        /* Color del toggle en modo analista (cambiado a un gris muy oscuro/negro) */
        .toggle-checkbox:checked + div { background-color: #000000; /* Pure black */ }
        .toggle-checkbox:checked + div .dot { transform: translateX(24px); }
      `}} />

      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 rounded-t-lg shadow-md mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black">INKA DASHBOARD DE CIBERSEGURIDAD <span className="font-light text-xl"></span></h1>
        {/* Toggle Modo Analista */}
        <label className="flex items-center cursor-pointer relative ml-auto">
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={isAnalyst}
            onChange={handleAnalystToggle} // Usar la nueva función de manejo
          />
          <div><div className="dot"></div></div>
          {/* Aquí el texto del Modo Analista ahora es negro */}
          <span className="ml-3 text-black font-medium">Modo Analista</span>
        </label>
      </header>

      <div className="bg-white p-6 rounded-b-lg shadow-lg">
        {selectedVulnerability ? (
          <VulnerabilityDetail
            vulnerability={selectedVulnerability}
            onBack={handleBackToDashboard}
            isAnalyst={isAnalyst}
            onSaveEvidence={handleSaveEvidence}
            onSetPrimaryEvidence={handleSetPrimaryEvidence}
            onDeleteEvidence={handleDeleteEvidence}
          />
        ) : showForm === 'add' || showForm === 'edit' ? (
          <VulnerabilityForm
            onSave={handleSaveVulnerability}
            onCancel={handleBackToDashboard}
            initialData={showForm === 'edit' ? vulnerabilityToEdit : null}
          />
        ) : (
          <>
            {/* Sección de Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div>
                <label htmlFor="riskFilter" className="block text-sm font-medium text-gray-700 sr-only">Nivel de riesgo</label>
                <select
                  id="riskFilter"
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                >
                  {riskLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 sr-only">Tipo de vulnerabilidad</label>
                <select
                  id="typeFilter"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                >
                  {vulnerabilityTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 sr-only">Fecha de detección</label>
                <input
                  type="date"
                  id="dateFilter"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                />
              </div>
            </div>

            {/* Título de la lista */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Vulnerabilidades Detectadas</h2>

            {/* Tabla de Vulnerabilidades */}
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de riesgo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de detecc.</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                </tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">{
                  filteredVulnerabilities.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-center text-gray-500">No se encontraron vulnerabilidades que coincidan con los filtros.</td>
                    </tr>
                  ) : (
                    filteredVulnerabilities.map((vuln) => (
                      <tr key={vuln.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vuln.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            vuln.nivelRiesgo === 'Crítico' ? 'bg-red-100 text-red-800' :
                            vuln.nivelRiesgo === 'Alto' ? 'bg-red-100 text-red-800' :
                            vuln.nivelRiesgo === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {vuln.nivelRiesgo}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vuln.fechaDeteccion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2"> {/* Contenedor para botones */}
                            <button
                              onClick={() => handleViewDetail(vuln.id)}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            >
                              Ver Detalle
                            </button>
                            {isAnalyst && (
                              <>
                                <button
                                  onClick={() => {
                                    setVulnerabilityToEdit(vuln);
                                    setShowForm('edit');
                                  }}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
                                >
                                  Modificar
                                </button>
                                <button
                                  onClick={() => handleDeleteVulnerability(vuln.id)}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                                >
                                  Eliminar
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Botón para Registrar Nueva Vulnerabilidad */}
            {isAnalyst && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowForm('add')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Registrar Nueva Vulnerabilidad
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          message="¿Estás seguro de que quieres eliminar esta vulnerabilidad? Esta acción es irreversible."
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onLogin={handleAnalystLogin}
          onCancel={() => setShowLoginModal(false)}
          errorMessage={loginErrorMessage}
        />
      )}
    </div>
  );
}

// La función Home es el componente por defecto de Next.js para esta ruta.
// Simplemente renderiza el DashboardInka.
export default function Home() {
  return <DashboardInka />;
}
