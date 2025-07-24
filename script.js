// Base de datos de noticias
const newsArticles = [
  {
    id: 1,
    title: "Ciudades Inteligentes y Calidad de Vida",
    excerpt:
      "Descubre las nuevas tendencias emergentes que están revolucionando el uso de la tecnología para mejorar la vida urbana...",
    content:
      "Las ciudades inteligentes representan el futuro del desarrollo urbano, integrando tecnologías avanzadas para mejorar la calidad de vida de sus habitantes. Desde sistemas de transporte automatizados hasta redes de sensores que monitorean la calidad del aire, estas innovaciones están transformando la manera en que vivimos y trabajamos en entornos urbanos. Los beneficios incluyen una mayor eficiencia energética, reducción de la contaminación, mejor gestión del tráfico y servicios públicos más efectivos. Sin embargo, también surgen desafíos relacionados con la privacidad de los datos y la brecha digital que debe ser abordada para garantizar que todos los ciudadanos puedan beneficiarse de estas tecnologías.",
    image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Ciudad+Inteligente",
    date: "15 de enero, 2024",
  },
  {
    id: 2,
    title: "Retos de la Educación Online en el Mundo Post-Pandemia",
    excerpt: "Exploramos los desafíos y oportunidades que enfrenta la educación en línea tras la pandemia...",
    content:
      "La pandemia de COVID-19 aceleró la adopción de la educación en línea de manera sin precedentes. Aunque esta transición permitió la continuidad educativa durante el confinamiento, también reveló importantes desafíos que persisten en el mundo post-pandemia. Entre los principales retos se encuentran la brecha digital, que afecta desproporcionalmente a estudiantes de bajos recursos, la fatiga digital, y la necesidad de desarrollar nuevas metodologías pedagógicas adaptadas al entorno virtual. Por otro lado, la educación online ha demostrado ventajas como la flexibilidad horaria, el acceso a recursos globales y la personalización del aprendizaje. El futuro de la educación probablemente será híbrido, combinando lo mejor de ambos mundos.",
    image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Educacion+Online",
    date: "12 de enero, 2024",
  },
  {
    id: 3,
    title: "Las Nuevas Tecnologías de Pago Digital que Dominarán en 2024",
    excerpt: "Un vistazo a las innovaciones que están transformando el panorama de los pagos electrónicos...",
    content:
      "El sector de pagos digitales está experimentando una revolución tecnológica que promete transformar completamente la forma en que realizamos transacciones. Las criptomonedas de bancos centrales (CBDC), los pagos biométricos, la tecnología blockchain y los sistemas de pago por reconocimiento facial están emergiendo como las principales tendencias para 2024. Estas tecnologías no solo ofrecen mayor seguridad y conveniencia, sino que también están democratizando el acceso a servicios financieros en regiones previamente desatendidas. Sin embargo, la adopción masiva de estas tecnologías también plantea preguntas importantes sobre la privacidad, la seguridad cibernética y la regulación gubernamental que deberán ser abordadas en los próximos años.",
    image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Pagos+Digitales",
    date: "10 de enero, 2024",
  },
]

// Variables globales
let currentModule = "noticias"
let audioPlayer
let isPlaying = false

// Obtener elementos del DOM
const dynamicContentArea = document.getElementById("dynamicContentArea")
const navLinks = document.querySelectorAll(".nav-link")
const newsModal = document.getElementById("newsModal")
const closeModalBtn = document.getElementById("closeModal")

// Función para mostrar el modal de noticias
function showNewsModal(articleId) {
  const article = newsArticles.find((a) => a.id === articleId)
  if (!article) return

  document.getElementById("modalTitle").textContent = article.title
  document.getElementById("modalContent").textContent = article.content
  document.getElementById("modalImage").src = article.image
  document.getElementById("modalImage").alt = article.title
  document.getElementById("modalDate").textContent = article.date

  newsModal.classList.remove("hidden")
  newsModal.classList.add("show")
  document.body.style.overflow = "hidden"
}

// Función para cerrar el modal
function closeNewsModal() {
  newsModal.classList.remove("show")
  setTimeout(() => {
    newsModal.classList.add("hidden")
    document.body.style.overflow = "auto"
  }, 300)
}

// Función para crear el reproductor de audio
function createAudioPlayer() {
  return `
        <div class="audio-player">
            <h3 class="text-2xl font-bold mb-4">Sintoniza Ahora</h3>
            <p class="mb-4">Disfruta de nuestra transmisión en vivo las 24 horas.</p>
            
            <div class="p-4 bg-blue-50 rounded-lg shadow-inner w-full text-center text-gray-800">
                <p class="text-lg font-semibold mb-2">Ahora Sonando:</p>
                <p class="text-sm mb-1" id="currentShowTitle">Radio Manare en Vivo</p>
                <p class="text-xs mb-4" id="currentShowDescription">Transmisión en directo desde el campus</p>
                
                <div class="flex items-center justify-center gap-4 mb-4">
                    <button id="playPauseBtn" class="control-button bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out">
                        <svg id="playIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643L18.75 12l-11.47 7.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                        </svg>
                        <svg id="pauseIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 hidden">
                            <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75H16.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                
                <div class="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0 11.249 11.249 0 0 1 0 15.788.75.75 0 0 1-1.06-1.06 9.749 9.749 0 0 0 0-13.668.75.75 0 0 1 0-1.06Z" />
                        <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6.251 6.251 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.751 4.751 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                    </svg>
                    <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="0.7" class="volume-control w-32">
                    <span id="volumeDisplay" class="text-sm font-medium">70%</span>
                </div>
            </div>
        </div>
    `
}

