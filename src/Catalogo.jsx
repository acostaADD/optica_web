import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Catalogo() {
  const [activeCategory, setActiveCategory] = useState('destacados');
  const [selectedGender, setSelectedGender] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState('');
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  // Verificar estado de login al cargar y escuchar cambios
  useEffect(() => {
    const checkLoginStatus = () => {
      const userLoggedIn = localStorage.getItem('userLoggedIn');
      const userEmail = localStorage.getItem('userEmail');
      
      if (userLoggedIn === 'true') {
        setIsLoggedIn(true);
        setUserEmail(userEmail || '');
      }
    };

    // Verificar al cargar
    checkLoginStatus();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserEmail('');
    alert('Has cerrado sesión');
  };

  // Función para manejar el clic en "Agregar al Carrito"
  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert('Por favor inicia sesión para agregar productos al carrito');
      navigate('/registro');
      return;
    }

    // Si está logueado, agregar al carrito
    addToCart(product);
  };

  // Función para agregar producto al carrito
  const addToCart = (product) => {
    // Obtener el carrito actual del localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = currentCart.findIndex(
      item => item.name === product.name && item.brand === product.brand
    );

    if (existingProductIndex !== -1) {
      // Si ya existe, incrementar la cantidad
      currentCart[existingProductIndex].quantity += 1;
    } else {
      // Si no existe, agregar nuevo producto
      currentCart.push({
        ...product,
        quantity: 1,
        id: Date.now() + Math.random() // ID único
      });
    }

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));

    // Mostrar notificación
    setNotificationProduct(product.name);
    setShowCartNotification(true);
    
    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  // Función para ir al carrito
  const handleGoToCart = () => {
    if (!isLoggedIn) {
      alert('Por favor inicia sesión para ver tu carrito');
      navigate('/registro');
      return;
    }
    navigate('/carrito');
  };

  // PRODUCTOS DESTACADOS
  const lentesDestacados = [
    {name: "don't cha - tort", brand: "le specs", price: "S/311.20", oldPrice: "S/389.00", img: "https://lespecs.com/cdn/shop/files/4cbf79da5bd7cee4313c10fea95c55c1_1600x.jpg?v=1758169577", destacado: true},
    {name: "magnifique - cocoa", brand: "le specs", price: "S/311.20", oldPrice: "S/389.00", img: "https://estilospe.vtexassets.com/arquivos/ids/3707236-800-800?v=638971841910630000&width=800&height=800&aspect=true", destacado: true},
    {name: "classic aviator", brand: "ray-ban", price: "S/299.00", oldPrice: "S/399.00", img: "https://www.visioncenter.com.pe/cdn/shop/products/8719154834103_1_1800x1800.jpg?v=1690784342", destacado: true},
    {name: "sport active", brand: "oakley", price: "S/450.00", oldPrice: "S/550.00", img: "https://opticasoliva.pe/cdn/shop/files/OBAOLAY-2.jpg?v=1714350105&width=1445", destacado: true},
    {name: "wayfarer classic", brand: "ray-ban", price: "S/340.00", oldPrice: "S/425.00", img: "https://hafperu.org/cdn/shop/products/2_52cb2c07-f122-4bff-b483-ba4ab704b466_720x@2x.png?v=1632505911", destacado: true},
  ];

  // LENTES DE SOL
  const lentes = [
    {name: "duskfall - black", brand: "le specs", price: "S/311.20", oldPrice: "S/389.00", img: "https://cdn.aboutstatic.com/file/images/3241f7ca63217fb3fb5f25939e903345.jpg?brightness=0.96&quality=75&trim=1"},
    {name: "duskfall - merlot", brand: "le specs", price: "S/311.20", oldPrice: "S/389.00", img: "https://intl.lespecs.com/cdn/shop/files/b2b0d741685c7c2e34d7d344e7e97169_400x.jpg?v=1743044954"},
    {name: "outta love - tort", brand: "le specs", price: "S/287.20", oldPrice: "S/359.00", img: "https://cdn.shopify.com/s/files/1/0509/7481/8500/files/d607e18c5d6ca445f1335201aaeb7324.jpg?v=1727048924"},
    {name: "round vintage", brand: "le specs", price: "S/275.00", oldPrice: "S/350.00", img: "https://cdn.shopify.com/s/files/1/0509/7481/8500/files/26b870be0d72d0f68a3b39fd3b53853c_600x600.jpg?v=1727048499"},
    {name: "cat eye modern", brand: "le specs", price: "S/320.00", oldPrice: "S/400.00", img: "https://intl.lespecs.com/cdn/shop/files/c50e4cb985174e9f3f35c38507ae1404_1600x.jpg?v=1727052026"},
    {name: "retro square", brand: "le specs", price: "S/290.00", oldPrice: "S/365.00", img: "https://cdn.shopify.com/s/files/1/0509/7481/8500/files/6e105bb51bdbbf134d722c8729cfa513_600x600.jpg?v=1727048626"},
    {name: "butterfly frame", brand: "le specs", price: "S/295.00", oldPrice: "S/370.00", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSAUbYlBiKweRAwz69JPH4LqUIxN812uU1YQ&s"},
    {name: "geometric style", brand: "bettinelli", price: "S/260.00", oldPrice: "S/330.00", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80"},
    {name: "oversized glam", brand: "le specs", price: "S/315.00", oldPrice: "S/395.00", img: "https://cdn.shopify.com/s/files/1/0509/7481/8500/files/5194a35c02a752f394995509e2d7d4ff_600x600.jpg?v=1756873547"},
  ];

  // MONTURAS OFTÁLMICAS
  const monturas = [
    {name: "cateratte optical - tortoise", brand: "bettinelli", price: "S/174.30", oldPrice: "S/249.00", img: "https://thefriendofpablo.pe/cdn/shop/files/2457_C4_38.jpg?v=1762475207&width=533"},
    {name: "cateratte optical - light brown", brand: "bettinelli", price: "S/174.30", oldPrice: "S/249.00", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeISNh9S9sgpxMXpsNWyfuyeutp7WIGpePHThA4y0F_52xjjcqQpYtnVyV__p_VJvyes8&usqp=CAU"},
    {name: "ricehead inhibited - green", brand: "the book club", price: "S/249.00", oldPrice: "S/269.00", img: "https://image4.cdnsbg.com/2/702/722474_1748323618411.jpg?width=640&height=320"},
    {name: "ricehead inhibited - black", brand: "the book club", price: "S/249.00", oldPrice: "S/269.00", img: "https://eyewearindex.com/cdn/shop/files/4bc6cbac4ba9d9e138c81df71b8bdfc9.jpg?v=1753921170"},
    {name: "halfmoon magic - clear", brand: "le specs", price: "S/249.00", oldPrice: "S/359.00", img: "https://cdn.shopify.com/s/files/1/0387/1417/9628/files/106a71ac43a1487116f74dbeddde73a2_600x600.jpg?v=1727935696"},
    {name: "slim rectangular", brand: "bettinelli", price: "S/189.00", oldPrice: "S/255.00", img: "https://thefriendofpablo.pe/cdn/shop/files/3d4d97464cade898844ea77c103195ee_1024x1024_d937dff7-b732-498c-8355-6b348d0d83f1.webp?v=1757445527&width=1946"},
    {name: "vintage round", brand: "the book club", price: "S/235.00", oldPrice: "S/285.00", img: "https://thefriendofpablo.pe/cdn/shop/files/TBC192314200_1.jpg?v=1719517314&width=533"},
    {name: "modern square", brand: "le specs", price: "S/265.00", oldPrice: "S/340.00", img: "https://cdn.shopify.com/s/files/1/0509/7481/8500/files/f69dca29c467e697e586869dcfd6e961_600x600.jpg?v=1764033301"},
    {name: "classic wayfarer", brand: "ray-ban", price: "S/299.00", oldPrice: "S/380.00", img: "https://images2.ray-ban.com//cdn-record-files-pi/fcf213b5-d210-49c0-93f5-a35900c91f55/972eebad-aa15-44a1-bc1c-ae4000929658/0RX5121__2000__STD__shad__qt.png?impolicy=RB_Product_clone&width=700&bgc=%23f2f2f2"},
    {name: "thin metal frame", brand: "bettinelli", price: "S/220.00", oldPrice: "S/290.00", img: "https://thefriendofpablo.pe/cdn/shop/files/2457_C4_16.jpg?v=1762373999&width=533"},
  ];

  
  const productosEllos = [
    {name: "Aviator Classic", brand: "Ray-Ban", price: "S/299.00", oldPrice: "S/399.00", img: "/Images/Hombres/1.jpeg"},
    {name: "Wayfarer Black", brand: "Ray-Ban", price: "S/340.00", oldPrice: "S/425.00", img: "/Images/Hombres/2.jpeg"},
    {name: "Sport Active", brand: "Oakley", price: "S/450.00", oldPrice: "S/550.00", img: "/Images/Hombres/3.jpeg"},
    {name: "Retro Square", brand: "Le Specs", price: "S/290.00", oldPrice: "S/365.00", img: "/Images/Hombres/4.jpeg"},
    {name: "Modern Square", brand: "Le Specs", price: "S/265.00", oldPrice: "S/340.00", img: "/Images/Hombres/5.jpeg"},
    {name: "Classic Black", brand: "Bettinelli", price: "S/275.00", oldPrice: "S/350.00", img: "/Images/Hombres/6.jpeg"},
    {name: "Bold Navigator", brand: "Oakley", price: "S/480.00", oldPrice: "S/580.00", img: "/Images/Hombres/7.jpeg"},
    {name: "Urban Style", brand: "Oakley", price: "S/299.00", oldPrice: "S/580.00", img: "/Images/Hombres/8.jpeg"},
    {name: "Sport Pro", brand: "Oakley", price: "S/175.00", oldPrice: "S/580.00", img: "/Images/Hombres/9.jpeg"},
    {name: "Casual Fit", brand: "Oakley", price: "S/89.90", oldPrice: "S/580.00", img: "/Images/Hombres/10.jpeg"},
    {name: "Executive", brand: "Oakley", price: "S/305.00", oldPrice: "S/580.00", img: "/Images/Hombres/11.jpeg"},
    {name: "Modern Aviator", brand: "Oakley", price: "S/115.00", oldPrice: "S/580.00", img: "/Images/Hombres/12.jpeg"},
    {name: "Sport Extreme", brand: "Oakley", price: "S/480.00", oldPrice: "S/580.00", img: "/Images/Hombres/13.jpeg"},
    {name: "Classic Brown", brand: "Oakley", price: "S/480.00", oldPrice: "S/580.00", img: "/Images/Hombres/14.jpeg"},
    {name: "Black Edition", brand: "Oakley", price: "S/480.00", oldPrice: "S/580.00", img: "/Images/Hombres/15.jpeg"},
    {name: "Professional", brand: "Oakley", price: "S/480.00", oldPrice: "S/580.00", img: "/Images/Hombres/16.jpeg"},
    {name: "Urban Explorer", brand: "Oakley", price: "S/480.00", oldPrice: "S/580.00", img: "/Images/Hombres/17.jpeg"},
    {name: "Sport Classic", brand: "Oakley", price: "S/480.00", oldPrice: "S/580.00", img: "/Images/Hombres/18.jpeg"},
    {name: "Modern Fit", brand: "Oakley", price: "S/480.00", oldPrice: "S/580.00", img: "/Images/Hombres/19.jpeg"},
    {name: "Executive Pro", brand: "Oakley", price: "S/480.00", oldPrice: "S/580.00", img: "/Images/Hombres/20.jpeg"},
  ];

  // PRODUCTOS PARA ELLAS - USANDO IMÁGENES LOCALES
  const productosEllas = [
    {name: "Cat Eye Modern", brand: "Le Specs", price: "S/320.00", oldPrice: "S/400.00", img: "/Images/Mujeres/1.jpeg"},
    {name: "Butterfly Frame", brand: "Le Specs", price: "S/295.00", oldPrice: "S/370.00", img: "/Images/Mujeres/2.jpeg"},
    {name: "Oversized Glam", brand: "Le Specs", price: "S/315.00", oldPrice: "S/395.00", img: "/Images/Mujeres/3.jpeg"},
    {name: "Geometric Style", brand: "Bettinelli", price: "S/260.00", oldPrice: "S/330.00", img: "/Images/Mujeres/4.jpeg"},
    {name: "Minimalist Clear", brand: "The Book Club", price: "S/280.00", oldPrice: "S/355.00", img: "/Images/Mujeres/5.jpeg"},
    {name: "Elegant Pearl", brand: "Ray-Ban", price: "S/350.00", oldPrice: "S/430.00", img: "/Images/Mujeres/6.jpeg"},
    {name: "Rose Gold Aviator", brand: "Ray-Ban", price: "S/380.00", oldPrice: "S/460.00", img: "/Images/Mujeres/7.jpeg"},
    {name: "Vintage Round", brand: "Le Specs", price: "S/275.00", oldPrice: "S/350.00", img: "/Images/Mujeres/8.jpeg"},
    {name: "Fashion Cat Eye", brand: "Bettinelli", price: "S/290.00", oldPrice: "S/365.00", img: "/Images/Mujeres/9.jpeg"},
    {name: "Classic Wayfarer", brand: "Ray-Ban", price: "S/340.00", oldPrice: "S/425.00", img: "/Images/Mujeres/10.jpeg"},
    {name: "Modern Square", brand: "Le Specs", price: "S/265.00", oldPrice: "S/340.00", img: "/Images/Mujeres/11.jpeg"},
    {name: "Bold Butterfly", brand: "Le Specs", price: "S/315.00", oldPrice: "S/395.00", img: "/Images/Mujeres/12.jpeg"},
    {name: "Elegant Clear", brand: "The Book Club", price: "S/280.00", oldPrice: "S/355.00", img: "/Images/Mujeres/13.jpeg"},
    {name: "Rose Gold Round", brand: "Ray-Ban", price: "S/380.00", oldPrice: "S/460.00", img: "/Images/Mujeres/14.jpeg"},
    {name: "Classic Aviator", brand: "Ray-Ban", price: "S/299.00", oldPrice: "S/399.00", img: "/Images/Mujeres/15.jpeg"},
    {name: "Geometric Modern", brand: "Bettinelli", price: "S/260.00", oldPrice: "S/330.00", img: "/Images/Mujeres/16.jpeg"},
    {name: "Oversized Vintage", brand: "Le Specs", price: "S/315.00", oldPrice: "S/395.00", img: "/Images/Mujeres/17.jpeg"},
    {name: "Cat Eye Pearl", brand: "Le Specs", price: "S/320.00", oldPrice: "S/400.00", img: "/Images/Mujeres/18.jpeg"},
    {name: "Minimalist Black", brand: "The Book Club", price: "S/280.00", oldPrice: "S/355.00", img: "/Images/Mujeres/19.jpeg"},
    {name: "Elegant Brown", brand: "Ray-Ban", price: "S/350.00", oldPrice: "S/430.00", img: "/Images/Mujeres/20.jpeg"},
    {name: "Elegant Brown", brand: "Ray-Ban", price: "S/350.00", oldPrice: "S/430.00", img: "/Images/Mujeres/21.jpeg"},
    {name: "Elegant Brown", brand: "Ray-Ban", price: "S/350.00", oldPrice: "S/430.00", img: "/Images/Mujeres/22.jpeg"},
  ];

  // PRODUCTOS PARA NIÑOS - USANDO IMÁGENES LOCALES
  const productosNinos = [
    {name: "Kids Colorful", brand: "Kids Vision", price: "S/180.00", oldPrice: "S/220.00", img: "/Images/Niños/1.jpeg"},
    {name: "Junior Sport", brand: "Kids Vision", price: "S/200.00", oldPrice: "S/250.00", img: "/Images/Niños/2.jpeg"},
    {name: "Disney Collection", brand: "Kids Vision", price: "S/220.00", oldPrice: "S/280.00", img: "/Images/Niños/3.jpeg"},
    {name: "Flexi Safe", brand: "Kids Vision", price: "S/190.00", oldPrice: "S/240.00", img: "/Images/Niños/4.jpeg"},
    {name: "Adventure Proof", brand: "Kids Vision", price: "S/210.00", oldPrice: "S/260.00", img: "/Images/Niños/5.jpeg"},
    {name: "Superhero Edition", brand: "Kids Vision", price: "S/230.00", oldPrice: "S/290.00", img: "/Images/Niños/6.jpeg"},
    {name: "Princess Style", brand: "Kids Vision", price: "S/215.00", oldPrice: "S/270.00", img: "/Images/Niños/7.jpeg"},
    {name: "Sports Blue", brand: "Kids Vision", price: "S/205.00", oldPrice: "S/255.00", img: "/Images/Niños/8.jpeg"},
    {name: "Rainbow Fun", brand: "Kids Vision", price: "S/195.00", oldPrice: "S/245.00", img: "/Images/Niños/9.jpeg"},
    {name: "Animal Friends", brand: "Kids Vision", price: "S/225.00", oldPrice: "S/285.00", img: "/Images/Niños/10.jpeg"},
    {name: "Space Adventure", brand: "Kids Vision", price: "S/235.00", oldPrice: "S/295.00", img: "/Images/Niños/11.jpeg"},
    {name: "Dinosaur World", brand: "Kids Vision", price: "S/210.00", oldPrice: "S/265.00", img: "/Images/Niños/12.jpeg"},
    {name: "Ocean Explorer", brand: "Kids Vision", price: "S/220.00", oldPrice: "S/275.00", img: "/Images/Niños/13.jpeg"},
    {name: "Jungle Safari", brand: "Kids Vision", price: "S/200.00", oldPrice: "S/250.00", img: "/Images/Niños/14.jpeg"},
    {name: "Super Star", brand: "Kids Vision", price: "S/230.00", oldPrice: "S/290.00", img: "/Images/Niños/15.jpeg"},
  ];

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
    setActiveCategory('gender');
  };

  const handleBackToCatalog = () => {
    setSelectedGender(null);
    setActiveCategory('destacados');
  };

  // Obtener cantidad de items en el carrito
  const getCartItemCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Renderizar productos por categoría de género
  const renderGenderProducts = () => {
    let products = [];
    let title = "";
    let subtitle = "";

    switch (selectedGender) {
      case 'ellos':
        products = productosEllos;
        title = "Para Ellos";
        subtitle = "Estilo masculino";
        break;
      case 'ellas':
        products = productosEllas;
        title = "Para Ellas";
        subtitle = "Elegancia femenina";
        break;
      case 'ninos':
        products = productosNinos;
        title = "Para Niños";
        subtitle = "Diversión y protección";
        break;
      default:
        return null;
    }

    return (
      <div className="min-h-screen bg-white">
        {/* HEADER DE LA CATEGORÍA */}
        <div className="bg-gradient-to-br from-[#057CCC]/10 to-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <button 
              onClick={handleBackToCatalog}
              className="flex items-center gap-2 text-[#057CCC] hover:text-[#046bb8] mb-6 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al catálogo
            </button>
            
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCTOS DE LA CATEGORÍA */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-white p-4 flex items-center justify-center" style={{minHeight: '200px'}}>
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-40 object-contain"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase mb-1 font-semibold">{item.brand}</p>
                  <h4 className="font-bold text-sm mb-2 text-gray-800">{item.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400 line-through text-sm">{item.oldPrice}</span>
                    <span className="text-red-600 font-bold">{item.price}</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-[#057CCC] to-[#046bb8] text-white py-2 text-sm font-medium rounded-lg hover:from-[#046bb8] hover:to-[#035a9e] transition-all transform hover:scale-105"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Si hay una categoría de género seleccionada, mostrar esos productos
  if (selectedGender) {
    return renderGenderProducts();
  }

  // CATÁLOGO PRINCIPAL
  return (
    <div className="min-h-screen bg-white">
      {/* NOTIFICACIÓN DE CARRITO */}
      {showCartNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>¡{notificationProduct} agregado al carrito!</span>
          </div>
        </div>
      )}

      {/* HEADER CON INFO DE USUARIO */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {isLoggedIn ? (
                <span>Bienvenido, {userEmail}</span>
              ) : (
                <span>Inicia sesión para comprar</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={handleGoToCart}
                    className="flex items-center gap-2 bg-[#057CCC] text-white px-4 py-2 rounded-lg hover:bg-[#046bb8] transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Carrito ({getCartItemCount()})
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => navigate('/registro')}
                  className="text-[#057CCC] hover:text-[#046bb8] font-semibold"
                >
                  Iniciar Sesión / Registrarse
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION CON DESTACADOS */}
      <section className="bg-gradient-to-br from-[#057CCC]/10 to-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Destacados
              <span className="block text-[#057CCC]">Lentes de Sol</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre los modelos más vendidos y exclusivos de la temporada
            </p>
          </div>

          {/* CARRUSEL DE PRODUCTOS DESTACADOS */}
          <div className="relative">
            <button 
              onClick={() => scrollCarousel(-1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => scrollCarousel(1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {lentesDestacados.map((item, idx) => (
                <div key={idx} className="flex-none w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-[#057CCC]/10 to-white p-6 rounded-t-2xl">
                      <img src={item.img} alt={item.name} className="w-full h-48 object-contain" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        MÁS VENDIDO
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-gray-500 uppercase mb-1 font-semibold">{item.brand}</p>
                    <h4 className="font-bold text-lg mb-3 text-gray-800">{item.name}</h4>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-gray-400 line-through text-sm">{item.oldPrice}</span>
                      <span className="text-red-600 font-bold text-xl">{item.price}</span>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-gradient-to-r from-[#057CCC] to-[#046bb8] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#046bb8] hover:to-[#035a9e] transition-all transform hover:scale-105"
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTROS DE CATEGORÍAS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-2xl p-2 flex gap-2">
            <button
              onClick={() => setActiveCategory('destacados')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeCategory === 'destacados' 
                  ? 'bg-white text-[#057CCC] shadow-lg' 
                  : 'text-gray-600 hover:text-[#057CCC]'
              }`}
            >
              Destacados
            </button>
            <button
              onClick={() => setActiveCategory('sol')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeCategory === 'sol' 
                  ? 'bg-white text-[#057CCC] shadow-lg' 
                  : 'text-gray-600 hover:text-[#057CCC]'
              }`}
            >
              Lentes de Sol
            </button>
            <button
              onClick={() => setActiveCategory('oftalmicos')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeCategory === 'oftalmicos' 
                  ? 'bg-white text-[#057CCC] shadow-lg' 
                  : 'text-gray-600 hover:text-[#057CCC]'
              }`}
            >
              Lentes Oftálmicos
            </button>
          </div>
        </div>

        {/* CONTENIDO POR CATEGORÍA */}
        {activeCategory === 'sol' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {lentes.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-white p-4">
                  <img src={item.img} alt={item.name} className="w-full h-40 object-contain" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase mb-1 font-semibold">{item.brand}</p>
                  <h4 className="font-bold text-sm mb-2 text-gray-800">{item.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400 line-through text-sm">{item.oldPrice}</span>
                    <span className="text-red-600 font-bold">{item.price}</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-[#057CCC] to-[#046bb8] text-white py-2 text-sm font-medium rounded-lg hover:from-[#046bb8] hover:to-[#035a9e] transition-all transform hover:scale-105"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeCategory === 'oftalmicos' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {monturas.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-white p-4 flex items-center justify-center" style={{minHeight: '200px'}}>
                  <img src={item.img} alt={item.name} className="w-full h-40 object-contain" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase mb-1 font-semibold">{item.brand}</p>
                  <h4 className="font-bold text-sm mb-2 text-gray-800">{item.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400 line-through text-sm">{item.oldPrice}</span>
                    <span className="text-red-600 font-bold">{item.price}</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-[#057CCC] to-[#046bb8] text-white py-2 text-sm font-medium rounded-lg hover:from-[#046bb8] hover:to-[#035a9e] transition-all transform hover:scale-105"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CATEGORÍAS: ELLOS, ELLAS, NIÑOS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* BOTÓN ELLOS */}
          <button 
            onClick={() => handleGenderClick('ellos')}
            className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-[#057CCC] focus:ring-opacity-50"
          >
            <img 
              src="https://st.depositphotos.com/1075946/1396/i/450/depositphotos_13964745-stock-photo-handsome-young-man-with-glasses.jpg" 
              alt="Hombre con lentes"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-4xl font-bold mb-2">Ellos →</h3>
              <p className="text-lg opacity-90">Estilo masculino</p>
            </div>
          </button>

          {/* BOTÓN ELLAS */}
          <button 
            onClick={() => handleGenderClick('ellas')}
            className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-[#057CCC] focus:ring-opacity-50"
          >
            <img 
              src="https://econolentes.com.pe/cdn/shop/articles/Lentes_antireflex_descanso_1024x1024.jpg?v=1646242981" 
              alt="Mujer con lentes"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-4xl font-bold mb-2">Ellas →</h3>
              <p className="text-lg opacity-90">Elegancia femenina</p>
            </div>
          </button>

          {/* BOTÓN NIÑOS */}
          <button 
            onClick={() => handleGenderClick('ninos')}
            className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-[#057CCC] focus:ring-opacity-50"
          >
            <img 
              src="https://opticaherradores.es/wp-content/uploads/2020/03/gafas-graduadas-lacoste-ninos.jpg" 
              alt="Niños con lentes"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-4xl font-bold mb-2">Niños →</h3>
              <p className="text-lg opacity-90">Diversión y protección</p>
            </div>
          </button>

        </div>
      </section>
    </div>
  );
}

export default Catalogo;