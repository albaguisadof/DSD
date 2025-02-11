/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#include "calculadora.h"
#include <stdio.h>
#include <stdlib.h>
#include <tirpc/rpc/pmap_clnt.h>
#include <string.h>
#include <memory.h>
#include <sys/socket.h>
#include <netinet/in.h>

#ifndef SIG_PF
#define SIG_PF void(*)(int)
#endif

static calculadora_res1 *
_calculadora_1 (calculo1  *argp, struct svc_req *rqstp)
{
	return (calculadora_1_svc(*argp, rqstp));
}

static calculadora_res2 *
_calculadora_2 (calculo2  *argp, struct svc_req *rqstp)
{
	return (calculadora_2_svc(*argp, rqstp));
}

static calculadora_res3 *
_calculadora_3 (calculo3  *argp, struct svc_req *rqstp)
{
	return (calculadora_3_svc(*argp, rqstp));
}

static void
calculadoraprog_1(struct svc_req *rqstp, register SVCXPRT *transp)
{
	union {
		calculo1 calculadora_1_arg;
	} argument;
	char *result;
	xdrproc_t _xdr_argument, _xdr_result;
	char *(*local)(char *, struct svc_req *);

	switch (rqstp->rq_proc) {
	case NULLPROC:
		(void) svc_sendreply (transp, (xdrproc_t) xdr_void, (char *)NULL);
		return;

	case CALCULADORA:
		_xdr_argument = (xdrproc_t) xdr_calculo1;
		_xdr_result = (xdrproc_t) xdr_calculadora_res1;
		local = (char *(*)(char *, struct svc_req *)) _calculadora_1;
		break;

	default:
		svcerr_noproc (transp);
		return;
	}
	memset ((char *)&argument, 0, sizeof (argument));
	if (!svc_getargs (transp, (xdrproc_t) _xdr_argument, (caddr_t) &argument)) {
		svcerr_decode (transp);
		return;
	}
	result = (*local)((char *)&argument, rqstp);
	if (result != NULL && !svc_sendreply(transp, (xdrproc_t) _xdr_result, result)) {
		svcerr_systemerr (transp);
	}
	if (!svc_freeargs (transp, (xdrproc_t) _xdr_argument, (caddr_t) &argument)) {
		fprintf (stderr, "%s", "unable to free arguments");
		exit (1);
	}
	return;
}

static void
calculadoraprog_2(struct svc_req *rqstp, register SVCXPRT *transp)
{
	union {
		calculo2 calculadora_2_arg;
	} argument;
	char *result;
	xdrproc_t _xdr_argument, _xdr_result;
	char *(*local)(char *, struct svc_req *);

	switch (rqstp->rq_proc) {
	case NULLPROC:
		(void) svc_sendreply (transp, (xdrproc_t) xdr_void, (char *)NULL);
		return;

	case CALCULADORA:
		_xdr_argument = (xdrproc_t) xdr_calculo2;
		_xdr_result = (xdrproc_t) xdr_calculadora_res2;
		local = (char *(*)(char *, struct svc_req *)) _calculadora_2;
		break;

	default:
		svcerr_noproc (transp);
		return;
	}
	memset ((char *)&argument, 0, sizeof (argument));
	if (!svc_getargs (transp, (xdrproc_t) _xdr_argument, (caddr_t) &argument)) {
		svcerr_decode (transp);
		return;
	}
	result = (*local)((char *)&argument, rqstp);
	if (result != NULL && !svc_sendreply(transp, (xdrproc_t) _xdr_result, result)) {
		svcerr_systemerr (transp);
	}
	if (!svc_freeargs (transp, (xdrproc_t) _xdr_argument, (caddr_t) &argument)) {
		fprintf (stderr, "%s", "unable to free arguments");
		exit (1);
	}
	return;
}

static void
calculadoraprog_3(struct svc_req *rqstp, register SVCXPRT *transp)
{
	union {
		calculo3 calculadora_3_arg;
	} argument;
	char *result;
	xdrproc_t _xdr_argument, _xdr_result;
	char *(*local)(char *, struct svc_req *);

	switch (rqstp->rq_proc) {
	case NULLPROC:
		(void) svc_sendreply (transp, (xdrproc_t) xdr_void, (char *)NULL);
		return;

	case CALCULADORA:
		_xdr_argument = (xdrproc_t) xdr_calculo3;
		_xdr_result = (xdrproc_t) xdr_calculadora_res3;
		local = (char *(*)(char *, struct svc_req *)) _calculadora_3;
		break;

	default:
		svcerr_noproc (transp);
		return;
	}
	memset ((char *)&argument, 0, sizeof (argument));
	if (!svc_getargs (transp, (xdrproc_t) _xdr_argument, (caddr_t) &argument)) {
		svcerr_decode (transp);
		return;
	}
	result = (*local)((char *)&argument, rqstp);
	if (result != NULL && !svc_sendreply(transp, (xdrproc_t) _xdr_result, result)) {
		svcerr_systemerr (transp);
	}
	if (!svc_freeargs (transp, (xdrproc_t) _xdr_argument, (caddr_t) &argument)) {
		fprintf (stderr, "%s", "unable to free arguments");
		exit (1);
	}
	return;
}

int
main (int argc, char **argv)
{
	register SVCXPRT *transp;

	pmap_unset (CALCULADORAPROG, CALCULADORA1);
	pmap_unset (CALCULADORAPROG, CALCULADORA2);
	pmap_unset (CALCULADORAPROG, CALCULADORA3);

	transp = svcudp_create(RPC_ANYSOCK);
	if (transp == NULL) {
		fprintf (stderr, "%s", "cannot create udp service.");
		exit(1);
	}
	if (!svc_register(transp, CALCULADORAPROG, CALCULADORA1, calculadoraprog_1, IPPROTO_UDP)) {
		fprintf (stderr, "%s", "unable to register (CALCULADORAPROG, CALCULADORA1, udp).");
		exit(1);
	}
	if (!svc_register(transp, CALCULADORAPROG, CALCULADORA2, calculadoraprog_2, IPPROTO_UDP)) {
		fprintf (stderr, "%s", "unable to register (CALCULADORAPROG, CALCULADORA2, udp).");
		exit(1);
	}
	if (!svc_register(transp, CALCULADORAPROG, CALCULADORA3, calculadoraprog_3, IPPROTO_UDP)) {
		fprintf (stderr, "%s", "unable to register (CALCULADORAPROG, CALCULADORA3, udp).");
		exit(1);
	}

	transp = svctcp_create(RPC_ANYSOCK, 0, 0);
	if (transp == NULL) {
		fprintf (stderr, "%s", "cannot create tcp service.");
		exit(1);
	}
	if (!svc_register(transp, CALCULADORAPROG, CALCULADORA1, calculadoraprog_1, IPPROTO_TCP)) {
		fprintf (stderr, "%s", "unable to register (CALCULADORAPROG, CALCULADORA1, tcp).");
		exit(1);
	}
	if (!svc_register(transp, CALCULADORAPROG, CALCULADORA2, calculadoraprog_2, IPPROTO_TCP)) {
		fprintf (stderr, "%s", "unable to register (CALCULADORAPROG, CALCULADORA2, tcp).");
		exit(1);
	}
	if (!svc_register(transp, CALCULADORAPROG, CALCULADORA3, calculadoraprog_3, IPPROTO_TCP)) {
		fprintf (stderr, "%s", "unable to register (CALCULADORAPROG, CALCULADORA3, tcp).");
		exit(1);
	}

	svc_run ();
	fprintf (stderr, "%s", "svc_run returned");
	exit (1);
	/* NOTREACHED */
}
