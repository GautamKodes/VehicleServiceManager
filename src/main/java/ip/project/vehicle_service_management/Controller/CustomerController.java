package ip.project.vehicle_service_management.Controller;

import ip.project.vehicle_service_management.Model.Customer;
import ip.project.vehicle_service_management.Model.Job;
import ip.project.vehicle_service_management.Service.CustomerService;
import ip.project.vehicle_service_management.Service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    public CustomerController(CustomerService customerService){
        this.customerService=customerService;
    }

    //CREATE
    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer){
        return customerService.addCustomer(customer);
    }

    @PutMapping
    public Customer updateCustomer(@RequestBody Customer customer){
        return customerService.updateCustomer(customer);
    }

    @DeleteMapping
    public void deleteCustomer(@RequestBody Customer customer){
        customerService.deleteCustomer(customer);
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id){
        return customerService.getCustomerById(id);
    }

    @Autowired
    private JobService jobservice;
    public CustomerController(JobService jobservice){
        this.jobservice=jobservice;
    }
    @GetMapping
    public List<Job> getAllJobs(){
        return jobservice.getAllJobs();
    }
    @PostMapping
    public Job addJob(@RequestBody Job job){
        return jobservice.addJob(job);
    }

    @GetMapping("/{id}")
    public Job getJob(@PathVariable Long id){
        return jobservice.getJob(id);
    }
    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id){
        jobservice.deleteJob(id);
    }
}


