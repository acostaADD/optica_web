import { useLocation, Link } from 'react-router-dom';

function Confirmacion() {
  const location = useLocation();
  const { orderNumber, total, items } = location.state || {};

  if (!orderNumber) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="text-6xl mb-6">❌</div>
            <h2 className="text-2xl font-creato font-bold text-gray-800 mb-4">Orden No Encontrada</h2>
            <p className="text-gray-600 mb-8">No se pudo encontrar la información de tu pedido.</p>
            <Link 
              to="/catalogo"
              className="bg-[#057CCC] text-white px-8 py-4 rounded-xl hover:bg-[#046bb8] transition-all font-creato font-semibold inline-block"
            >
              Volver al Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          {/* Icono de éxito */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Mensaje de éxito */}
          <h1 className="text-3xl font-creato font-bold text-gray-900 mb-4">¡Pago Exitoso!</h1>
          <p className="text-gray-600 mb-8">
            Tu pedido ha sido procesado correctamente. Te hemos enviado un correo con los detalles.
          </p>

          {/* Número de orden */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-500 mb-2">Número de Orden</p>
            <p className="text-2xl font-creato font-bold text-[#057CCC]">{orderNumber}</p>
          </div>

          {/* Resumen */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <div className="flex justify-between items-center text-lg font-creato font-semibold">
              <span>Total Pagado:</span>
              <span>S/ {total?.toFixed(2)}</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/catalogo"
              className="bg-[#057CCC] text-white px-8 py-4 rounded-xl hover:bg-[#046bb8] transition-all font-creato font-semibold inline-block"
            >
              Seguir Comprando
            </Link>
            <button 
              onClick={() => window.print()}
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-creato font-semibold"
            >
              Imprimir Recibo
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 text-left">
            <h3 className="font-creato font-semibold text-blue-800 mb-2">¿Qué sigue?</h3>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Recibirás un correo con la confirmación de tu pedido</li>
              <li>• Te contactaremos para coordinar la entrega</li>
              <li>• Tiempo de entrega: 2-5 días hábiles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmacion;