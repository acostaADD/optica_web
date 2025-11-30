import { Link } from 'react-router-dom';

function Nosotros() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Encabezado Principal */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SOBRE NOSOTROS: EL PROPÓSITO DE POLICLÍNICO LAGOZ
          </h1>
          <div className="w-32 h-1 bg-[#057CCC] mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de dos décadas dedicados a tu salud visual y bienestar integral
          </p>
        </div>

        {/* Nuestra Historia */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Historia: Una Visión que Nació del Compromiso</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#057CCC] mb-4">La Fuerza del Origen</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  El origen de <strong>Policlínico Lagoz (RAFA LENS E.I.R.L.)</strong> se remonta al año 2001. 
                  Nuestra historia comenzó con una visión de vida impulsada por nuestro fundador, 
                  <strong> Rafael Lavado Gómez</strong>, y la convicción de mejorar la calidad de vida de su entorno 
                  a través de la salud visual.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Con solo <strong>S/ 700 ahorrados</strong>, dimos los primeros pasos como distribuidores, 
                  evolucionando hasta formalizar nuestra operación en <strong>septiembre de 2014</strong>. 
                  Esta determinación nos llevó a una expansión internacional para crear nuestras propias marcas, 
                  como <strong>Lagoz y Aosidi</strong>, asegurando productos de calidad alineados con estándares globales.
                </p>
                <p className="text-gray-600 leading-relaxed font-semibold">
                  Hoy, somos un centro especializado en salud visual con la clara meta de transformarnos 
                  en un policlínico integral, expandiendo el cuidado más allá de la vista para abrazar 
                  el bienestar completo de la persona.
                </p>
              </div>
            </div>
            
            {/* IMAGEN ACTUALIZADA */}
<div className="bg-gradient-to-br from-[#057CCC]/10 to-indigo-100 rounded-2xl h-full overflow-hidden relative min-h-[400px]">
  <img 
    src="https://media.istockphoto.com/id/1489731410/es/foto/concepto-de-cuidado-ocular-de-visi%C3%B3n-digital-m%C3%A9dico-que-usa-tecnolog%C3%ADa-para-la-visi%C3%B3n-de.jpg?s=612x612&w=0&k=20&c=3x8ua1LfZDOVOze2-PzZpaCGYQdh95Y2nKwZJmq-mC0=" 
    alt="Cuidado ocular y visión digital"
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>
          </div>
        </section>

        {/* Nuestra Cultura */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra Cultura: Misión, Visión y Valores</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Cada miembro del equipo está comprometido con un estándar de calidad, 
              accesibilidad y calidez humana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Misión */}
            <div className="bg-[#057CCC]/10 rounded-2xl p-8 border-l-4 border-[#057CCC]">
              <div className="flex items-center mb-4">
                <div className="bg-[#057CCC] text-white p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Misión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Nuestro compromiso es ofrecer un servicio de salud visual y médica integral de alta calidad, 
                a través de productos accesibles, marcas propias y servicios alineados a estándares internacionales. 
                Buscamos garantizar diagnósticos oportunos, tratamientos efectivos y un acompañamiento humano 
                que promueva el bienestar de nuestros pacientes.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-green-50 rounded-2xl p-8 border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Visión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Asegurar que las personas no solo <strong>"vean bien, sino que también se sientan bien"</strong>. 
                Aspiramos a consolidarnos como líderes en salud visual y atención médica integral, 
                con proyección futura hacia el mercado latinoamericano.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Nuestros Valores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "",
                  title: "Respeto",
                  description: "Hacia la dignidad y diversidad de cada paciente."
                },
                {
                  icon: "",
                  title: "Innovación",
                  description: "Uso constante de nuevas tecnologías en diagnóstico y óptica."
                },
                {
                  icon: "",
                  title: "Calidez Humana",
                  description: "Atención cercana y personalizada en cada visita."
                },
                {
                  icon: "",
                  title: "Accesibilidad",
                  description: "Precios justos y productos de calidad al alcance de la comunidad."
                }
              ].map((valor, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{valor.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{valor.title}</h4>
                  <p className="text-gray-600 text-sm">{valor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dónde Encontrarnos */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#057CCC] to-[#046bb8] rounded-2xl p-8 text-white">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Dónde Encontrarnos</h2>
              <p className="text-blue-100">Servimos a la población de Huánuco y provincias aledañas</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-xl font-bold">Huánuco (Policlínico)</h3>
                </div>
                <p className="text-lg">JR. Dos de Mayo - 1066 - Huánuco</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold">+51 914 610 769</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Línea de Tiempo */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Nuestra Trayectoria</h3>
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#057CCC]/20 transform -translate-y-1/2 hidden md:block"></div>
            
            {[
              { year: "2001", event: "Inicio de operaciones" },
              { year: "2014", event: "Formalización como E.I.R.L." },
              { year: "Actual", event: "Expansión a policlínico integral" }
            ].map((item, index) => (
              <div key={index} className="relative z-10 text-center mb-8 md:mb-0">
                <div className="bg-[#057CCC] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  {item.year}
                </div>
                <p className="text-gray-700 font-semibold">{item.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Botón de regreso */}
        <div className="text-center">
          <Link 
            to="/"
            className="bg-[#057CCC] text-white px-8 py-4 rounded-xl hover:bg-[#046bb8] transition-all font-semibold inline-block"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;