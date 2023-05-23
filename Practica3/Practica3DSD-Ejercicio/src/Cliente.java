/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author alba
 */
import java.rmi.Naming;
import java.util.Scanner;
import java.net.MalformedURLException;
import java.rmi.registry.LocateRegistry;
import java.rmi.*;
import java.rmi.registry.Registry;

public class Cliente {
    public static void main(String[] args) throws MalformedURLException {
        Scanner scanner = new Scanner(System.in);
        try {
            Registry mireg = LocateRegistry.getRegistry("127.0.0.1", 1099);
            Donaciones_I servidor = (Donaciones_I) Naming.lookup("1");
            System.out.println("Conexión establecida con los servidores");
            int opcion;
            String nombre = "";
            String password = "";
          
            boolean usuarioRegistrado = false;
            System.out.println("\n0: Registrarse");
            System.out.println("1: Iniciar sesión");
            System.out.print("Ingrese una opción: ");
            opcion = scanner.nextInt();
            switch(opcion){
                case 1:
                    System.out.println("\nIntroduce tu nombre:");
                    nombre = scanner.next();
                    System.out.println("\nIntroduce una contraseña");
                    password = scanner.next();
                    usuarioRegistrado = servidor.identificarCliente(nombre, password);
                    System.out.print("Usuario identificado");
                    break;
                case 0:
                    System.out.println("\nIntroduce tu nombre:");
                    nombre = scanner.next();
                    System.out.println("\nIntroduce una contraseña");
                    password = scanner.next();
                    usuarioRegistrado = servidor.registrarCliente(nombre, password);
                    System.out.print("Usuario registrado ");
                    break;
                default:
                    System.out.println("Opción inválida");
            }
            if(usuarioRegistrado){
                do{
                System.out.println("\n1: Realizar una donación");
                System.out.println("2: Consultar total donado");
                System.out.println("3: Salir");
                System.out.print("Ingrese una opción: ");
                opcion = scanner.nextInt(); 
                switch (opcion) {
                    case 1:
                        System.out.print("Ingrese la cantidad a donar: ");
                        int cantidad = scanner.nextInt();
                        servidor.donar(nombre, password, cantidad);
                        System.out.print("Donación realizada");
                        break;
                    case 2:
                        System.out.println("Total donado en ambas réplicas: " + servidor.getTotalDonado());
                        break;
                    case 3:
                        System.out.println("Saliendo...");
                        break;
                    default:
                        System.out.println("Opción inválida");
                    }
                }while(opcion!=3);
            } 
        }catch(NotBoundException | RemoteException e) {
            System.err.println("Exception del sistema: " + e);
        }
        System.exit(0);
    }
}