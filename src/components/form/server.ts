import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to save service data
app.post('/api/services', (req: Request, res: Response) => {
  const newService = req.body;

  // Path to your JSON file
  const filePath = path.join(__dirname, 'services.json');

  // Read existing services
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read services' });
    }

    const services: any[] = JSON.parse(data || '[]');
    services.push(newService);

    // Write the updated services back to the JSON file
    fs.writeFile(filePath, JSON.stringify(services, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save service' });
      }
      res.status(200).json({ message: 'Service added successfully' });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
