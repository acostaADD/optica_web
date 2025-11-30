import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Catalogo from './Catalogo';
import Agendar from './Agendar';
import Registro from './Registro';
import Nosotros from './Nosotros';

/* Componente Carrito Lateral */
function CarritoLateral({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Cargar items del carrito desde localStorage
  useEffect(() => {
    if (isOpen) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(cart);
    }
  }, [isOpen]);

  // Calcular total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('S/', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Actualizar cantidad
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Eliminar producto
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Obtener cantidad total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      ></div>
      
      {/* Carrito lateral */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Encabezado */}
        <div className="bg-white p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">CARRO DE COMPRAS ({getTotalItems()})</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            /* Carrito vacío */
            <div className="text-center py-8 px-4">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-md font-bold text-gray-800 mb-4">No tienes productos en tu carro.</h3>
              <div className="w-full h-px bg-gray-300 my-4"></div>
              
              {/* Sección de información */}
              <div className="text-center">
                <h4 className="text-sm font-bold mb-3">Venta Telefónica</h4>
                
                <div className="mb-4">
                  <h5 className="text-xs font-bold mb-2">ESTÁN AQUÍ</h5>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>0%</p>
                    <p>EN LENTES</p>
                    <p>EN TIENDA</p>
                    <p>COMPRA ONLINE</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Productos en el carrito */
            <div className="p-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80x80?text=Imagen";
                    }}
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.brand}</p>
                    <p className="text-red-600 font-bold text-sm">{item.price}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer del carrito */}
        <div className="border-t p-4 bg-gray-50">
          {cartItems.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>S/ {calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          )}
          
          {cartItems.length > 0 ? (
            <div className="space-y-2">
              <button 
                onClick={() => {
                  onClose();
                  navigate('/carrito');
                }}
                className="w-full bg-[#057CCC] text-white py-3 rounded-lg hover:bg-[#046bb8] transition-all font-semibold text-center block"
              >
                Ver Carrito Completo
              </button>
              <Link 
                to="/catalogo"
                onClick={onClose}
                className="w-full border border-[#057CCC] text-[#057CCC] py-3 rounded-lg hover:bg-[#057CCC] hover:text-white transition-all font-semibold text-center block"
              >
                Seguir Comprando
              </Link>
            </div>
          ) : (
            <Link 
              to="/catalogo"
              onClick={onClose}
              className="w-full bg-[#057CCC] text-white py-3 rounded-lg hover:bg-[#046bb8] transition-all font-semibold text-center block"
            >
              Ver Catálogo
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

/* Componente Carrito (página completa) */
function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Cargar items del carrito
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  // Calcular total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('S/', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Actualizar cantidad
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Eliminar producto
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', '[]');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">CARRO DE COMPRAS</h1>
          <div className="w-24 h-1 bg-[#057CCC] mx-auto mb-8"></div>
        </div>

        {cartItems.length === 0 ? (
          /* Carrito vacío */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center mb-8">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No tienes productos en tu carro.</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explora nuestro catálogo y descubre los mejores lentes y monturas para ti.
            </p>
            <Link 
              to="/catalogo"
              className="bg-[#057CCC] text-white px-8 py-4 rounded-xl hover:bg-[#046bb8] transition-all font-semibold inline-block"
            >
              Ver Catálogo
            </Link>
          </div>
        ) : (
          /* Carrito con productos */
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tus Productos ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h2>
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Vaciar Carrito
              </button>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-6 border-b border-gray-200">
                <img 
                  src={item.img} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80x80?text=Imagen";
                  }}
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-gray-500">{item.brand}</p>
                  <p className="text-red-600 font-bold text-lg">{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}

            {/* Total y botones */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-2xl font-bold mb-6">
                <span>Total:</span>
                <span>S/ {calculateTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  to="/catalogo"
                  className="flex-1 border border-[#057CCC] text-[#057CCC] py-4 rounded-xl hover:bg-[#057CCC] hover:text-white transition-all font-semibold text-center"
                >
                  Seguir Comprando
                </Link>
                <button className="flex-1 bg-green-500 text-white py-4 rounded-xl hover:bg-green-600 transition-all font-semibold">
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sección de información importante */}
        <div className="bg-gradient-to-r from-[#057CCC] to-[#046bb8] rounded-2xl p-8 text-white text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4">Visual</h3>
              <p className="text-lg opacity-90">Venta Telefónica</p>
            </div>
            
            <div className="border-l border-white/30 pl-8">
              <h3 className="text-2xl font-bold mb-4">YA ESTÁN AQUÍ</h3>
              <p className="text-lg opacity-90">Nuevos modelos disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//* Home está definido aquí mismo (puedes moverlo a Home.jsx luego si quieres) */
function Home() {
  return (
    <>
      {/* BANNER COLECCIÓN VERANO 2026 - MÁS GRANDE */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://invyctaretail.com/wp-content/uploads/2023/05/muebles-para-opticas.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#057CCC]/80 to-teal-900/60"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center">
          <div>
            <p className="text-4xl md:text-6xl font-light mb-2"></p>
            {/* Título más pequeño */}
            <h2 className="text-4xl md:text-7xl font-bold">
              Centro Oftalmológico Lagoz
            </h2>
          </div>
        </div>
      </section>
  
      {/* MARCAS - CARRUSEL ANIMADO ULTRA DELGADO */}
      <section className="bg-black py-1 overflow-hidden">
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="flex items-center whitespace-nowrap animate-scroll">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center gap-4 px-2">
              <div className="text-white text-sm font-serif italic">TIWI</div>
              <div className="text-white text-xs font-bold tracking-wider">THEBOOKCLUB</div>
              <div className="text-white text-sm font-bold">
                BETTINELLI <span className="text-[8px]">eyewear</span>
              </div>
              <div className="text-white text-sm font-black tracking-tight">BABIATORS.</div>
              <div className="flex items-center gap-0.5">
                <div className="flex gap-0">
                  <div className="w-1 h-2 bg-[#057CCC] transform -skew-x-12"></div>
                  <div className="w-1 h-2 bg-red-500 transform -skew-x-12"></div>
                </div>
                <div className="text-white">
                  <div className="text-sm font-bold">Le Specs</div>
                  <div className="text-[7px] tracking-widest">LIVE - LOVE - LE SPECS</div>
                </div>
              </div>
              <div className="text-white text-sm">
                <div className="font-bold">antonia ferrario</div>
                <div className="text-[8px] tracking-wider">eyewear</div>
              </div>
              <div className="text-white text-sm font-serif italic">RAY-BAN</div>
              <div className="text-white text-sm font-black">OAKLEY</div>
            </div>
          ))}
        </div>
      </section>

      {/* NUEVA SECCIÓN DE SERVICIOS ACTUALIZADA */}
      <section id="servicios" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">Nuestros Servicios</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Consultas Oftalmológicas */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:transform hover:-translate-y-2">
            <h4 className="text-xl font-bold mb-3 text-gray-800">Consultas Oftalmológicas</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Consultas oftalmológicas especializadas con profesionales certificados.
            </p>
          </div>

          {/* Diagnóstico Visual */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:transform hover:-translate-y-2">
            <h4 className="text-xl font-bold mb-3 text-gray-800">Diagnóstico Visual</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Diagnóstico visual con equipos modernos y tecnología de última generación.
            </p>
          </div>

          {/* Tratamientos Oculares */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:transform hover:-translate-y-2">
            <h4 className="text-xl font-bold mb-3 text-gray-800">Tratamientos Oculares</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tratamientos y seguimiento especializado en salud ocular integral.
            </p>
          </div>

          {/* Óptica Completa */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:transform hover:-translate-y-2">
            <h4 className="text-xl font-bold mb-3 text-gray-800">Óptica Completa</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Venta de monturas, lentes de medida, lentes de sol.
            </p>
          </div>
        </div>

       
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-gradient-to-br from-[#057CCC] to-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'María González', comment: 'Excelente atención y profesionalismo. Mis lentes quedaron perfectos.' },
              { name: 'Carlos Mendoza', comment: 'Increíble variedad de monturas y precios accesibles.' },
              { name: 'Ana Rodríguez', comment: 'Personal amable y seguimiento excepcional. Los recomiendo 100%.' },
            ].map((test, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-300">★</span>
                  ))}
                </div>
                <p className="mb-6">{test.comment}</p>
                <p className="font-bold">{test.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------ App (principal) ------------------ */
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Actualizar contador del carrito
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(totalItems);
    };

    // Actualizar al cargar
    updateCartCount();

    // Escuchar cambios en el localStorage
    window.addEventListener('storage', updateCartCount);
    
    // También verificar periódicamente (por si hay cambios en la misma pestaña)
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <Router>
      <div className="font-sans bg-white text-gray-900 min-h-screen">
        {/* NAVBAR MÁS DELGADA CON LOGO INTEGRADO */}
        <header className="bg-white text-gray-900 shadow-lg sticky top-0 z-40">
          <nav className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              {/* LOGO Y NAVEGACIÓN EN LA MISMA LÍNEA */}
              <div className="flex items-center space-x-8">
                {/* LOGO MÁS PEQUEÑO */}
                <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                  <img src="/letra.png" alt="Óptica Lagoz Logo" className="h-12 w-auto object-contain" />
                </Link>

                {/* NAVEGACIÓN PRINCIPAL - MÁS COMPACTA */}
                <div className="hidden md:flex items-center space-x-6 text-sm font-semibold">
                  <Link 
                    to="/" 
                    className="hover:text-[#057CCC] cursor-pointer transition-all py-2 px-3 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Inicio
                  </Link>
                  <Link 
                    to="/catalogo" 
                    className="hover:text-[#057CCC] cursor-pointer transition-all py-2 px-3 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Catálogo
                  </Link>
                  <Link 
                    to="/nosotros" 
                    className="hover:text-[#057CCC] cursor-pointer transition-all py-2 px-3 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Sobre nosotros
                  </Link>
                </div>
              </div>

              {/* BOTÓN AGENDAR E ICONOS A LA DERECHA */}
              <div className="flex items-center space-x-6">
                {/* BOTÓN AGENDAR */}
                <Link 
                  to="/agendar"
                  className="bg-gradient-to-r from-[#057CCC] to-[#046bb8] text-white px-5 py-2.5 rounded-xl hover:from-[#046bb8] hover:to-[#035a9e] cursor-pointer transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 font-bold text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agenda tu examen visual
                </Link>

                {/* ICONOS SUPERIORES MÁS PEQUEÑOS */}
                <div className="hidden md:flex items-center gap-6">
                  {/* ENLACE "MI CUENTA" ACTUALIZADO PARA REDIRIGIR A REGISTRO */}
                  <Link 
                    to="/registro" 
                    className="flex flex-col items-center gap-1 hover:text-[#057CCC] transition-all group"
                  >
                    <div className="bg-[#057CCC]/10 p-1.5 rounded-lg group-hover:bg-[#057CCC]/20 transition-colors">
                      <svg className="w-4 h-4 text-[#057CCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold">Mi cuenta</span>
                  </Link>

                  {/* BOTÓN CARRITO ACTUALIZADO - Ahora abre el sidebar */}
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="flex flex-col items-center gap-1 hover:text-[#057CCC] transition-all group relative"
                  >
                    <div className="bg-[#057CCC]/10 p-1.5 rounded-lg group-hover:bg-[#057CCC]/20 transition-colors">
                      <svg className="w-4 h-4 text-[#057CCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold">Carrito</span>
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm text-[10px]">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* BOTÓN MENÚ MÓVIL MÁS PEQUEÑO */}
                <button 
                  className="md:hidden text-gray-700 bg-gray-100 p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>

          {/* MENÚ MÓVIL MEJORADO */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3 shadow-lg">
              <Link 
                to="/" 
                className="flex items-center gap-3 hover:text-[#057CCC] cursor-pointer transition-colors py-2 font-semibold border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Inicio
              </Link>
              <Link 
                to="/catalogo" 
                className="flex items-center gap-3 hover:text-[#057CCC] cursor-pointer transition-colors py-2 font-semibold border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Catálogo
              </Link>
              <Link 
                to="/carrito" 
                className="flex items-center gap-3 hover:text-[#057CCC] cursor-pointer transition-colors py-2 font-semibold border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Carrito
              </Link>
              {/* ENLACE "MI CUENTA" ACTUALIZADO EN MÓVIL */}
              <Link 
                to="/registro"
                className="flex items-center gap-3 hover:text-[#057CCC] cursor-pointer transition-colors py-2 font-semibold border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mi cuenta
              </Link>
              <Link 
                to="/nosotros"
                className="flex items-center gap-3 hover:text-[#057CCC] cursor-pointer transition-colors py-2 font-semibold border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sobre nosotros
              </Link>
              <Link 
                to="/agendar"
                className="bg-gradient-to-r from-[#057CCC] to-[#046bb8] text-white px-5 py-3 rounded-xl hover:from-[#046bb8] hover:to-[#035a9e] cursor-pointer transition-all shadow-lg flex items-center justify-center gap-2 font-bold mt-3 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agenda tu examen visual
              </Link>
            </div>
          )}
        </header>

        {/* CARRITO LATERAL */}
        <CarritoLateral isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* RUTAS */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
        </Routes>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-300 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* COLUMNA 1: LOGO Y DESCRIPCIÓN */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-white mb-4">Óptica Lagoz</h3>
                <p className="text-sm mb-6">Tu salud visual es nuestra prioridad.</p>
                
                {/* INFORMACIÓN DE CONTACTO */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>2 de Mayo 1066, Huánuco</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span>+51 914 610 769</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✉️</span>
                    <span>info@opticalagoz.pe</span>
                  </div>
                </div>
              </div>

              {/* COLUMNA 2: REDES SOCIALES */}
              <div className="md:col-span-2">
                <h4 className="text-white font-bold mb-6 text-lg">Síguenos en redes sociales</h4>
                
                {/* USUARIO */}
                <div className="mb-6">
                  <p className="text-lg font-semibold text-white">@opticalagoz</p>
                  <p className="text-sm text-gray-400 mt-1">Conéctate con nosotros</p>
                </div>

                {/* ÍCONOS DE REDES SOCIALES */}
                <div className="flex space-x-6 mb-6">
                  {/* TikTok */}
                  <a 
                    href="https://tiktok.com/@opticalagoz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-4 rounded-xl hover:bg-pink-600 hover:scale-110 transition-all duration-300 group relative"
                    title="Síguenos en TikTok"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-3.77-1.105l-.001-.001z"/>
                    </svg>
                  </a>
                  
                  {/* Instagram - MEJORADO */}
                  <a 
                    href="https://instagram.com/opticalagoz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-400 p-4 rounded-xl hover:scale-110 transition-all duration-300 group relative shadow-lg hover:shadow-xl"
                    title="Síguenos en Instagram"
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    {/* Efecto de brillo al hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </a>
                  
                  {/* Facebook */}
                  <a 
                    href="https://facebook.com/opticalagoz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-4 rounded-xl hover:bg-blue-600 hover:scale-110 transition-all duration-300 group relative"
                    title="Síguenos en Facebook"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-sm">
              <p>© 2025 Óptica Lagoz — Huánuco, Perú</p>
            </div>
          </div>
        </footer>

        {/* BOTÓN FLOTANTE WHATSAPP MEJORADO */}
        <a
          href="https://wa.me/51914610769?text=Hola,%20necesito%20información"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 group"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          
          {/* Mensaje flotante similar al de la imagen */}
          <div className="absolute bottom-full right-0 mb-3 w-64 bg-white text-gray-800 p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
            <div className="font-bold mb-1">¿Te ayudamos a completar tu pedido Online?</div>
            <div className="text-sm text-gray-600 mb-2">Estamos aquí para ayudarte</div>
            <div className="bg-green-500 text-white text-center py-2 px-4 rounded font-bold">
              COMPRAR AHORA
            </div>
            {/* Flecha indicadora */}
            <div className="absolute top-full right-6 transform -translate-y-1 border-8 border-transparent border-t-white"></div>
          </div>
        </a>
      </div>
    </Router>
  );
}