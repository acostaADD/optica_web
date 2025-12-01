// Registro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (isLogin) {
      // Para login solo necesitamos email y password
      if (!formData.email || !formData.password) {
        alert('Por favor completa todos los campos');
        return;
      }
    } else {
      // Para registro necesitamos todos los campos
      if (!formData.nombre || !formData.email || !formData.password) {
        alert('Por favor completa todos los campos');
        return;
      }
    }

    // Simular registro o login exitoso
    if (isLogin) {
      // Guardar estado de login en localStorage
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      
      alert('¡Inicio de sesión exitoso!');
      // Redirigir de vuelta al catálogo
      navigate('/catalogo');
    } else {
      // Guardar datos de usuario y estado de login
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('userEmail', formData.email);
      
      alert('¡Cuenta creada exitosamente!');
      // Redirigir de vuelta al catálogo
      navigate('/catalogo');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      nombre: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-creato">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-creato font-bold text-gray-900 mb-6 text-center">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-creato font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input 
                  type="text" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-creato"
                  placeholder="Ingresa tu nombre"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-creato font-medium text-gray-700 mb-1">
                Email
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-creato"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-creato font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-creato"
                placeholder={isLogin ? "Ingresa tu contraseña" : "Crea una contraseña"}
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#057CCC] to-[#046bb8] text-white py-3 rounded-lg hover:from-[#046bb8] hover:to-[#035a9e] transition-all font-creato font-semibold transform hover:scale-105"
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-creato">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{" "}
              <button 
                onClick={toggleMode}
                className="text-[#057CCC] hover:text-[#046bb8] font-creato font-semibold underline"
              >
                {isLogin ? 'Regístrate' : 'Inicia Sesión'}
              </button>
            </p>
          </div>

          {/* Botón para volver al catálogo */}
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigate('/catalogo')}
              className="text-gray-500 hover:text-gray-700 text-sm font-creato font-medium"
            >
              ← Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;