/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#ifndef _CALCULADORA_H_RPCGEN
#define _CALCULADORA_H_RPCGEN

#include <tirpc/rpc/rpc.h>


#ifdef __cplusplus
extern "C" {
#endif


typedef float float_type;

typedef char *char_type;

typedef struct _vector vector_type;

typedef struct matriz matriz_type;

typedef struct namecalculo calculo1;

typedef struct namecalculo2 calculo2;

typedef struct namecalculo3 calculo3;

typedef float resultado1;

typedef struct _vector resultado2;

typedef struct matriz resultado3;

struct namecalculo {
	float_type uno;
	char_type operacion;
	float_type dos;
};
typedef struct namecalculo namecalculo;

struct _vector {
	float_type f1;
	float_type f2;
	float_type f3;
};
typedef struct _vector _vector;

struct namecalculo2 {
	vector_type uno;
	char_type operacion;
	vector_type dos;
};
typedef struct namecalculo2 namecalculo2;

struct matriz {
	vector_type v1;
	vector_type v2;
	vector_type v3;
};
typedef struct matriz matriz;

struct namecalculo3 {
	matriz_type uno;
	char_type operacion;
	matriz_type dos;
};
typedef struct namecalculo3 namecalculo3;

struct calculadora_res1 {
	int errno;
	union {
		resultado1 solucion;
	} calculadora_res1_u;
};
typedef struct calculadora_res1 calculadora_res1;

struct calculadora_res2 {
	int errno;
	union {
		resultado2 solucion;
	} calculadora_res2_u;
};
typedef struct calculadora_res2 calculadora_res2;

struct calculadora_res3 {
	int errno;
	union {
		resultado3 solucion;
	} calculadora_res3_u;
};
typedef struct calculadora_res3 calculadora_res3;

#define CALCULADORAPROG 0x20000155
#define CALCULADORA1 1

#if defined(__STDC__) || defined(__cplusplus)
#define CALCULADORA 1
extern  calculadora_res1 * calculadora_1(calculo1 , CLIENT *);
extern  calculadora_res1 * calculadora_1_svc(calculo1 , struct svc_req *);
extern int calculadoraprog_1_freeresult (SVCXPRT *, xdrproc_t, caddr_t);

#else /* K&R C */
#define CALCULADORA 1
extern  calculadora_res1 * calculadora_1();
extern  calculadora_res1 * calculadora_1_svc();
extern int calculadoraprog_1_freeresult ();
#endif /* K&R C */
#define CALCULADORA2 2

#if defined(__STDC__) || defined(__cplusplus)
extern  calculadora_res2 * calculadora_2(calculo2 , CLIENT *);
extern  calculadora_res2 * calculadora_2_svc(calculo2 , struct svc_req *);
extern int calculadoraprog_2_freeresult (SVCXPRT *, xdrproc_t, caddr_t);

#else /* K&R C */
extern  calculadora_res2 * calculadora_2();
extern  calculadora_res2 * calculadora_2_svc();
extern int calculadoraprog_2_freeresult ();
#endif /* K&R C */
#define CALCULADORA3 3

#if defined(__STDC__) || defined(__cplusplus)
extern  calculadora_res3 * calculadora_3(calculo3 , CLIENT *);
extern  calculadora_res3 * calculadora_3_svc(calculo3 , struct svc_req *);
extern int calculadoraprog_3_freeresult (SVCXPRT *, xdrproc_t, caddr_t);

#else /* K&R C */
extern  calculadora_res3 * calculadora_3();
extern  calculadora_res3 * calculadora_3_svc();
extern int calculadoraprog_3_freeresult ();
#endif /* K&R C */

/* the xdr functions */

#if defined(__STDC__) || defined(__cplusplus)
extern  bool_t xdr_float_type (XDR *, float_type*);
extern  bool_t xdr_char_type (XDR *, char_type*);
extern  bool_t xdr_vector_type (XDR *, vector_type*);
extern  bool_t xdr_matriz_type (XDR *, matriz_type*);
extern  bool_t xdr_calculo1 (XDR *, calculo1*);
extern  bool_t xdr_calculo2 (XDR *, calculo2*);
extern  bool_t xdr_calculo3 (XDR *, calculo3*);
extern  bool_t xdr_resultado1 (XDR *, resultado1*);
extern  bool_t xdr_resultado2 (XDR *, resultado2*);
extern  bool_t xdr_resultado3 (XDR *, resultado3*);
extern  bool_t xdr_namecalculo (XDR *, namecalculo*);
extern  bool_t xdr__vector (XDR *, _vector*);
extern  bool_t xdr_namecalculo2 (XDR *, namecalculo2*);
extern  bool_t xdr_matriz (XDR *, matriz*);
extern  bool_t xdr_namecalculo3 (XDR *, namecalculo3*);
extern  bool_t xdr_calculadora_res1 (XDR *, calculadora_res1*);
extern  bool_t xdr_calculadora_res2 (XDR *, calculadora_res2*);
extern  bool_t xdr_calculadora_res3 (XDR *, calculadora_res3*);

#else /* K&R C */
extern bool_t xdr_float_type ();
extern bool_t xdr_char_type ();
extern bool_t xdr_vector_type ();
extern bool_t xdr_matriz_type ();
extern bool_t xdr_calculo1 ();
extern bool_t xdr_calculo2 ();
extern bool_t xdr_calculo3 ();
extern bool_t xdr_resultado1 ();
extern bool_t xdr_resultado2 ();
extern bool_t xdr_resultado3 ();
extern bool_t xdr_namecalculo ();
extern bool_t xdr__vector ();
extern bool_t xdr_namecalculo2 ();
extern bool_t xdr_matriz ();
extern bool_t xdr_namecalculo3 ();
extern bool_t xdr_calculadora_res1 ();
extern bool_t xdr_calculadora_res2 ();
extern bool_t xdr_calculadora_res3 ();

#endif /* K&R C */

#ifdef __cplusplus
}
#endif

#endif /* !_CALCULADORA_H_RPCGEN */
