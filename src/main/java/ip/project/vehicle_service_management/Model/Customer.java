package ip.project.vehicle_service_management.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long customerId;
    int customerMobileNum;
    String customerName;

    public Customer(){};
    //setters
    public void setCustomerName(String name){
        this.customerName=name;
    }
    public void setCustomerMobileNum(int num){
        this.customerMobileNum=num;
    }
    //getters
    public String getCustomerName(){
        return customerName;
    }
    public int getCustomerMobileNum(){
        return customerMobileNum;
    }
}
