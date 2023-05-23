/**
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author alba
 */
import java.rmi.*;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;

public class Donaciones extends UnicastRemoteObject implements Donaciones_I{
    private ArrayList<ClienteRegistrado> usuarios = null;
    private String  Nreplica;
    private String nombre;
    private int puerto;
    private int totalDonado;

    public Donaciones(String nombre, String replica, int puerto) throws RemoteException {
        usuarios = new ArrayList<>();
        this.nombre = nombre;
        this.Nreplica = replica;
        this.puerto = puerto;
        totalDonado = 0;
    }
    
    @Override
    public Donaciones_I getReplica(String nombre, int puerto) throws RemoteException {
        Donaciones_I replica = null;
        try{
            Registry mireg = LocateRegistry.getRegistry("127.0.0.1", puerto);
            replica = (Donaciones_I)mireg.lookup(nombre);
        }catch(NotBoundException e){
            System.err.println("ERROR EN REPLICA");
        }
        return replica;
    }
    
    @Override
    public synchronized void nuevoCliente(String nombre, String password) throws RemoteException{
        ClienteRegistrado nuevoCliente = new ClienteRegistrado(nombre, password);
        usuarios.add(nuevoCliente);
        System.out.println("Registrando cliente: " + nombre);
    }
    

    @Override
    public synchronized boolean registrarCliente(String nombre, String password) throws RemoteException {
        Donaciones_I replica = this.getReplica(this.Nreplica, this.puerto);
        if(!this.identificarCliente(nombre, password) || !replica.identificarCliente(nombre, password)){
            if (getNumClientes() <= replica.getNumClientes()) {
                this.nuevoCliente(nombre, password);
                return true;
            } else {
                replica.nuevoCliente(nombre, password);
                return true;
            }
        }
        return false;
    }

    @Override
    public synchronized boolean identificarCliente(String nombre, String password) throws RemoteException {
        Donaciones_I replica = this.getReplica(this.Nreplica, this.puerto);
        for (ClienteRegistrado c : usuarios) {
            if (c.getNombre().equals(nombre) && c.getPassword().equals(password)) {
                System.out.println("Identificando cliente: " + nombre);
                return true;
            }
        }
        if(replica.getClientes()!= null){
            for (ClienteRegistrado c : replica.getClientes()) {
                if (c.getNombre().equals(nombre) && c.getPassword().equals(password)) {
                    System.out.println("Identificando cliente: "  + nombre);
                    return false;
                }
            }
        }
        System.out.println("No se ha podido identificado el cliente: " + nombre);
        return false;
    }

    @Override
    public synchronized boolean donar(String nombre,String password, int cantidad) throws RemoteException {
        Donaciones_I replica = this.getReplica(this.Nreplica, this.puerto);
        for (ClienteRegistrado c : usuarios) {
            if (c.getNombre().equals(nombre) && c.getPassword().equals(password)) {
                c.donar(cantidad);
                totalDonado += cantidad;
                System.out.println("Donación del cliente " + nombre + " de : " + cantidad);
                return true;
            }
        }
        for (ClienteRegistrado c : replica.getClientes()) {
            if (c.getNombre().equals(nombre) && c.getPassword().equals(password)) {
                c.donar(cantidad);
                totalDonado += cantidad;
                System.out.println("Donación del cliente " + nombre + " de : " + cantidad);
                return true;
            }
        }
        return false;
    }

    @Override
    public int getTotalDonadoServidor() throws RemoteException {
        return totalDonado;
    }
    
    @Override
    public int getTotalDonado() throws RemoteException{
        Donaciones_I replica = this.getReplica(this.Nreplica, this.puerto);
        return this.getTotalDonadoServidor() + replica.getTotalDonadoServidor();
    }


    @Override
    public int getNumClientes() throws RemoteException {
        return usuarios.size();
    }
    
    @Override
    public ArrayList<ClienteRegistrado> getClientes() throws RemoteException{
        return usuarios;
    }
    

}
