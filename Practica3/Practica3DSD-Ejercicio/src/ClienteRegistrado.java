/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author alba
 */
import java.io.Serializable;


public class ClienteRegistrado implements Serializable{
    
    private String nombre;
    private String password;
    private double totalDonado;
    
    public ClienteRegistrado(String nombre, String password){
        this.nombre = nombre;
        this.password = password;
        this.totalDonado = 0;
    }

    public String getNombre() {
        return nombre;
    }

    public String getPassword() {
        return password;
    }

    public double getTotalDonado() {
        return totalDonado;
    }


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    

    public void donar(double cantidad) {
        totalDonado += cantidad;
    }
}