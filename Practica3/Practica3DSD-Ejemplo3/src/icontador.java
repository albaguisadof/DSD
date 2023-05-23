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
public interface icontador extends Remote {
    int sumar() throws RemoteException;
    void sumar (int valor) throws RemoteException;
    public int incrementar() throws RemoteException;
} 
