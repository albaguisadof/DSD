
service Calculadora{
   void ping(),
   double suma(1:double num1, 2:double num2),
   double resta(1:double num1, 2:double num2),
   double multiplicacion(1:double num1, 2:double num2),
   double division(1:double num1, 2:double num2),
   double modulo(1:double num1, 2:double num2),
   double elevado(1:double num1, 2:double num2),
   double porcentaje(1:double num1, 2:double num2),
   double raiz(1:double num1, 2:double num2),
   list<double> sumaVector(1:list<double> num1, 2:list<double> num2),
   list<double> restaVector(1:list<double> num1, 2:list<double> num2),
   list<double> productoEscalarV(1:list<double> num1, 2:list<double> num2),
   list<double> productoVectorialV(1:list<double> num1, 2:list<double> num2),
   list<list<double>> sumaMatriz(1:list<list<double>> num1, 2:list<list<double>> num2),
   list<list<double>> restaMatriz(1:list<list<double>> num1, 2:list<list<double>> num2),
   list<list<double>> productoEscalarM(1:list<list<double>> num1, 2:list<list<double>> num2),
   list<list<double>> productoM(1:list<list<double>> num1, 2:list<list<double>> num2),
}

