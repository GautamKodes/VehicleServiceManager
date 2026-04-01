// API Base URL
const API_BASE = '/dashboard';

// DOM Elements
const serviceEntryForm = document.getElementById('serviceEntryForm');
const editJobForm = document.getElementById('editJobForm');
const jobsTableBody = document.getElementById('jobsTableBody');
const customersTableBody = document.getElementById('customersTableBody');
const toast = document.getElementById('toast');
const editJobModal = document.getElementById('editJobModal');

// Tab Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
        
        if (btn.dataset.tab === 'jobs-list') loadJobs();
        if (btn.dataset.tab === 'customers-list') loadCustomers();
    });
});

// Set default date to today
document.getElementById('scheduledOn').valueAsDate = new Date();

// Show Toast Notification
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type} active`;
    setTimeout(() => toast.classList.remove('active'), 3000);
}

// Service Entry Form Submit
serviceEntryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(serviceEntryForm);
    const customerData = {
        customerName: formData.get('customerName'),
        customerMobileNum: formData.get('customerMobileNum')
    };
    
    try {
        // First, create/update customer
        let customer;
        const existingCustomer = await findExistingCustomer(customerData.customerMobileNum);
        
        if (existingCustomer) {
            customer = existingCustomer;
        } else {
            const customerResponse = await fetch(`${API_BASE}/customer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customerData)
            });
            customer = await customerResponse.json();
        }
        
        // Create job
        const jobData = {
            customer: { customerId: customer.customerId },
            vehicleName: formData.get('vehicleName'),
            vehicleNumber: formData.get('vehicleNumber').toUpperCase(),
            scheduledOn: formData.get('scheduledOn'),
            status: formData.get('status'),
            billAmount: formData.get('billAmount') ? parseFloat(formData.get('billAmount')) : null,
            billStatus: formData.get('billStatus') || null
        };
        
        const jobResponse = await fetch(`${API_BASE}/job`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData)
        });
        
        if (!jobResponse.ok) throw new Error('Failed to create job');
        
        showToast('Service entry created successfully!', 'success');
        serviceEntryForm.reset();
        document.getElementById('scheduledOn').valueAsDate = new Date();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to create service entry. Please try again.', 'error');
    }
});

// Find existing customer by mobile number
async function findExistingCustomer(mobileNum) {
    try {
        const response = await fetch(`${API_BASE}/customers`);
        const customers = await response.json();
        return customers.find(c => c.customerMobileNum === mobileNum);
    } catch (error) {
        console.error('Error finding customer:', error);
        return null;
    }
}

// Load Jobs
async function loadJobs() {
    try {
        const response = await fetch(`${API_BASE}/jobs`);
        const jobs = await response.json();
        
        if (jobs.length === 0) {
            jobsTableBody.innerHTML = '<tr><td colspan="10" class="no-data">No jobs found</td></tr>';
            return;
        }
        
        jobsTableBody.innerHTML = jobs.map(job => `
            <tr>
                <td>${job.jobId}</td>
                <td>${job.customer?.customerName || 'N/A'}</td>
                <td>${job.customer?.customerMobileNum || 'N/A'}</td>
                <td>${job.vehicleName || 'N/A'}</td>
                <td>${job.vehicleNumber || 'N/A'}</td>
                <td>${formatDate(job.scheduledOn)}</td>
                <td><span class="status-badge status-${job.status?.toLowerCase()}">${job.status || 'N/A'}</span></td>
                <td>₹${job.billAmount || '0.00'}</td>
                <td><span class="status-badge bill-${job.billStatus?.toLowerCase()}">${job.billStatus || 'N/A'}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-edit" onclick="openEditJobModal(${job.jobId}, '${job.status}', '${job.billAmount || ''}', '${job.billStatus || ''}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteJob(${job.jobId})">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
        
    } catch (error) {
        console.error('Error loading jobs:', error);
        jobsTableBody.innerHTML = '<tr><td colspan="10" class="no-data">Error loading jobs</td></tr>';
        showToast('Failed to load jobs', 'error');
    }
}

// Load Customers
async function loadCustomers() {
    try {
        const response = await fetch(`${API_BASE}/customers`);
        const customers = await response.json();
        
        if (customers.length === 0) {
            customersTableBody.innerHTML = '<tr><td colspan="4" class="no-data">No customers found</td></tr>';
            return;
        }
        
        customersTableBody.innerHTML = customers.map(customer => `
            <tr>
                <td>${customer.customerId}</td>
                <td>${customer.customerName}</td>
                <td>${customer.customerMobileNum}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-danger" onclick="deleteCustomer(${customer.customerId}, '${customer.customerName}')">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
        
    } catch (error) {
        console.error('Error loading customers:', error);
        customersTableBody.innerHTML = '<tr><td colspan="4" class="no-data">Error loading customers</td></tr>';
        showToast('Failed to load customers', 'error');
    }
}

// Edit Job Modal
function openEditJobModal(jobId, status, billAmount, billStatus) {
    document.getElementById('editJobId').value = jobId;
    document.getElementById('editStatus').value = status;
    document.getElementById('editBillAmount').value = billAmount;
    document.getElementById('editBillStatus').value = billStatus;
    editJobModal.classList.add('active');
}

function closeEditJobModal() {
    editJobModal.classList.remove('active');
}

// Edit Job Form Submit
editJobForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const jobId = document.getElementById('editJobId').value;
    const jobData = {
        jobId: parseInt(jobId),
        status: document.getElementById('editStatus').value,
        billAmount: document.getElementById('editBillAmount').value ? parseFloat(document.getElementById('editBillAmount').value) : null,
        billStatus: document.getElementById('editBillStatus').value || null
    };
    
    try {
        const response = await fetch(`${API_BASE}/job`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData)
        });
        
        if (!response.ok) throw new Error('Failed to update job');
        
        showToast('Job updated successfully!', 'success');
        closeEditJobModal();
        loadJobs();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to update job', 'error');
    }
});

// Delete Job
async function deleteJob(jobId) {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/job/${jobId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete job');
        
        showToast('Job deleted successfully!', 'success');
        loadJobs();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to delete job', 'error');
    }
}

// Delete Customer
async function deleteCustomer(customerId, customerName) {
    if (!confirm(`Are you sure you want to delete customer "${customerName}"? This will also delete all associated jobs.`)) return;
    
    try {
        const response = await fetch(`${API_BASE}/customer`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerId })
        });
        
        if (!response.ok) throw new Error('Failed to delete customer');
        
        showToast('Customer deleted successfully!', 'success');
        loadCustomers();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to delete customer', 'error');
    }
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Search Functionality
document.getElementById('jobSearch').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = jobsTableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('customerSearch').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = customersTableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Vehicle Number Auto-uppercase
document.getElementById('vehicleNumber').addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});

// Initial Load
loadJobs();
