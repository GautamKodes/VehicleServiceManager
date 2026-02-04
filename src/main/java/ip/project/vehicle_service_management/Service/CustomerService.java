package ip.project.vehicle_service_management.Service;

import ip.project.vehicle_service_management.Model.Customer;
import ip.project.vehicle_service_management.Repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    final private CustomerRepo customerrepo;
    @Autowired
    public CustomerService(CustomerRepo customerrepo){
        this.customerrepo = customerrepo;
    }

    public List<Customer> getAllCustomers(){
        return customerrepo.findAll();
    }
    public Customer getCustomerById(Long id){
        return customerrepo.getById(id);
    }
    public void addCustomer(Customer customer){
        customerrepo.save(customer);
    }

}
