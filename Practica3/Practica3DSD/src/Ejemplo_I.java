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

public interface Ejemplo_I extends Remote{
    public void escribir_mensaje (int id_proceso) throws RemoteException;
}
