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
    String firstName;
    String lastName;
    String vehicleId;
    String vehicleName;
    String vehicleNumber;
    int mobileNum;
}
