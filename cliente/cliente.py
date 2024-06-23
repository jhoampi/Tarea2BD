import requests #Para utilizar las APIS
import time #Para el efecto "ola"
from colorama import init, Fore, Style #Para colorear las respuestas de la BD,APIS y cliente

init(autoreset=True)

BASE_URL = 'http://localhost:3000/api'

def print_Inicio(text):  # Función para mostrar con efecto "ola"
    for char in text:
        print(char, end='', flush=True)
        time.sleep(0.04)
    print() 

def print_Menu(text):  # Función para mostrar con efecto "ola"
    for char in text:
        print(char, end='', flush=True)
        time.sleep(0.01)
    print()

def registrar():    #Funcion para registrarse
    nombre = input("\nIngrese su nombre: ")
    correo = input("Ingrese su correo: ")
    clave = input("Ingrese su clave: ")
    descripcion = input("Ingrese una descripción: ")
    data = {"nombre": nombre,"correo": correo,"clave": clave,"descripcion": descripcion} #Pasar inputs a Usuario
    
    response = requests.post(f"{BASE_URL}/registrar", json=data)    #Llamar a la api/registrar
    if response.status_code == 200 and response.json().get('estado') == 200:
        print(Fore.GREEN + Style.BRIGHT + "Registro exitoso.") #Si el registro es exitoso que la salida sea en VERDE
    else:
        print(Fore.RED + Style.BRIGHT + "Error en el registro: " + response.json().get('mensaje', 'Error desconocido')) #ROJO si no se pudo registrar

def autenticar():   #Funcion para iniciar sesion (las credenciales deben existir en la BD previamente)
    correo = input("\nIngrese su correo: ")
    clave = input("Ingrese su clave: ")
    response = requests.post(f"{BASE_URL}/login", json={"correo": correo, "clave": clave})
    if response.status_code == 200 and response.json().get('estado') == 200:
        print(Fore.GREEN + Style.BRIGHT + "Autenticación exitosa.") #Color VERDE si la salida es exitosa
        return correo, clave
    else:
        print(Fore.RED + Style.BRIGHT + "Credenciales incorrectas.") #Color ROJO si la respuesta no es exitosa
        return None, None

def enviar_correo(correo, clave):   #Funcion para enviar correos
    destinatario = input("\nIngrese el correo del destinatario: ")
    asunto = input("Ingrese el asunto del correo: ")
    mensaje = input("Ingrese el mensaje del correo: ")
    data = {"correo": correo,"clave": clave,"destinatario": destinatario,"asunto": asunto,"mensaje": mensaje} #Guardar la info en Correo
    
    response = requests.post(f"{BASE_URL}/enviarcorreo", json=data)
    print(Fore.CYAN + str(response.json()) + Style.RESET_ALL) #Celeste para mostrar el correo

def ver_informacion(correo, clave): #Funcion para ver la informacion de una direccion de correo
    correo_buscar = input("\nIngrese la direccion de correo del usuario a buscar: ")
    response = requests.get(f"{BASE_URL}/informacion/{correo_buscar}")
    print(Fore.YELLOW + str(response.json()) + Style.RESET_ALL) #AMARILLO para mostrar la informacion de un correo

def ver_favoritos(correo, clave):   #Funcion para ver los correos favoritos
    response = requests.get(f"{BASE_URL}/favoritos", params={"correo": correo, "clave": clave}) 
    print(Fore.GREEN + str(response.json()) + Style.RESET_ALL + "\n") #VERDE para mostrar los correos favoritos.

def marcar_favorito(correo, clave): #Funcion para marcar un correo como favorito
    id_correo = int(input("\nIngrese el ID del correo a marcar como favorito: "))
    data = {"correo": correo,"clave": clave,"id_correo_favorito": id_correo} #BUSCAR CORREO A TRAVES DE LA ID
    
    response = requests.post(f"{BASE_URL}/marcarcorreo", json=data)
    print(Fore.GREEN + str(response.json()) + Style.RESET_ALL + "\n") #VERDE para mostrar que se marco como favorito

def main(): #CLIENTE EN FORMATO CLI
    while True:
        print_Inicio("\nMenú Inicial:\n")
        print_Inicio("1. Registrarse")
        print_Inicio("2. Iniciar sesión")
        print_Inicio("3. Salir\n")

        opcion = input("Seleccione una opción: ")

        if opcion == '1':
            registrar()
        elif opcion == '2':
            correo, clave = autenticar()
            if correo and clave:
                while True:
                    print_Menu("\nMenú Principal:\n")
                    print_Menu("1. Enviar un correo")
                    print_Menu("2. Ver información de una dirección de correo electrónico")
                    print_Menu("3. Ver correos marcados como favoritos")
                    print_Menu("4. Marcar correo como favorito")
                    print_Menu("5. Terminar con la ejecución del cliente\n")
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
                        print(Fore.RED + "Opción no válida. Intente de nuevo." + Style.RESET_ALL)
        elif opcion == '3':
            break
        else:
            print(Fore.RED + "Opción no válida. Intente de nuevo." + Style.RESET_ALL)
            
if __name__ == "__main__":  #BUCLE para mantener el cliente 
    main()
