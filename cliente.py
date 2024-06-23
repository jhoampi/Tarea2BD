import requests

BASE_URL = 'http://localhost:3000/api'


def registrar():
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
    if response.status_code == 200 and response.json().get('estado') == 200:
        print("Registro exitoso.")
    else:
        print("Error en el registro: ", response.json().get('mensaje', 'Error desconocido'))

def autenticar():
    correo = input("Ingrese su correo: ")
    clave = input("Ingrese su clave: ")
    response = requests.post(f"{BASE_URL}/login", json={"correo": correo, "clave": clave})
    if response.status_code == 200 and response.json().get('estado') == 200:
        print("Autenticación exitosa.")
        return correo, clave
    else:
        print("Credenciales incorrectas.")
        return None, None

def enviar_correo(correo, clave):
    destinatario = input("Ingrese el correo del destinatario: ")
    asunto = input("Ingrese el asunto del correo: ")
    mensaje = input("Ingrese el mensaje del correo: ")
    data = {
        "correo": correo,
        "clave": clave,
        "destinatario": destinatario,
        "asunto": asunto,
        "mensaje": mensaje
    }
    response = requests.post(f"{BASE_URL}/enviarcorreo", json=data)
    print(response.json())

def ver_informacion(correo, clave):
    correo_buscar = input("Ingrese el correo del usuario a buscar: ")
    response = requests.get(f"{BASE_URL}/informacion/{correo_buscar}")
    print(response.json())

def ver_favoritos(correo, clave):
    response = requests.get(f"{BASE_URL}/favoritos", params={"correo": correo, "clave": clave})
    print(response.json())

def marcar_favorito(correo, clave):
    id_correo = int(input("Ingrese el ID del correo a marcar como favorito: "))
    data = {
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": id_correo
    }
    response = requests.post(f"{BASE_URL}/marcarcorreo", json=data)
    print(response.json())

def marcar_favorito(correo, clave):
    id_correo = int(input("Ingrese el ID del correo a marcar como favorito: "))
    data = {
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": id_correo
    }
    response = requests.post(f"{BASE_URL}/marcarcorreo", json=data)
    print(response.json())

def main():
    while True:
        print("\nMenú Inicial:")
        print("1. Registrarse")
        print("2. Iniciar sesión")
        print("3. Salir")
        opcion = input("Seleccione una opción: ")

        if opcion == '1':
            registrar()
        elif opcion == '2':
            correo, clave = autenticar()
            if correo and clave:
                while True:
                    print("\nMenú Principal:")
                    print("1. Enviar un correo")
                    print("2. Ver información de una dirección de correo electrónico")
                    print("3. Ver correos marcados como favoritos")
                    print("4. Marcar correo como favorito")
                    print("5. Terminar con la ejecución del cliente")
                    opcion = input("Seleccione una opción: ")

                    if opcion == '1':
                        enviar_correo(correo, clave)
                    elif opcion == '2':
                        ver_informacion(correo, clave)
                    elif opcion == '3':
                        ver_favoritos(correo, clave)
                    elif opcion == '4':
                        marcar_favorito(correo, clave)
                    elif opcion == '5':
                        break
                    else:
                        print("Opción no válida. Intente de nuevo.")
        elif opcion == '3':
            break
        else:
            print("Opción no válida. Intente de nuevo.")

if __name__ == "__main__":
    main()
