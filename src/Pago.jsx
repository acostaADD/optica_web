import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

function Pago() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Formatear número de tarjeta (agregar espacios cada 4 dígitos)
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Formatear fecha de expiración (MM/YY)
    if (name === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular procesamiento de pago
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Limpiar carrito después del pago exitoso
      localStorage.setItem('cart', '[]');
      
      // Redirigir a página de confirmación
      navigate('/confirmacion', { 
        state: { 
          orderNumber: `ORD-${Date.now()}`,
          total: calculateTotal(),
          items: cartItems
        }
      });
    } catch (error) {
      console.error('Error en el pago:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-creato font-bold text-gray-800 mb-4">Carrito Vacío</h2>
            <p className="text-gray-600 mb-8">No hay productos para procesar el pago.</p>
            <Link 
              to="/catalogo"
              className="bg-[#057CCC] text-white px-8 py-4 rounded-xl hover:bg-[#046bb8] transition-all font-creato font-semibold inline-block"
            >
              Ir al Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-creato font-bold text-gray-900 mb-4">Procesar Pago</h1>
          <div className="w-24 h-1 bg-[#057CCC] mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de Pago */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-creato font-bold mb-6">Información de Pago</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Número de Tarjeta */}
              <div>
                <label className="block text-sm font-creato font-semibold text-gray-700 mb-2">
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#057CCC] focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Fecha de Expiración */}
                <div>
                  <label className="block text-sm font-creato font-semibold text-gray-700 mb-2">
                    Fecha de Expiración
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    maxLength="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#057CCC] focus:border-transparent"
                    required
                  />
                </div>

                {/* CVV */}
                <div>
                  <label className="block text-sm font-creato font-semibold text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#057CCC] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Nombre del Titular */}
              <div>
                <label className="block text-sm font-creato font-semibold text-gray-700 mb-2">
                  Nombre del Titular
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  placeholder="Como aparece en la tarjeta"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#057CCC] focus:border-transparent"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-creato font-semibold text-gray-700 mb-2">
                  Email para el recibo
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#057CCC] focus:border-transparent"
                  required
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-creato font-semibold text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+51 999 999 999"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#057CCC] focus:border-transparent"
                  required
                />
              </div>

              {/* Botón de Pago */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-500 text-white py-4 rounded-xl hover:bg-green-600 disabled:bg-green-300 transition-all font-creato font-semibold text-lg flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando Pago...
                  </>
                ) : (
                  `Pagar S/ ${calculateTotal().toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Resumen del Pedido */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-creato font-bold mb-6">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100">
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80x80?text=Imagen";
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-creato font-semibold text-sm text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.brand}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-creato font-bold text-sm">{item.price}</span>
                      <span className="text-gray-500 text-sm">x{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-xl font-creato font-bold">
                <span>Total:</span>
                <span>S/ {calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Información de Seguridad */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="font-creato font-semibold text-sm">Pago Seguro</span>
              </div>
              <p className="text-xs text-blue-600">
                Tus datos están protegidos con encriptación SSL. No almacenamos información de tu tarjeta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pago;