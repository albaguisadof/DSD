typedef float float_type; /*Tipo dato float*/
typedef char *char_type;/*Tipo dato *char*/
typedef struct _vector vector_type; /*Tipo dato vector*/
typedef struct matriz matriz_type; /*Tipo dato matriz*/
typedef struct namecalculo calculo1; 
typedef struct namecalculo2 calculo2;
typedef struct namecalculo3 calculo3;
typedef float resultado1; /*Variable del resultado 1*/
typedef struct _vector resultado2;
typedef struct matriz resultado3;


struct namecalculo {
	float_type uno; /*Primer operando*/
	char_type operacion; /* Tipo operacion*/
	float_type dos; /*Segundo operando*/
};

struct _vector{
	float_type f1;
	float_type f2;
	float_type f3;
};

struct namecalculo2{
	vector_type uno;
	char_type operacion;
	vector_type dos;
};

struct matriz{
	vector_type v1;
	vector_type v2;
	vector_type v3;
};

struct namecalculo3{
	matriz_type uno;
	char_type operacion;
	matriz_type dos;
};

/* la siguiente union se utiliza para discriminar entre llamadas con exito y llamadas con errores */
union calculadora_res1 switch (int errno) {
	case 0:
		resultado1 solucion; /* sin error: listado del directorio */
	default:
		void; /* con error: nada */
};

union calculadora_res2 switch (int errno) {
	case 0:
		resultado2 solucion; /* sin error: listado del directorio */
	default:
		void; /* con error: nada */
};

union calculadora_res3 switch (int errno) {
	case 0:
		resultado3 solucion; /* sin error: listado del directorio */
	default:
		void; /* con error: nada */
};

program CALCULADORAPROG {
	version CALCULADORA1{
		calculadora_res1 CALCULADORA(calculo1) = 1;
	} =1;
	version CALCULADORA2{
		calculadora_res2 CALCULADORA(calculo2) = 1;
	} =2;
	version CALCULADORA3{
		calculadora_res3 CALCULADORA(calculo3) = 1;
	} =3;
} = 0x20000155;
