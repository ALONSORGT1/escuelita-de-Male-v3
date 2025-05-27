import sqlite3

def crear_bd_alumnos():
    # Conectar a la base de datos (se crea si no existe)
    conn = sqlite3.connect('bd-alumno.db')
    cursor = conn.cursor()
    
    # Crear la tabla calificacion
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS calificacion (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo_electronico TEXT NOT NULL,
        calificacion1 REAL NOT NULL,
        calificacion2 REAL NOT NULL,
        calificacion3 REAL NOT NULL,
        promedio REAL NOT NULL
    )
    ''')
    
    # Crear trigger para calcular automáticamente el promedio
    cursor.execute('''
    CREATE TRIGGER IF NOT EXISTS calcular_promedio
    AFTER INSERT ON calificacion
    BEGIN
        UPDATE calificacion 
        SET promedio = (NEW.calificacion1 + NEW.calificacion2 + NEW.calificacion3) / 3
        WHERE id = NEW.id;
    END;
    ''')
    
    # Crear trigger para actualizar el promedio cuando cambian las calificaciones
    cursor.execute('''
    CREATE TRIGGER IF NOT EXISTS actualizar_promedio
    AFTER UPDATE OF calificacion1, calificacion2, calificacion3 ON calificacion
    BEGIN
        UPDATE calificacion 
        SET promedio = (NEW.calificacion1 + NEW.calificacion2 + NEW.calificacion3) / 3
        WHERE id = NEW.id;
    END;
    ''')
    
    conn.commit()
    conn.close()
    print("Base de datos 'bd-alumno.db' creada exitosamente con la tabla 'calificacion'")

if __name__ == "__main__":
    crear_bd_alumnos()