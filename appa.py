from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('bd-alumno.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    calificaciones = conn.execute('''
        SELECT id, nombre, correo_electronico, 
               calificacion1, calificacion2, calificacion3, promedio
        FROM calificacion
        ORDER BY nombre
    ''').fetchall()
    conn.close()
    return render_template('index1.html', calificaciones=calificaciones)

@app.route('/agregar', methods=('GET', 'POST'))
def agregar():
    if request.method == 'POST':
        nombre = request.form['nombre']
        correo = request.form['correo']
        cal1 = float(request.form['cal1'])
        cal2 = float(request.form['cal2'])
        cal3 = float(request.form['cal3'])

        conn = get_db_connection()
        conn.execute('''
            INSERT INTO calificacion (nombre, correo_electronico, 
                     calificacion1, calificacion2, calificacion3, promedio)
            VALUES (?, ?, ?, ?, ?, (? + ? + ?) / 3)
        ''', (nombre, correo, cal1, cal2, cal3, cal1, cal2, cal3))
        conn.commit()
        conn.close()

        return redirect(url_for('index'))  # Cambiado de index1 a index

    return render_template('agregar.html')

@app.route('/actualizar/<int:id>', methods=('GET', 'POST'))
def actualizar(id):
    conn = get_db_connection()
    calificacion = conn.execute('SELECT * FROM calificacion WHERE id = ?', (id,)).fetchone()

    if request.method == 'POST':
        nombre = request.form['nombre']
        correo = request.form['correo']
        cal1 = float(request.form['cal1'])
        cal2 = float(request.form['cal2'])
        cal3 = float(request.form['cal3'])

        conn.execute('''
            UPDATE calificacion 
            SET nombre = ?, correo_electronico = ?,
                calificacion1 = ?, calificacion2 = ?, calificacion3 = ?,
                promedio = (? + ? + ?) / 3
            WHERE id = ?
        ''', (nombre, correo, cal1, cal2, cal3, cal1, cal2, cal3, id))
        conn.commit()
        conn.close()

        return redirect(url_for('index'))

    conn.close()
    return render_template('actualizar.html', calificacion=calificacion)

@app.route('/eliminar/<int:id>', methods=('POST',))
def eliminar(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM calificacion WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)