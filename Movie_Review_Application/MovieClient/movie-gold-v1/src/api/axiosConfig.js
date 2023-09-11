import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080', // Update the baseURL to your Spring Boot server's URL
    // You can add any additional headers you need here if required
    // headers:{"ngrok-skip-browser-warning" : "true"}
});



