from calculadora import Calculadora

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

transport = TSocket.TSocket("localhost", 9090)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)

client = Calculadora.Client(protocol)

transport.open()

print("hacemos ping al server")
client.ping()

tipo = int(input("Introduce:\n 0 para realizar operaciones simples \n 1 para realizar operaciones con vectores\n 2 para realizar operaciones con matrices\n"))

if tipo == 0:
    print("Las operaciones simples disponibles son :\n")
    print("+:suma, -:resta, x:multiplicacion, /:division\n")
    print("m:modulo, e:elevado, p:porcentaje, r:raiz cuadrada\n")

    #Leemos los argumentos de la operacion
    operacion = input("Introduce la operacion deseada\n")
    num1 = float(input("Introduce el primer operando: \n"))
    num2 = float(input("Introduce el segundo operando:\n"))

    #Realizamos la operacion deseada
    if operacion == "+":
        resultado = client.suma(num1, num2)
        print(str(num1) + operacion + str(num2) + " = " + str(resultado))
    elif operacion == "-":
        resultado = client.resta(num1, num2)
        print(str(num1) + operacion + str(num2) + " = " + str(resultado))
    elif operacion == "x":
        resultado = client.multiplicacion(num1, num2)
        print(str(num1) + operacion + str(num2) + " = " + str(resultado))
    elif operacion == "/":
        resultado = client.division(num1, num2)
        print(str(num1) + operacion + str(num2) + " = " + str(resultado))
    elif operacion == "e":
        resultado = client.elevado(num1, num2)
        print(str(num1) + operacion + str(num2) + " = " + str(resultado))
    elif operacion == "m":
        resultado = client.modulo(num1, num2)
        print(str(num1) + operacion + str(num2) + " = " + str(resultado))
    elif operacion == "p":
        resultado = client.porcentaje(num1, num2)
        print(str(num1) + operacion + str(num2) + " = " + str(resultado))
    elif operacion == "r":
        resultado = client.raiz(num1, num2)
        print(str(num1) + operacion + str(num2) + " = " + str(resultado))
    else:
        print("Operación incorrecta\n")

elif tipo == 1:
    print("Las operaciones con vectores disponibles son :\n")
    print("+:suma, -:resta, v:producto vectorial, e:producto escalar\n")

    #Leemos los argumentos de la operacion
    operacion = input("Introduce la operacion deseada\n")
    v1 = eval(input("Introduce el primer vector\n"))
    v2 = eval(input("Introduce el segundo vector\n"))

    #Realizamos la operacion introducida
    if operacion == "+":
        resultado = client.sumaVector(v1, v2)
        print(str(v1) + operacion + str(v2) + " = " + str(resultado))
    elif operacion == "-":
        resultado = client.restaVector(v1, v2)
        print(str(v1) + operacion + str(v2) + " = " + str(resultado))
    elif operacion == "e":
        resultado = client.productoEscalarV(v1, v2)
        print(str(v1) + operacion + str(v2) + " = " + str(resultado))
    elif operacion == "v":
        resultado = client.productoVectorialV(v1, v2)
        print(str(v1) + operacion + str(v2) + " = " + str(resultado))
    else:
        print("Operación incorrecta\n")
    
elif tipo == 2:
    print("Las operaciones con matrices disponibles son :\n")
    print("+:suma, -:resta, p:producto de matrices\n")

    #Leemos los argumentos de la operacion
    operacion = input("Introduce la operacion deseada\n")

    filas1 = int(input("Ingrese el número de filas de la primera matriz: "))
 
    print("\nIntroduce la primera matriz\n")
    m1 = []
    for i in range(filas1):
        fila = eval(input(f"Ingrese los elementos de la fila {i+1}:\n"))
        m1.append(fila) 

    filas2 = int(input("Ingrese el número de filas de la segunda matriz: "))

    print("\nIntroduce el segunda matriz\n")
    m2 = []
    for i in range(filas2):
        fila = eval(input(f"Ingrese los elementos de la fila {i+1}:\n"))
        m2.append(fila) 

    #Realizamos la operacion introducida
    if operacion == "+":
        resultado = client.sumaMatriz(m1, m2)
        print(str(m1) + operacion + str(m2) + " = " + str(resultado))
    elif operacion == "-":
        resultado = client.restaMatriz(m1, m2)
        print(str(m1) + operacion + str(m2) + " = " + str(resultado))
    elif operacion == "p":
        resultado = client.productoM(m1, m2)
        print(str(m1) + operacion + str(m2) + " = " + str(resultado))

    else:
        print("Operación incorrecta\n")

else: 
    print("Tipo de calculadora introducida incorrecta")


transport.close()
