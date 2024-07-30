# Image Processing System

This project provides a system to process image data from CSV files. The system asynchronously processes images by compressing them and stores the results in a MongoDB database. It also offers APIs for uploading CSV files and checking the processing status.

## Project Overview

- **Frontend**: Not included in this project.
- **Backend**: Node.js with Express.
- **Database**: MongoDB.
- **Queueing**: Bull for asynchronous processing.
- **Image Processing**: Sharp for image compression.
- **File Handling**: Multer for handling CSV file uploads.

## Features

1. **Upload CSV**: Accepts a CSV file, validates its format, and starts processing.
2. **Image Processing**: Compresses images asynchronously by 50%.
3. **Status Check**: Allows users to check the status of image processing.
4. **Webhook**: (Bonus) Triggers a webhook once all images are processed.

## Setup and Installation

### Prerequisites

- Node.js (v14+)
- MongoDB
- Redis (for Bull queue)

### Installation Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-repo/image-processing-system.git
    cd image-processing-system
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the root directory with the following content:

    ```plaintext
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/image_processing?retryWrites=true&w=majority
    REDIS_URL=redis://localhost:6379
    ```

4. **Start the Application**

    ```bash
    npm start
    ```

5. **Test the API Endpoints**

    - **Upload CSV**: `POST /upload`
        - **Body**: Form-data with a file field for the CSV file.
        - **Response**: `{ "request_id": "unique-request-id" }`
    
    - **Check Status**: `GET /status/:request_id`
        - **Response**: `{ "request_id": "unique-request-id", "status": "processing/completed/failed" }`

## Project Structure

- `server/`
  - `controllers/`
    - `uploadController.js`: Handles CSV file upload and processing.
    - `statusController.js`: Handles status check requests.
  - `workers/`
    - `imageWorker.js`: Processes images asynchronously.
  - `models/`
    - `product.js`: Mongoose model for products.
    - `image.js`: Mongoose model for images.
    - `processingRequest.js`: Mongoose model for processing requests.
  - `config.js`: Configuration file for environment variables.
  - `app.js`: Main application file.

## API Documentation

1. **Upload API**

    - **Endpoint**: `/upload`
    - **Method**: `POST`
    - **Description**: Accepts a CSV file and returns a unique request ID.
    - **Request**: `multipart/form-data` with a file field.
    - **Response**: `{ "request_id": "unique-request-id" }`

2. **Status API**

    - **Endpoint**: `/status/:request_id`
    - **Method**: `GET`
    - **Description**: Checks the processing status of a request.
    - **Response**: `{ "request_id": "unique-request-id", "status": "processing/completed/failed" }`

## Asynchronous Processing

- **Image Processing**: Images are processed by the worker and saved in MongoDB.
- **Queueing**: Bull is used to manage and process image tasks asynchronously.

## Development Notes

- Ensure MongoDB and Redis are running before starting the application.
- For local development, adjust the `.env` settings accordingly.
- Consider adding error handling and logging for production readiness.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues, forks, or pull requests. Please adhere to the project's code of conduct and contribution guidelines.

---

**Note:** Replace placeholders like `<username>`, `<password>`, and `<cluster-url>` with actual values in the `.env` file.
