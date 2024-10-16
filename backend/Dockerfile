FROM --platform=linux/amd64 python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy and install dependencies
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything in the parent directory (backend) into /app
COPY ../ /app

# Set PYTHONPATH to ensure the app directory is included in the Python module search path
ENV PYTHONPATH=/app

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
