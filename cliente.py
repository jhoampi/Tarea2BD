import requests
import json

BASE_URL = 'http://localhost:3000/api'

def registrar_usuario():
    nombre = input("Ingrese su nombre: ")
    correo = input("Ingrese su correo: ")
    clave = input("Ingrese su clave: ")
    descripcion = input("Ingrese una descripcion: ")

    data = {
        "nombre": nombre,
        "correo": correo,
        "clave": clave,
        "descripcion": descripcion
    }

    response = requests.post(f"{BASE_URL}/registrar", json=data)
    print(response.json())

def obtener_informacion():
    correo = input("Ingrese el correo del usuario: ")

    response = requests.get(f"{BASE_URL}/informacion/{correo}")
    print(response.json())

def main():
    while True:
        print("\nMenu:")
        print("1. Registrar usuario")
        print("2. Obtener informacion de usuario")
        print("3. Salir")
        opcion = input("Seleccione una opcion: ")

        if opcion == '1':
            registrar_usuario()
        elif opcion == '2':
            obtener_informacion()
        elif opcion == '3':
            break
        else:
            print("Opción no válida. Intente de nuevo.")

if __name__ == "__main__":
    main()
