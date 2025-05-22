from nicegui import ui
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# Configuración de la aplicación FastAPI
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

# Contenido de las tarjetas
bloque1_content = """
📚 **Bloque 1: Números y Operaciones**
- Sumas y restas con Toni
- Multiplicación de ingredientes
- División en la pastelería
- Desafío contrarreloj

🔹 Haz doble clic para entrar al bloque completo
"""

bloque2_content = """
📐 **Bloque 2: Geometría y Medidas**
- Figuras geométricas ocultas
- Cálculo de perímetros
- Ángulos mágicos
- Construcción de ciudades

🔹 Haz doble clic para entrar al bloque completo
"""

acerca_content = """
🏫 **Acerca de la Escuelita de Male**
- Aprende matemáticas de forma divertida
- Videos, juegos y desafíos
- Para estudiantes de 5to grado
- Desarrollado con ❤️ en el TecNM

🔹 Haz doble clic para ver más información
"""

# Función para crear tarjetas
def create_card(title, content, target_page):
    with ui.card().classes("w-80 h-48 bg-blue-50 shadow-lg rounded-lg p-4 m-4 transition-all hover:shadow-xl"):
        ui.label(title).classes("text-xl font-bold text-blue-800")
        ui.separator()
        ui.label(content).classes("text-sm text-gray-700 mt-2")
        
        # Manejo de eventos
        def on_click():
            ui.notify(f"Preparando {title}...", type="positive")
            
        def on_double_click():
            ui.open(target_page)
            
        ui.on("click", on_click)
        ui.on("dblclick", on_double_click)

# Página principal
@ui.page("/")
def main_page():
    with ui.column().classes("w-full items-center"):
        ui.image("/static/imagess/tecnm.png").classes("w-24")
        ui.label("Aprende en línea con la escuelita de Male").classes("text-2xl font-bold text-center my-4")
        ui.label("¡Aprender es una aventura en la escuelita de Male!").classes("text-lg text-center mb-8")
        ui.image("/static/imagess/itp.png").classes("w-24")
        
        # Contenedor de las tarjetas
        with ui.row().classes("justify-center wrap gap-8 my-8"):
            create_card("Bloque 1", bloque1_content, "/primaria.html#contenido-bloque1")
            create_card("Bloque 2", bloque2_content, "/primaria.html#contenido-bloque2")
            create_card("Acerca de", acerca_content, "/primaria.html#contenido-acerca")
        
        # Sección de Matemáticas 5to grado
        with ui.row().classes("items-center justify-center my-8 gap-8"):
            ui.image("/static/imagess/ajolote.png").classes("w-20")
            with ui.column().classes("items-center"):
                ui.label("Matemáticas").classes("text-3xl font-bold text-purple-800")
                ui.label("5to grado").classes("text-xl text-purple-600")
            ui.image("/static/imagess/figurageo.jpg").classes("w-20")
        
        ui.label("🏆 ¡El desafío comienza ahora!").classes("text-xl font-bold text-center my-4")

# Montar archivos estáticos (opcional, ya está montado arriba)
# app.mount("/", StaticFiles(directory="."), name="static_root")

# Ejecutar la aplicación
if __name__ in {"__main__", "__mp_main__"}:
    print("Inicio app.py")
    print("Ejecutando ui.run_with(app)...")
    ui.run_with(app)
    print("Se terminó ui.run_with(app)")
