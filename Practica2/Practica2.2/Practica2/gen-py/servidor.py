import glob
import sys

from calculadora import Calculadora

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

import logging

logging.basicConfig(level=logging.DEBUG)



class CalculadoraHandler:
    def __init__(self):
        self.log = {}

    def ping(self):
        print("me han hecho ping()")

    def suma(self, n1, n2):
        print("sumando " + str(n1) + " con " + str(n2))
        return n1 + n2

    def resta(self, n1, n2):
        print("restando " + str(n1) + " con " + str(n2))
        return n1 - n2
    
    def multiplicacion(self, n1, n2):
        print("multiplicando " + str(n1) + " con " + str(n2))
        return n1 * n2
    
    def division(self, n1, n2):
        print("dividiendo " + str(n1) + " con " + str(n2))
        if n2 == 0:
            print("No se puede dividir entre 0")
        return n1 / n2
    
    def modulo(self, n1, n2):
        print( str(n1) + " modulo " + str(n2))
        return n1 % n2
    
    def elevado(self, n1, n2):
        print( str(n1) + " elevado " + str(n2))
        var = 0
        if n2 == 0:
            var = 1
        for i in range(int(n2)-1):
            var += n1 * n2
        return var
   
    def porcentaje(self, n1, n2):
        print( str(n1) + " porcentaje de  " + str(n2))
        return (n1 * n2)/100.0
    
    def raiz(self, n1, n2):
        print( str(n1) + " raiz cuadrada con precision " + str(n2))
        raiz = n1 / 2.0
        diferencia = n1
        while diferencia > n2:
            raiz2 = (raiz + n1 / raiz)/2.0
            diferencia = raiz2 - raiz
            if diferencia < 0:
                diferencia = - diferencia
            raiz = raiz2
        return raiz
     
    def sumaVector(self, v1, v2):
        print(str(v1) + " más " + str(v2))
        if len(v1) != len(v2):
            print("Los vectores deben tener la misma longitud")
        resultado = []
        for i in range(len(v1)):
            resultado.append(v1[i] + v2[i])
        return resultado

    def restaVector(self, v1, v2):
        print(str(v1) + " menos " + str(v2))
        if len(v1) != len(v2):
            print("Los vectores deben tener la misma longitud")
        resultado = []
        for i in range(len(v1)):
            resultado.append(v1[i] - v2[i])
        return resultado
    
    def productoEscalarV(self, v1, v2):
        print(str(v1) + " producto escalar " + str(v2))
        if len(v1) != len(v2):
            print("Los vectores deben tener la misma longitud")
        resultado = []
        for i in range(len(v1)):
            resultado.append(v1[i] * v2[i])
        return resultado
    
    def productoVectorialV(self, v1, v2):
        print(str(v1) + " producto vectorial " + str(v2))
        if len(v1) != len(v2):
            print("Los vectores deben tener la misma longitud")
        n = len(v1)
        resultado = [0] * n
        for i in range(n):
            j = (i+1) % n
            k = (i+2) % n
            resultado[i] = v1[j] * v2[k] - v1[k] * v2[j]
        return resultado
    
    def sumaMatriz(self, m1, m2):
        print(str(m1) + " mas " + str(m2))
        if len(m1) != len(m2) or len(m1[0]) != len(m2[0]):
            print("Las matrices deben tener el mismo tamaño")
        resultado = []
        for i in range(len(m1)):
            fila = []
            for j in range(len(m1[0])):
                fila.append(m1[i][j] + m2[i][j])
            resultado.append(fila)
        return resultado

    def restaMatriz(self, m1, m2):
        print(str(m1) + " menos " + str(m2))
        if len(m1) != len(m2) or len(m1[0]) != len(m2[0]):
            print("Las matrices deben tener el mismo tamaño")
        resultado = []
        for i in range(len(m1)):
            fila = []
            for j in range(len(m1[0])):
                fila.append(m1[i][j] - m2[i][j])
            resultado.append(fila)
        return resultado

    def productoM(self, m1, m2):
        print(str(m1) + " producto " + str(m2))
        if len(m1[0]) != len(m2):
            print("El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz")
        resultado = []
        for i in range(len(m1)):
            fila = []
            for j in range(len(m2[0])):
                suma = 0
                for k in range(len(m1[0])):
                    suma += m1[i][k] * m2[k][j]
                fila.append(suma)
            resultado.append(fila)
        return resultado




if __name__ == "__main__":
    handler = CalculadoraHandler()
    processor = Calculadora.Processor(handler)
    transport = TSocket.TServerSocket(host="127.0.0.1", port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print("iniciando servidor...")
    server.serve()
    print("fin")
