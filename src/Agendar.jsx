import { useState } from "react";

export default function Agendar() {
  const [activeTab, setActiveTab] = useState("mapa");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  
  // Estado para el formulario de cita
  const [appointmentData, setAppointmentData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "",
    fecha: "",
    hora: "",
    mensaje: ""
  });

  // NUEVOS SERVICIOS ACTUALIZADOS
  const services = [
    {
      id: 1,
      title: "Consultas Oftalmológicas",
      description: "Consultas oftalmológicas especializadas con profesionales certificados. Evaluación completa de tu salud visual, diagnóstico de condiciones oculares y seguimiento personalizado para garantizar el mejor cuidado para tus ojos.",
      icon: "",
      ageRestriction: null
    },
    {
      id: 2,
      title: "Diagnóstico Visual",
      description: "Diagnóstico visual con equipos modernos y tecnología de última generación. Realizamos exámenes completos que incluyen medición de agudeza visual, presión intraocular, fondo de ojo y estudios especializados para detectar problemas visuales a tiempo.",
      icon: "",
      ageRestriction: null
    },
    {
      id: 3,
      title: "Tratamientos Oculares",
      description: "Tratamientos y seguimiento especializado en salud ocular integral. Desarrollamos planes de tratamiento personalizados para condiciones como cataratas, glaucoma, problemas de retina y otras enfermedades oculares, con el más alto estándar de calidad.",
      icon: "",
      ageRestriction: null
    },
    {
      id: 4,
      title: "Óptica Completa",
      description: "Venta de monturas, lentes de medida, lentes de sol y lentes de contacto. Contamos con una amplia variedad de marcas y estilos para todos los gustos y necesidades. Asesoramiento profesional para encontrar la solución perfecta para tu visión y estilo de vida.",
      icon: "",
      ageRestriction: null
    }
  ];

  // Horarios disponibles
  const availableHours = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30"
  ];

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  // Función para programar cita
  const programarCita = (tienda) => {
    setSelectedStore(tienda);
    setShowAppointmentForm(true);
    setAppointmentData(prev => ({
      ...prev,
      servicio: services[0].title // Servicio por defecto
    }));
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para enviar el formulario
  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    
    // Aquí normalmente enviarías los datos a un servidor
    console.log("Datos de la cita:", appointmentData);
    
    // Mostrar confirmación
    setAppointmentConfirmed(true);
    setShowAppointmentForm(false);
    
    // Reiniciar formulario después de 5 segundos
    setTimeout(() => {
      setAppointmentConfirmed(false);
      setAppointmentData({
        nombre: "",
        email: "",
        telefono: "",
        servicio: "",
        fecha: "",
        hora: "",
        mensaje: ""
      });
    }, 5000);
  };

  // Función para cancelar cita
  const cancelarCita = () => {
    const confirmar = window.confirm("¿Estás seguro de que deseas cancelar tu cita?");
    if (confirmar) {
      alert("Tu cita ha sido cancelada exitosamente.");
    }
  };

  // Función para obtener la fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Función para obtener la fecha máxima (3 meses desde hoy)
  const getMaxDate = () => {
    const today = new Date();
    const threeMonthsLater = new Date(today.setMonth(today.getMonth() + 3));
    return threeMonthsLater.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl md:text-4xl font-extrabold tracking-widest text-[#057CCC]">LAGOZ</div>
              <div className="hidden md:block w-px h-12 bg-gray-300"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-light leading-tight">
                PROGRAME UN EXAMEN DE LA VISTA PARA USTED Y SU FAMILIA
              </h1>
              <p className="mt-3 text-sm text-gray-600 max-w-2xl">
                Reserve su fecha y horario preferido en su tienda más cercana
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* PASOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="font-semibold text-sm uppercase tracking-wider text-gray-500">
              CÓMO AGENDAR
            </div>
            
            <div className="w-full md:w-auto flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Paso 1 */}
              <div className="flex items-center gap-4 p-3 rounded-lg bg-white border border-gray-200">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#057CCC] text-white font-bold text-lg">
                  1
                </div>
                <div className="text-sm">
                  <div className="font-semibold">SELECCIONA LA TIENDA DONDE QUIERES ATENDER</div>
                </div>
              </div>

              {/* Paso 2 */}
              <div className="flex items-center gap-4 p-3 rounded-lg bg-white border border-gray-200">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#057CCC] text-white font-bold text-lg">
                  2
                </div>
                <div className="text-sm">
                  <div className="font-semibold">SELECCIONA EL SERVICIO DESEADO</div>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="flex items-center gap-4 p-3 rounded-lg bg-white border border-gray-200">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#057CCC] text-white font-bold text-lg">
                  3
                </div>
                <div className="text-sm">
                  <div className="font-semibold">SELECCIONA LA FECHA E INGRESA TUS DATOS PARA CONFIRMAR LA CITA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN - Servicios */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white border rounded-lg p-5 shadow-sm">
              <h3 className="text-base font-bold mb-4 uppercase text-gray-700">
                NUESTROS SERVICIOS DISPONIBLES:
              </h3>
              
              <div className="space-y-3">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    className={`border rounded-lg transition-all duration-200 ${
                      expandedService === service.id 
                        ? 'border-[#057CCC] bg-[#057CCC]/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div 
                      onClick={() => toggleService(service.id)}
                      className="p-4 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#057CCC] font-bold text-lg">{service.icon}</span>
                        <span className="text-sm font-medium">{service.title}</span>
                      </div>
                      <span className={`text-[#057CCC] text-lg transform transition-transform ${
                        expandedService === service.id ? 'rotate-180' : ''
                      }`}>
                        
                      </span>
                    </div>
                    
                    {expandedService === service.id && (
                      <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{service.description}</p>
                        {service.ageRestriction && (
                          <p className="text-xs text-gray-500 italic">{service.ageRestriction}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-4">
                Si ya tienes una cita agendada y necesitas reprogramarla o anularla, puedes hacerlo aquí:
              </p>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => alert("Para reagendar tu cita, por favor contáctanos al 914 610 769")}
                  className="px-4 py-3 bg-[#057CCC] text-white text-sm font-semibold rounded-lg hover:bg-[#046bb8] transition shadow-sm"
                >
                  Reagendar cita
                </button>
                <button 
                  onClick={cancelarCita}
                  className="px-4 py-3 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition shadow-sm"
                >
                  Anular cita
                </button>
              </div>
            </div>
          </aside>

          {/* CENTER COLUMN - Lista de tiendas */}
          <section className="lg:col-span-5 space-y-4">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-gray-50 transition rounded-lg"
              >
                <span className={`text-[#057CCC] text-sm transform transition-transform ${showFilters ? 'rotate-90' : ''}`}>▶</span>
                <span className="text-sm font-semibold">Filtrar resultados</span>
              </button>
              
              {showFilters && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por ubicación</label>
                      <input 
                        type="text" 
                        placeholder="Ingresa tu ubicación"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#057CCC]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por servicio</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#057CCC]">
                        <option>Todos los servicios</option>
                        {services.map(service => (
                          <option key={service.id}>{service.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-3 px-2">1 tienda encontrada</p>
            </div>

            {/* TIENDA HUÁNUCO */}
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h5 className="text-xl font-bold tracking-wide">LAGOZ - 2 DE MAYO</h5>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Abierto</span>
                </div>
                
                <div className="flex items-start gap-2 mb-2">
               
                  <p className="text-sm text-gray-700">AV. 2 DE MAYO 1066, HUÁNUCO, PERÚ</p>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
             
                  <a href="tel:+51 914 610 769" className="text-sm text-[#057CCC] hover:underline font-medium">
                    914 610 769
                  </a>
                </div>

                {/* HORARIOS DE ATENCIÓN */}
                <div className="mb-6 p-4 bg-[#057CCC]/10 border border-[#057CCC]/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                  
                    <h6 className="text-sm font-semibold text-[#057CCC]">Horarios de atención:</h6>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-[#057CCC]">
                    <div className="flex justify-between">
                      <span>Lunes - Viernes:</span>
                      <span className="font-medium">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábados:</span>
                      <span className="font-medium">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between col-span-2">
                      <span>Domingos:</span>
                      <span className="font-medium text-red-600">Cerrado</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <a href="#" className="text-sm text-[#057CCC] hover:underline font-medium flex items-center gap-1">
                  
                  </a>
                  <span className="text-gray-300">|</span>
                  <a href="#" className="text-sm text-[#057CCC] hover:underline font-medium flex items-center gap-1">
                   
                  </a>
                </div>

                {/* BOTÓN PARA PROGRAMAR CITA */}
                <button
                  onClick={() => programarCita("LAGOZ - 2 DE MAYO")}
                  className="w-full px-6 py-3 bg-[#057CCC] text-white font-bold text-sm rounded-lg hover:bg-[#046bb8] transition shadow-sm transform hover:scale-105 duration-200"
                >
                  Programar examen
                </button>
                
                {/* Mensaje de confirmación */}
                {selectedStore && !showAppointmentForm && !appointmentConfirmed && (
                  <div className="mt-4 p-3 bg-[#057CCC]/10 border border-[#057CCC]/20 rounded-lg">
                    <p className="text-sm text-[#057CCC] text-center">
                      ✅ Has seleccionado: <strong>{selectedStore}</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN - Mapa */}
          <aside className="lg:col-span-4">
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm sticky top-6">
              <div className="flex border-b">
                <button 
                  onClick={() => setActiveTab("mapa")}
                  className={`flex-1 px-4 py-3 font-semibold text-center transition ${activeTab === "mapa" ? "bg-white text-[#057CCC] border-b-2 border-[#057CCC]" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  Mapa
                </button>
                <button 
                  onClick={() => setActiveTab("satelite")}
                  className={`flex-1 px-4 py-3 font-semibold text-center transition ${activeTab === "satelite" ? "bg-white text-[#057CCC] border-b-2 border-[#057CCC]" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  Satélite
                </button>
              </div>

              <div className="relative h-[400px] md:h-[500px]">
                <button className="absolute top-4 right-4 z-10 bg-white border rounded-lg px-3 py-2 text-sm shadow hover:bg-gray-50 transition">
                  Ampliar el mapa
                </button>
                <iframe
                  title="Ubicación Huánuco"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.710488039009!2d-76.243278!3d-9.930613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7b07071df17b3%3A0x1c6444c3fe5d1bd7!2sAv.%202%20de%20Mayo%201066%2C%20Hu%C3%A1nuco!5e0!3m2!1ses!2spe!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* MODAL DE FORMULARIO DE CITA */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Programar Cita en {selectedStore}</h3>
              
              {/* Información de horarios en el formulario */}
              <div className="mb-6 p-4 bg-[#057CCC]/10 border border-[#057CCC]/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#057CCC]">🕒</span>
                  <h6 className="text-sm font-semibold text-[#057CCC]">Horarios disponibles:</h6>
                </div>
                <div className="text-sm text-[#057CCC]">
                  <p><strong>Lunes a Sábado:</strong> 9:00 AM - 7:00 PM</p>
                  <p><strong>Domingos:</strong> Cerrado</p>
                  <p className="text-xs text-[#057CCC] mt-1">* Las citas tienen una duración aproximada de 30 minutos</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmitAppointment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={appointmentData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#057CCC]"
                      placeholder="Ingresa tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={appointmentData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#057CCC]"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={appointmentData.telefono}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#057CCC]"
                      placeholder="914 610 769"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Servicio *
                    </label>
                    <select
                      name="servicio"
                      value={appointmentData.servicio}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#057CCC]"
                    >
                      {services.map(service => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      name="fecha"
                      value={appointmentData.fecha}
                      onChange={handleInputChange}
                      required
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#057CCC]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora *
                    </label>
                    <select
                      name="hora"
                      value={appointmentData.hora}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#057CCC]"
                    >
                      <option value="">Selecciona una hora</option>
                      {availableHours.map(hour => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje adicional
                  </label>
                  <textarea
                    name="mensaje"
                    value={appointmentData.mensaje}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#057CCC]"
                    placeholder="Alguna información adicional que quieras compartir..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAppointmentForm(false)}
                    className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-[#057CCC] text-white rounded-md hover:bg-[#046bb8] transition font-medium"
                  >
                    Confirmar Cita
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MENSAJE DE CONFIRMACIÓN */}
      {appointmentConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">¡Cita Programada Exitosamente!</h3>
            <p className="text-gray-600 mb-4">
              Tu cita ha sido agendada para el <strong>{appointmentData.fecha}</strong> a las <strong>{appointmentData.hora}</strong>.
            </p>
            <p className="text-sm text-gray-500">
              Te hemos enviado un correo de confirmación a <strong>{appointmentData.email}</strong>
            </p>
            <button
              onClick={() => setAppointmentConfirmed(false)}
              className="mt-6 px-6 py-2 bg-[#057CCC] text-white rounded-md hover:bg-[#046bb8] transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}