# FlowForge

**FlowForge** is a modular and flexible CI/CD automation system written in Python with a simple WebUI interface for managing pipelines. The project aims to automate software build, test, and deployment workflows, providing easy control through a web interface.

---

## Features

- **Pipeline Management**: Define, start, stop, and retry CI/CD pipelines using simple YAML configuration files.
- **Real-Time Logs**: Monitor pipeline execution in real-time through the web interface.
- **Automation**: Automate the steps of building, testing, and deploying applications using Python scripts.
- **Error Handling**: Handle errors and retries for failed pipeline steps.
- **Notification System**: (Optional) Send notifications on pipeline status via Slack or email.
- **Web Interface**: A simple web UI built with HTML, CSS, and JavaScript to control and monitor pipelines.
- **API**: FastAPI-based REST API to interact with the backend programmatically.

---

## Project Structure

FlowForge/
│
├── backend/ # Python FastAPI backend
│ ├── app.py # FastAPI main application
│ ├── pipeline.py # Pipeline execution logic
│ └── utils.py # Utility functions for subprocess and YAML parsing
│
├── frontend/ # Frontend for the web interface
│ ├── index.html # Main HTML file
│ ├── app.js # JavaScript to handle API calls and UI updates
│ └── style.css # Basic styling for the frontend
│
├── README.md # Project description and setup guide
└── requirements.txt # Python dependencies


---

## Technologies Used

- **Python 3.x**
  - **FastAPI**: Framework to build the backend API
  - **subprocess**: To execute shell commands (build, test, deploy)
  - **PyYAML**: To parse pipeline configurations in YAML format
  - **GitPython** (optional): To monitor Git repositories and trigger pipelines
- **Frontend**: 
  - **HTML5, CSS3, JavaScript**: For building the web interface
  - **Bootstrap** / **TailwindCSS** (optional): For styling the frontend
  - **GitHub Pages**: For hosting the frontend (static site)
- **Hosting** (optional):
  - **Heroku** / **Railway**: For hosting the backend API
  - **GitHub Pages**: For hosting the static web frontend

---

## Installation

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yamoteusz/FlowForge.git
    cd FlowForge
    ```

2. Create and activate a virtual environment (optional but recommended):

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the FastAPI server:

    ```bash
    uvicorn backend.app:app --reload
    ```

    The backend will be accessible at `http://localhost:8000`.

### Frontend Setup

1. Clone the repository if you haven’t already.
2. Open `frontend/index.html` in your browser.

    You can deploy the frontend to **GitHub Pages** for free by pushing the `frontend/` directory to a GitHub repository and enabling GitHub Pages.

---

## Usage

1. Open the FlowForge web interface in your browser.
2. Define your pipeline configuration in a YAML file. Example:

    ```yaml
    pipeline:
      - name: Build
        script: python setup.py sdist bdist_wheel
      - name: Test
        script: pytest tests/ --junitxml=report.xml
      - name: Lint
        script: flake8 src/
      - name: Deploy
        script: ./deploy.sh
    ```

3. Trigger the pipeline by clicking the "Start" button from the web interface.
4. Monitor real-time logs for each step of the pipeline execution.

---

## Optional Features

- **Slack Notifications**: Send real-time notifications to Slack about the pipeline status.
- **Email Notifications**: Receive email alerts when the pipeline finishes or fails.
- **Error Handling**: Automatically retry failed steps.

---

## Roadmap

- **Multi-repository support**: Allow multiple Git repositories to be monitored and their pipelines triggered.
- **Dashboard**: Create a dashboard for monitoring multiple pipelines and their statuses.
- **Authentication**: Implement user authentication for more secure access to pipeline management.

---

## Contributing

Contributions are welcome! If you'd like to help improve **FlowForge**, feel free to fork the repository, create a feature branch, and submit a pull request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

