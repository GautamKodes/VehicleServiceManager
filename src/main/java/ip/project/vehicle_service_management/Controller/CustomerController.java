package ip.project.vehicle_service_management.Controller;

import ip.project.vehicle_service_management.Model.Customer;
import ip.project.vehicle_service_management.Model.Job;
import ip.project.vehicle_service_management.Service.CustomerService;
import ip.project.vehicle_service_management.Service.JobService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class CustomerController {
    private final CustomerService customerService;
    private final JobService jobService;

    public CustomerController(CustomerService customerService, JobService jobService) {
        this.customerService = customerService;
        this.jobService = jobService;
    }

    // Customer endpoints
    @PostMapping("/customer")
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    @PutMapping("/customer")
    public Customer updateCustomer(@RequestBody Customer customer) {
        return customerService.updateCustomer(customer);
    }

    @DeleteMapping("/customer")
    public void deleteCustomer(@RequestBody Customer customer) {
        customerService.deleteCustomer(customer.getCustomerId());
    }

    @GetMapping("/customer/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // Job endpoints
    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @PostMapping("/job")
    public Job addJob(@RequestBody Job job) {
        return jobService.addJob(job);
    }

    @PutMapping("/job")
    public Job updateJob(@RequestBody Job job) {
        return jobService.updateJob(job);
    }

    @GetMapping("/job/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    @DeleteMapping("/job/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
    }
}