// Contenido para cada módulo
const moduleContents = {
  noticias: `
        <section class="main-news-section mb-10">
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4 text-center md:text-left">
                Noticias
            </h1>
            <p class="text-lg sm:text-xl text-gray-700 mb-8 text-center md:text-left">
                Está pasando <br class="md:hidden"> Entérate de las últimas noticias, sucesos y eventos en tiempo real
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${newsArticles
                  .map(
                    (article) => `
                    <div class="news-card bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border border-gray-200">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover rounded-t-lg">
                        <div class="p-5">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">${article.title}</h3>
                            <p class="text-gray-700 text-sm mb-4">${article.excerpt}</p>
                            <button onclick="showNewsModal(${article.id})" class="text-blue-600 hover:text-blue-800 font-semibold flex items-center group">
                                Seguir leyendo
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </section>
    `,
  programas: `
        <section class="module-section p-6">
            <h2 class="text-4xl font-bold text-gray-900 mb-6 text-center">Nuestros Programas</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="p-4 bg-blue-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-blue-800 mb-2">Mañanas Manare</h3>
                    <p class="text-gray-700 text-sm">Despierta con las noticias del campus, entrevistas y buena música para iniciar el día.</p>
                    <p class="text-xs text-gray-500 mt-2">Lunes a Viernes, 8:00 AM - 10:00 AM</p>
                </div>
                <div class="p-4 bg-green-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-green-800 mb-2">El Tintero Estudiantil</h3>
                    <p class="text-gray-700 text-sm">Análisis y debate sobre los temas que más interesan a la comunidad estudiantil.</p>
                    <p class="text-xs text-gray-500 mt-2">Miércoles, 3:00 PM - 4:00 PM</p>
                </div>
                <div class="p-4 bg-purple-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-purple-800 mb-2">Ritmos del Campus</h3>
                    <p class="text-gray-700 text-sm">Tu espacio para la música, con los éxitos del momento y los clásicos que te encantan.</p>
                    <p class="text-xs text-gray-500 mt-2">Todos los días, 10:00 AM - 1:00 PM</p>
                </div>
                <div class="p-4 bg-yellow-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-yellow-800 mb-2">Manare Cultural</h3>
                    <p class="text-gray-700 text-sm">Explorando el arte, la historia y las tradiciones de nuestra región y más allá.</p>
                    <p class="text-xs text-gray-500 mt-2">Jueves, 2:00 PM - 3:00 PM</p>
                </div>
            </div>
        </section>
    `,
  podcast: `
        <section class="module-section p-6">
            <h2 class="text-4xl font-bold text-gray-900 mb-6 text-center">Nuestros Podcasts</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 bg-gray-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Café con Expertos</h3>
                    <p class="text-gray-700 text-sm">Entrevistas con profesionales de diversas áreas que comparten sus conocimientos y experiencias.</p>
                    <p class="text-xs text-gray-500 mt-2">Escucha en Spotify y Google Podcasts</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Historias del Manare</h3>
                    <p class="text-gray-700 text-sm">Un viaje sonoro por los relatos, leyendas y acontecimientos que han marcado nuestra institución y región.</p>
                    <p class="text-xs text-gray-500 mt-2">Episodios nuevos cada dos semanas</p>
                </div>
            </div>
        </section>
    `,
  cultura: `
        <section class="module-section p-6">
            <h2 class="text-4xl font-bold text-gray-900 mb-6 text-center">Cultura en Manare</h2>
            <p class="text-gray-700 text-lg mb-4 text-center">
                Descubre los eventos culturales, expresiones artísticas y tradiciones que enriquecen nuestra comunidad.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 bg-pink-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-pink-800 mb-2">Agenda Cultural Semanal</h3>
                    <p class="text-gray-700 text-sm">No te pierdas los talleres, exposiciones, conciertos y obras de teatro.</p>
                </div>
                <div class="p-4 bg-red-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-red-800 mb-2">Talento Local</h3>
                    <p class="text-gray-700 text-sm">Un espacio para apoyar y difundir el arte de nuestros estudiantes y artistas de la región.</p>
                </div>
            </div>
        </section>
    `,
  musica: `
        <section class="module-section p-6">
            <h2 class="text-4xl font-bold text-gray-900 mb-6 text-center">Música</h2>
            <p class="text-gray-700 text-lg mb-4 text-center">
                Lo mejor de la música nacional e internacional, géneros variados y las listas de reproducción más populares.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 bg-indigo-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-indigo-800 mb-2">Top 10 Semanal</h3>
                    <p class="text-gray-700 text-sm">Las canciones más sonadas y pedidas por nuestra audiencia.</p>
                </div>
                <div class="p-4 bg-teal-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-teal-800 mb-2">Artistas Emergentes</h3>
                    <p class="text-gray-700 text-sm">Descubre las nuevas voces y propuestas musicales de Colombia.</p>
                </div>
            </div>
        </section>
    `,
  deporte: `
        <section class="module-section p-6">
            <h2 class="text-4xl font-bold text-gray-900 mb-6 text-center">Deporte Manare</h2>
            <p class="text-gray-700 text-lg mb-4 text-center">
                Toda la información sobre el rendimiento deportivo de nuestra institución y los eventos más importantes.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 bg-orange-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-orange-800 mb-2">Noticias Deportivas</h3>
                    <p class="text-gray-700 text-sm">Resultados, entrevistas y lo último de nuestras selecciones.</p>
                </div>
                <div class="p-4 bg-cyan-50 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold text-cyan-800 mb-2">Agenda Deportiva</h3>
                    <p class="text-gray-700 text-sm">Calendario de partidos, torneos y actividades físicas en el campus.</p>
                </div>
            </div>
        </section>
    `,
  radio: `
        <section class="module-section p-6">
            <h2 class="text-4xl font-bold text-gray-900 mb-6 text-center">¡Estás en Radio Manare!</h2>
            <p class="text-gray-700 text-lg mb-4 text-center">
                La emisora oficial de la Institución Educativa Nuestra Señora de Manare.
                Escucha nuestra programación en vivo y entérate de todo lo que pasa en tu campus.
            </p>
            <div class="flex flex-col items-center justify-center p-6 bg-blue-100 rounded-lg shadow-md">
                ${createAudioPlayer()}
            </div>
        </section>
    `,
}

// Función para configurar el reproductor de audio
function setupAudioPlayer() {
  const playPauseBtn = document.getElementById("playPauseBtn")
  const volumeSlider = document.getElementById("volumeSlider")
  const volumeDisplay = document.getElementById("volumeDisplay")
  const playIcon = document.getElementById("playIcon")
  const pauseIcon = document.getElementById("pauseIcon")

  if (!playPauseBtn || !volumeSlider || !volumeDisplay) return

  audioPlayer = document.getElementById("audioPlayer")
  audioPlayer.volume = 0.7

  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      audioPlayer.pause()
      playIcon.classList.remove("hidden")
      pauseIcon.classList.add("hidden")
      isPlaying = false
    } else {
      audioPlayer.play().catch((e) => {
        console.log("Error al reproducir audio:", e)
        alert("No se pudo reproducir el audio. Asegúrate de que el archivo de audio esté disponible.")
      })
      playIcon.classList.add("hidden")
      pauseIcon.classList.remove("hidden")
      isPlaying = true
    }
  })

  volumeSlider.addEventListener("input", (e) => {
    const volume = Number.parseFloat(e.target.value)
    audioPlayer.volume = volume
    volumeDisplay.textContent = Math.round(volume * 100) + "%"
  })

  // Eventos del reproductor de audio
  audioPlayer.addEventListener("play", () => {
    isPlaying = true
    playIcon.classList.add("hidden")
    pauseIcon.classList.remove("hidden")
  })

  audioPlayer.addEventListener("pause", () => {
    isPlaying = false
    playIcon.classList.remove("hidden")
    pauseIcon.classList.add("hidden")
  })
}

// Función para cargar el contenido de un módulo
function loadModuleContent(moduleName) {
  // Eliminar la clase 'active' de todos los enlaces
  navLinks.forEach((link) => link.classList.remove("active"))

  // Añadir la clase 'active' al enlace clicado
  const activeLink = document.querySelector(`.nav-link[data-module="${moduleName}"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }

  // Cargar el contenido HTML del módulo en el área dinámica
  dynamicContentArea.innerHTML =
    moduleContents[moduleName] ||
    `<p class="text-red-500 text-center text-xl mt-8">Contenido para "${moduleName}" no disponible.</p>`

  // Si es el módulo de radio, configurar el reproductor
  if (moduleName === "radio") {
    setTimeout(setupAudioPlayer, 100)
  }

  currentModule = moduleName
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Configurar navegación
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault()
      const moduleName = event.target.dataset.module
      if (moduleName) {
        loadModuleContent(moduleName)
      }
    })
  })

  // Configurar modal
  closeModalBtn.addEventListener("click", closeNewsModal)
  newsModal.addEventListener("click", (e) => {
    if (e.target === newsModal) {
      closeNewsModal()
    }
  })

  // Cerrar modal con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !newsModal.classList.contains("hidden")) {
      closeNewsModal()
    }
  })

  // Cargar módulo inicial
  loadModuleContent("noticias")
})

// Hacer funciones globales para que puedan ser llamadas desde HTML
window.showNewsModal = showNewsModal
window.closeNewsModal = closeNewsModal
