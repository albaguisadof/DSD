/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

/**
 *
 * @author alba
 */
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;

public interface Donaciones_I extends Remote {
    
    /**
     * Conseguimos tener el objeto de la otra réplica para futuras actualizaciones
     * @param nombre Nombre de la réplica.
     * @param puerto Puerto donde se encuentra la réplica
     * @return El objeto de la réplica.
     * @throws RemoteException Si ocurre un error durante la comunicación remota.
     */
    public Donaciones_I getReplica(String nombre, int puerto) throws RemoteException;
    
    /**
     * Agregamos un nuevo cliente en el servidor
     * @param nombre Nombre del cliente.
     * @param password COntraseña del cliente.
     * @throws RemoteException Si ocurre un error durante la comunicación remota.
     */
    public void nuevoCliente(String nombre, String password) throws RemoteException;
    
    /**
     * Registra a un cliente 
     * @param nombre Nombre del cliente.
     * @param password Contraseña del cliente
     * @return true si se ha registrado, false si ya estaba registrado.
     * @throws RemoteException Si ocurre un error durante la comunicación remota.
     */
    public boolean registrarCliente(String nombre, String password) throws RemoteException;
    
    
    /**
     * Identifica un usaurio
     * @param nombre Nombre del cliente.
     * @param password Contraseña del cliente.
     * @return true si se ha identificado, false si el cleinte no existe.
     * @throws RemoteException Si ocurre un error durante la comunicación remota.
     */
    public boolean identificarCliente(String nombre, String password) throws RemoteException;
    
    /**
     * Realiza una donación 
     * @param nombre Nombre del cliente que realiza la donación.
     * @param password Contraseña del cliente.
     * @param cantidad Cantidad de la donación.
     * @return true si se ha realizado la donación, false si el cliente no está registrado.
     * @throws RemoteException Si ocurre un error durante la comunicación remota.
     */
    public boolean donar(String nombre,String password, int cantidad) throws RemoteException;
    
    
    /**
     * Obtiene el total del servidor
     * @return Total de donaciones del servidor.
     * @throws RemoteException Si ocurre un error durante la comunicación remota.
     */
    public int getTotalDonadoServidor() throws RemoteException;
    
    /**
     * Obtiene el total donado en ambas réplicas del servidor.
     * @return El total donado en ambas réplicas.
     * @throws RemoteException Si ocurre un error durante la comunicación remota.
     */
    public int getTotalDonado() throws RemoteException;


    /**
     * Obtiene el número de clientes registrados en ambas réplicas del servidor.
     * @return El número de clientes registrados en ambas réplicas.
     * @throws RemoteException Si ocurre un error durante la comunicación remota.
     */
    public int getNumClientes() throws RemoteException;

    /**
     * Getter de clientes
     * @return Devulve el número de clientes registrado en la réplica.
     * @throws RemoteException Si ocurre un error durante la comunicación remota.
     */
    public ArrayList<ClienteRegistrado> getClientes() throws RemoteException;
}

