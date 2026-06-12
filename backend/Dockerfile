# Use a lightweight official Python image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for PostgreSQL (psycopg2)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install `uv` inside the container for blazing fast installs
RUN pip install uv

# Copy our project files
COPY pyproject.toml uv.lock ./

# Install the dependencies globally inside the container
RUN uv pip install --system -r pyproject.toml

# Copy the rest of our application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# The command to start the server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
