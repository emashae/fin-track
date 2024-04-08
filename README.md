# FinTrack

This is a simple financial transactions tracking app built using React Native. It helps users manage their expenses and track financial transactions.

## Features

- Tab navigation with two tabs: Transactions and Summary.
- Stack navigation for transaction details.
- Displays a list of transactions with basic details.
- Provides summary of user's financial data.
- Simulates transaction data using static data.


## Firebase Configuration

This project uses Firebase for storing transaction data. Follow these steps to configure Firebase for the project:

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).

2. Obtain your Firebase project's configuration object. This includes the API key, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, and appId.

3. Rename the file named `config.example.js` in the root of the project to `config.js`. 

4. Replace "YOUR_API_KEY", "YOUR_AUTH_DOMAIN", "YOUR_DATABASE_URL", "YOUR_PROJECT_ID", "YOUR_STORAGE_BUCKET", "YOUR_MESSAGING_SENDER_ID", and "YOUR_APP_ID" with your actual Firebase project's configuration values.

6. You may need to adjust Firebase rules and permissions according to your project requirements.

7. Run your application to ensure Firebase integration is successful.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository

    ```bash
        git clone <repository_url>
    ```

2. Navigate to the project directory

    ```bash
        cd fin-track
    ```

3. Install dependencies

    ```bash
        npm install
    ```

4. Run the project

    ```bash
        npm start
    ```

5. Follow instructions in the console to run the app on an emulator/device.

## Usage

- The Transactions tab displays a list of transactions with basic details.
- Clicking on a transaction navigates to its detail screen.
- The Summary tab provides an overview of the user's financial data.




